'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Badge, Typography, Hero, Navbar, Footer, Modal, Input, Alert } from '@/components/ui';
import coursesData from '@/data/courses.json';
import additionalData from '@/data/additional-data.json';

interface Course {
  id: string;
  url: string;
  category: string;
  title: string;
  fullTitle: string;
  description: string;
  tags: string[];
  supportType: string;
  benefits: {
    funding: string;
    monthlyAllowance?: string;
    description: string;
  };
  curriculum: any[];
  features: Array<{
    point: string;
    description: string;
  }>;
}

export default function Home() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showStickyBanner, setShowStickyBanner] = useState(false);
  const [activeStickyNav, setActiveStickyNav] = useState('courses');
  const [isScrolling, setIsScrolling] = useState(false);

  const courses = coursesData.courses as Course[];
  const companyInfo = coursesData.common_info.company_info;
  const locations = coursesData.common_info.locations;
  const socialMedia = coursesData.common_info.social_media;
  const programInfo = additionalData.programInfo;
  const statistics = additionalData.statistics;
  const instructors = additionalData.instructors;
  const testimonials = additionalData.testimonials;
  const projects = additionalData.projects;
  const careerSupport = additionalData.careerSupport;
  const targetAudience = additionalData.targetAudience;
  const curriculumPhases = additionalData.curriculumPhases;
  const applicationSteps = additionalData.applicationSteps;
  const specialLectures = additionalData.specialLectures;
  const blogReviews = additionalData.blogReviews;
  const learningSupport = additionalData.learningSupport;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Sticky banner 표시/숨김 로직
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 스크롤을 일정 이상 내렸을 때 표시 (예: 400px 이상)
      const shouldShow = scrollY > 400;
      
      // Footer가 보이기 전에 숨김 처리
      // Footer 높이를 고려하여 약 200px 여유를 둠
      const footerOffset = 200;
      const nearBottom = scrollY + windowHeight >= documentHeight - footerOffset;
      
      setShowStickyBanner(shouldShow && !nearBottom);
      
      // Sticky navigation active state - 스크롤 위치에 따라 실시간 업데이트
      const sections = ['courses', 'curriculum', 'locations', 'support'];
      const scrollPosition = window.scrollY + 150; // 헤더 높이 고려
      let activeSection = 'courses'; // 기본값
      
      // 역순으로 체크하여 가장 아래에 있는 섹션을 활성화
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          // 섹션의 상단이 스크롤 위치를 지나갔으면 활성화
          if (scrollPosition >= offsetTop) {
            activeSection = section;
            break;
          }
        }
      }
      
      // 스크롤할 때마다 실시간으로 상태 업데이트
      setActiveStickyNav(activeSection);
    };
    window.addEventListener('scroll', handleScroll);
    // 초기 상태 확인
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    // 클릭 시 즉시 활성화 상태 업데이트
    setActiveStickyNav(sectionId);
    setIsScrolling(true);
    
    const element = document.getElementById(sectionId);
    if (element) {
      // 헤더 높이를 고려하여 스크롤 위치 조정
      const headerOffset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // 스크롤 완료 후 플래그 해제 (약 800ms 후)
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  const handleConsultationClick = (courseId?: string) => {
    setSelectedCourse(courseId || '');
    setFormData(prev => ({ ...prev, course: courseId || '' }));
    setIsConsultationModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setIsConsultationModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: '',
        message: ''
      });
    }, 2000);
  };

  const getSupportTypeBadgeVariant = (supportType: string) => {
    if (supportType.includes('국비지원') && !supportType.includes('KDT') && !supportType.includes('KDC')) {
      return 'success';
    }
    if (supportType.includes('KDT')) {
      return 'primary';
    }
    if (supportType.includes('KDC')) {
      return 'info';
    }
    return 'default';
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Navbar */}
      <Navbar
        logoText="KH정보교육원"
        links={[
          { label: '강의 소개', href: '#courses' },
          { label: '커리큘럼', href: '#curriculum' },
          { label: '지점 안내', href: '#locations' },
          { label: '국비지원 안내', href: '#support' }
        ]}
        ctaButton={{
          label: '상담 신청',
          onClick: () => handleConsultationClick()
        }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h1" className="mb-4 whitespace-pre-line">
              KH정보교육원{'\n'}IT 전문가{'\n'} 양성 프로그램
            </Typography>
          </div>

          <div className="text-center mb-12">
            <Button
              variant="primary"
              size="large"
              onClick={() => handleConsultationClick()}
              className="px-20 sm:px-16 md:px-20 lg:px-24 !font-bold"
            >
              수강료 전액지원받기
            </Button>
          </div>

          {/* Benefits Cards */}
          <div className="space-y-4 sm:space-y-6">
            {/* 상위 3개 카드 */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 justify-items-center">
              <Card padding="small" variant="elevated" className="text-center w-full max-w-[120px] sm:max-w-[130px] md:max-w-[150px] py-2 sm:py-3">
                <div className="text-4xl sm:text-xl md:text-5xl mb-4 sm:mb-5 md:mb-6 text-[var(--color-semantic-green)]">👥</div>
                <Typography variant="body" className="font-semibold text-[10px] sm:text-xs md:text-sm">
                  30명 소수정예
                </Typography>
              </Card>

              <Card padding="small" variant="elevated" className="text-center w-full max-w-[120px] sm:max-w-[130px] md:max-w-[150px] py-2 sm:py-3">
                <div className="text-4xl sm:text-xl md:text-2xl mb-4 sm:mb-5 md:mb-6 text-[var(--color-semantic-green)]">💰</div>
                <Typography variant="body" className="font-semibold mb-0.5 text-[10px] sm:text-xs md:text-sm">
                  훈련장려금 지원
                </Typography>
                <Typography variant="small" className="text-[var(--color-semantic-green)] font-semibold text-[9px] sm:text-[10px] md:text-xs">
                  최대 81만 6천원
                </Typography>
              </Card>

              <Card padding="small" variant="elevated" className="text-center w-full max-w-[120px] sm:max-w-[130px] md:max-w-[150px] py-2 sm:py-3">
                <div className="text-4xl sm:text-xl md:text-2xl mb-4 sm:mb-5 md:mb-6 text-[var(--color-semantic-green)]">💻</div>
                <Typography variant="body" className="font-semibold text-[10px] sm:text-xs md:text-sm">
                  노트북 대여
                </Typography>
              </Card>
            </div>

            {/* 아래 2개 카드 - 중앙 정렬 */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
              <Card padding="small" variant="elevated" className="text-center w-full max-w-[120px] sm:max-w-[130px] md:max-w-[150px] py-2 sm:py-3">
                <div className="text-4xl sm:text-xl md:text-3xl mb-4 sm:mb-5 md:mb-6 text-[var(--color-semantic-green)]">🛏️</div>
                <Typography variant="body" className="font-semibold mb-0.5 text-[10px] sm:text-xs md:text-sm">
                  생활관 비용 지원
                </Typography>
                <Typography variant="small" className="text-[var(--color-semantic-green)] font-semibold text-[9px] sm:text-[10px] md:text-xs">
                  최대 50% 지원
                </Typography>
              </Card>

              <Card padding="small" variant="elevated" className="text-center w-full max-w-[120px] sm:max-w-[130px] md:max-w-[150px] py-2 sm:py-3">
                <div className="flex items-baseline justify-center gap-1 mb-4 sm:mb-5 md:mb-6">
                  <span className="text-4xl sm:text-xl md:text-2xl text-[var(--color-semantic-green)] font-bold">0</span>
                  <span className="text-sm sm:text-base md:text-lg text-[var(--color-semantic-green)] font-semibold">원</span>
                </div>
                <Typography variant="body" className="font-semibold mb-0.5 text-[10px] sm:text-xs md:text-sm">
                  수강료 전액지원
                </Typography>
                <Typography variant="small" className="text-[var(--color-text-tertiary)] line-through text-[9px] sm:text-[10px] md:text-xs">
                  12,130,560원
                </Typography>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div className="sticky top-[var(--spacing-header-height)] z-[var(--z-index-header)] bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-primary)]">
        <div className="max-w-[1024px] mx-auto px-3 sm:px-6">
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-8">
            <button
              onClick={() => scrollToSection('courses')}
              className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 transition-all duration-200 whitespace-nowrap text-xs sm:text-base ${
                activeStickyNav === 'courses'
                  ? 'border-[var(--color-semantic-green)] text-[var(--color-semantic-green)] font-semibold'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              강의 소개
            </button>
            <button
              onClick={() => scrollToSection('curriculum')}
              className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 transition-all duration-200 whitespace-nowrap text-xs sm:text-base ${
                activeStickyNav === 'curriculum'
                  ? 'border-[var(--color-semantic-green)] text-[var(--color-semantic-green)] font-semibold'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              커리큘럼
            </button>
            <button
              onClick={() => scrollToSection('locations')}
              className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 transition-all duration-200 whitespace-nowrap text-xs sm:text-base ${
                activeStickyNav === 'locations'
                  ? 'border-[var(--color-semantic-green)] text-[var(--color-semantic-green)] font-semibold'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              지점 안내
            </button>
            <button
              onClick={() => scrollToSection('support')}
              className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 transition-all duration-200 whitespace-nowrap text-xs sm:text-base ${
                activeStickyNav === 'support'
                  ? 'border-[var(--color-semantic-green)] text-[var(--color-semantic-green)] font-semibold'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              국비지원 안내
            </button>
          </div>
        </div>
      </div>

      {/* Why Developer Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4 whitespace-pre-line">
              왜 SW개발자를{'\n'}선택해야 할까요?
            </Typography>
            <Typography variant="body" color="secondary" className="text-lg mb-8">
              SW 개발자 취업, 진짜 할 수 있을까요?
            </Typography>
            <div className="h-px w-24 bg-[var(--color-border-primary)] mx-auto mb-12"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statistics.employment.data.map((stat, index) => (
              <Card key={index} padding="large" variant="elevated" className="text-center">
                <Typography variant="h3" className="mb-2 text-[var(--color-brand-accent)]">
                  {stat.value}
                </Typography>
                <Typography variant="h6" className="mb-2">
                  {stat.label}
                </Typography>
                <Typography variant="small" color="tertiary">
                  {stat.description}
                </Typography>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Typography variant="body" color="secondary" className="text-lg">
              {statistics.employment.title}
            </Typography>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6 text-center">
          <Typography variant="h3" className="mb-6">
            그러나,
          </Typography>
          <Typography variant="h4" className="mb-8 whitespace-pre-line">
            기업이 개발자에게{'\n'}요구하는 역량을{'\n'}독학으로 채우기는 어렵습니다.
          </Typography>
          <Card padding="large" variant="default" className="max-w-2xl mx-auto">
            <Typography variant="small" color="tertiary">
              ※ A기업 신입 백엔드 개발자 공고 중 필요역량
            </Typography>
            <div className="mt-4 p-4 bg-[var(--color-bg-level1)] rounded-md text-left">
              <Typography variant="body" className="mb-2">필수 역량:</Typography>
              <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)]">
                <li>Spring Framework 실무 경험</li>
                <li>RESTful API 설계 및 구현</li>
                <li>데이터베이스 설계 및 최적화</li>
                <li>협업 도구 활용 (Git, Jira 등)</li>
                <li>실무 프로젝트 경험</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section 1 */}
      <section className="py-8 bg-black">
        <div className="max-w-[1024px] mx-auto px-6 flex justify-center">
          <Button
            variant="primary"
            size="large"
            onClick={() => handleConsultationClick()}
            className="px-8 sm:px-16 md:px-20 lg:px-24 !font-bold whitespace-nowrap text-center w-auto mx-auto"
          >
            KH정보교육원 10초만에 지원하기
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[var(--color-bg-primary)] overflow-hidden">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4 whitespace-pre-line">
              후기로 증명하는{'\n'}오프라인 부트캠프의 장점
            </Typography>
          </div>

          <div className="space-y-4">
            {/* Top Row - Moves Left */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll-left gap-3" style={{width: 'max-content'}}>
                {[...Array(10)].map((_, loopIndex) => 
                  testimonials.slice(0, Math.ceil(testimonials.length / 2)).map((testimonial, index) => (
                    <Card 
                      key={`top-${loopIndex}-${index}`} 
                      padding="medium" 
                      variant="elevated" 
                      className="min-w-[240px] flex-shrink-0 !bg-[rgb(70_71_76/var(--tw-bg-opacity,1))] border border-[var(--color-border-primary)]"
                    >
                      <div className="text-center">
                        <Typography variant="body" className="mb-3 text-sm leading-relaxed text-center line-clamp-2 min-h-[2.5rem]">
                          "{testimonial.content}"
                        </Typography>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-[var(--color-semantic-yellow)] text-xl">★</span>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-[var(--color-border-primary)]">
                          <Typography variant="small" className="text-xs text-center">
                            {testimonial.name}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Row - Moves Right */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll-right gap-3" style={{width: 'max-content'}}>
                {[...Array(10)].map((_, loopIndex) => 
                  testimonials.slice(Math.ceil(testimonials.length / 2)).map((testimonial, index) => (
                    <Card 
                      key={`bottom-${loopIndex}-${index}`} 
                      padding="medium" 
                      variant="elevated" 
                      className="min-w-[240px] flex-shrink-0 !bg-[rgb(70_71_76/var(--tw-bg-opacity,1))] border border-[var(--color-border-primary)]"
                    >
                      <div className="text-center">
                        <Typography variant="body" className="mb-3 text-sm leading-relaxed text-center line-clamp-2 min-h-[2.5rem]">
                          "{testimonial.content}"
                        </Typography>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-[var(--color-semantic-yellow)] text-xl">★</span>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-[var(--color-border-primary)]">
                          <Typography variant="small" className="text-xs text-center">
                            {testimonial.name}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-[var(--color-bg-level1)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4 whitespace-pre-line">
              KH정보교육원은{'\n'}이런분들에게 잘 맞아요!
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <Card key={index} padding="large" variant="elevated" className="text-center">
                <div className="text-4xl mb-4">{audience.icon}</div>
                <Typography variant="h6" className="mb-3">
                  {audience.title}
                </Typography>
                <Typography variant="small" color="secondary">
                  {audience.description}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6 text-center">
          <Typography variant="h2" className="mb-8 whitespace-pre-line">
            전공과 상관없이{'\n'}누구나 도전 가능한{'\n'}KH정보교육원
          </Typography>
          <Button
            variant="primary"
            size="large"
            onClick={() => handleConsultationClick()}
            className="px-8 sm:px-16 md:px-20 lg:px-24 !font-bold whitespace-nowrap text-center w-auto mx-auto"
          >
            KH정보교육원 10초만에 지원하기
          </Button>
        </div>
      </section>

      {/* Learning System Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-semantic-blue)]/20 to-[var(--color-semantic-indigo)]/20">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              누구나 개발자로 취업할 수 있도록!
            </Typography>
            <Typography variant="h4" color="secondary" className="mb-6 whitespace-pre-line">
              오프라인의 장점을 넘어{'\n'}수준별 맞춤 온라인 강의까지 제공합니다.
            </Typography>
            <div className="max-w-3xl mx-auto space-y-4 text-left">
              {learningSupport.channels.map((channel, index) => (
                <Card key={index} padding="medium" variant="default">
                  <Typography variant="h6" className="mb-2">
                    {channel.name}
                  </Typography>
                  <Typography variant="body" color="secondary">
                    {channel.description}
                  </Typography>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6 text-center">
          <div className="mb-8">
            <Typography variant="h3" className="mb-4">
              {statistics.results.totalStudents}
            </Typography>
            <Typography variant="body" color="secondary">
              KH정보교육원 오프라인 누적 교육생
            </Typography>
          </div>
          <div className="max-w-3xl mx-auto">
            <Typography variant="body" color="secondary" className="leading-relaxed">
              KH정보교육원은 1998년 설립 이래 20년 이상 IT 전문 교육을 제공해온 교육기관으로,
              데이터 거버넌스, 데이터 시스템 구축, 빅데이터 분석과 활용 등
              데이터와 관련된 다각도의 전문 서비스를 제공함으로써
              데이터를 활용한 고객의 비즈니스 가치 제고에 힘을 기울이고 있습니다.
            </Typography>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              강의 프로그램
            </Typography>
            <Typography variant="body" color="secondary" className="text-lg">
              다양한 IT 분야의 전문가 양성 과정을 제공합니다
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                padding="large"
                variant="elevated"
                className="flex flex-col h-full hover:border-[var(--color-brand-accent)] transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={getSupportTypeBadgeVariant(course.supportType)} size="small">
                      {course.supportType}
                    </Badge>
                  </div>
                  
                  <Typography variant="h5" className="mb-2">
                    {course.title}
                  </Typography>
                  
                  <Typography variant="small" color="tertiary" className="mb-4">
                    {course.category}
                  </Typography>
                  
                  <Typography variant="body" color="secondary" className="mb-4 line-clamp-3">
                    {course.description}
                  </Typography>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="default" size="small">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="default" size="small">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {course.benefits && (
                    <div className="mb-4 p-3 bg-[var(--color-bg-level1)] rounded-md">
                      <Typography variant="small" className="font-semibold mb-1">
                        {course.benefits.funding}
                      </Typography>
                      {course.benefits.monthlyAllowance && (
                        <Typography variant="small" color="secondary">
                          {course.benefits.monthlyAllowance}
                        </Typography>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--color-border-primary)]">
                  <Button
                    variant="primary"
                    size="medium"
                    fullWidth
                    onClick={() => handleConsultationClick(course.id)}
                  >
                    상담 신청하기
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              현업에서 원하는 개발자 되는 법
            </Typography>
          </div>

          <div className="space-y-6">
            {curriculumPhases.map((phase, index) => (
              <Card key={index} padding="large" variant="elevated">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <Badge variant="primary" size="medium">
                      {phase.phase}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <Typography variant="h5" className="mb-2">
                      {phase.title}
                    </Typography>
                    <Typography variant="small" color="tertiary" className="mb-4">
                      {phase.duration}
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {phase.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="default" size="small">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Typography variant="small" color="tertiary" className="mb-6">
              *수업은 Windows 기반으로 진행됩니다.*
            </Typography>
            <Button
              variant="primary"
              size="large"
              onClick={() => handleConsultationClick()}
              className="w-auto mx-auto px-8 sm:px-12 md:px-16"
            >
              KH정보교육원 10초만에 지원하기
            </Button>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h3" className="mb-4 whitespace-pre-line">
              KH정보교육원은 강사님에 따라{'\n'}커리큘럼과 수업 퀄리티가 차이 나는 과정들과 다릅니다.
            </Typography>
            <Typography variant="h4" color="secondary" className="mb-8 whitespace-pre-line">
              KH정보교육원만 N번째 강의!{'\n'}수료생의 높은 만족도와 후기로{'\n'}검증된 강사가 함께합니다!
            </Typography>
            <div className="h-px w-24 bg-[var(--color-border-primary)] mx-auto"></div>
          </div>

          <div className="space-y-8">
            {instructors.map((instructor, index) => (
              <Card key={index} padding="large" variant="elevated">
                <div className="mb-6">
                  <Typography variant="h4" className="mb-2">
                    {instructor.name}
                  </Typography>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <Badge variant="info">{instructor.batch}</Badge>
                    <Badge variant="default">{instructor.education}</Badge>
                    <Badge variant="success">만족도 {instructor.satisfaction}</Badge>
                  </div>
                  <Typography variant="body" color="secondary" className="mb-4">
                    {instructor.teachingExperience}
                  </Typography>
                </div>
                <div className="space-y-2">
                  {instructor.experience.map((exp, expIndex) => (
                    <Typography key={expIndex} variant="small" color="secondary" className="flex items-start gap-2">
                      <span className="text-[var(--color-text-tertiary)]">•</span>
                      <span>{exp}</span>
                    </Typography>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Projects Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              현업을 미리 경험할 수 있는 오프라인 100% 팀 프로젝트
            </Typography>
            <Typography variant="h4" color="secondary" className="whitespace-pre-line">
              5회의 팀 프로젝트로{'\n'}필요한 모든 실무 역량을{'\n'}완벽하게 습득하세요.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} padding="large" variant="elevated">
                <Typography variant="h5" className="mb-4">
                  {project.title}
                </Typography>
                <Typography variant="body" color="secondary" className="mb-4">
                  {project.description}
                </Typography>
                <div className="mb-4">
                  <Typography variant="small" className="font-semibold mb-2">사용 기술:</Typography>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="primary" size="small">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Typography variant="small" className="font-semibold mb-2">주요 기능:</Typography>
                  <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)] text-sm">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Support Section */}
      <section className="py-20 bg-[var(--color-bg-level1)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              {careerSupport.title}
            </Typography>
            <Typography variant="h4" color="secondary" className="mb-6">
              취업지원은 이렇게 진행됩니다.
            </Typography>
            <Typography variant="body" color="secondary" className="text-lg whitespace-pre-line">
              KH정보교육원 현업 실무진의{'\n'}릴레이 특강부터 1:1 취업 컨설팅까지
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {careerSupport.services.map((service, index) => (
              <Card key={index} padding="medium" variant="elevated" className="text-center">
                <Typography variant="h6" className="mb-2">
                  {service.title}
                </Typography>
                <Typography variant="small" color="secondary">
                  {service.description}
                </Typography>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="large"
              onClick={() => handleConsultationClick()}
              className="w-auto mx-auto px-8 sm:px-12 md:px-16"
            >
              KH정보교육원 10초만에 지원하기
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              KH정보교육원 교육의 결과를 확인해보세요!
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card padding="large" variant="elevated" className="text-center">
              <Typography variant="h3" className="mb-2 text-[var(--color-brand-accent)]">
                {statistics.results.totalStudents}
              </Typography>
              <Typography variant="body" color="secondary">
                누적 교육생
              </Typography>
            </Card>
            <Card padding="large" variant="elevated" className="text-center">
              <Typography variant="h3" className="mb-2 text-[var(--color-brand-accent)]">
                {statistics.results.totalBatches}
              </Typography>
              <Typography variant="body" color="secondary">
                누적 기수
              </Typography>
            </Card>
            <Card padding="large" variant="elevated" className="text-center">
              <Typography variant="h3" className="mb-2 text-[var(--color-semantic-green)]">
                {statistics.results.employmentRate}
              </Typography>
              <Typography variant="body" color="secondary">
                취업률
              </Typography>
            </Card>
            <Card padding="large" variant="elevated" className="text-center">
              <Typography variant="h3" className="mb-2 text-[var(--color-semantic-green)]">
                {statistics.results.averageSalary}
              </Typography>
              <Typography variant="body" color="secondary">
                평균 연봉
              </Typography>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-semantic-orange)] to-[var(--color-semantic-orange)]/80">
        <div className="max-w-[1024px] mx-auto px-6 text-center">
          <Typography variant="h2" className="mb-6 text-white whitespace-pre-line">
            KH정보교육원{'\n'}지금 바로 합류하세요!
          </Typography>
          <Button
            variant="primary"
            size="large"
            onClick={() => handleConsultationClick()}
            className="bg-white text-[var(--color-semantic-orange)] hover:bg-white/90"
          >
            지원하기
          </Button>
        </div>
      </section>

      {/* Easy Application Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              가입없이 빠르고 쉽게 합류하세요.
            </Typography>
            <Typography variant="body" color="secondary" className="text-lg whitespace-pre-line">
              복잡한 절차는 모두 제외했습니다.{'\n'}지원하기 클릭 후 기본정보만 제출하면 신청 완료!
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-brand-accent)] flex items-center justify-center mx-auto mb-4">
                  <Typography variant="h4" className="text-white">
                    {step.step}
                  </Typography>
                </div>
                <Typography variant="h6" className="mb-2">
                  {step.title}
                </Typography>
                <Typography variant="small" color="tertiary">
                  {step.description}
                </Typography>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="large"
              onClick={() => handleConsultationClick()}
            >
              지금 지원하러 가기 →
            </Button>
          </div>
        </div>
      </section>

      {/* Special Lectures Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-semantic-indigo)]/20 to-[var(--color-semantic-blue)]/20">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4 whitespace-pre-line">
              KH정보교육원 수강생과 함께하는{'\n'}특별 특강
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {specialLectures.map((lecture, index) => (
              <Card key={index} padding="large" variant="elevated">
                <Typography variant="h6" className="mb-2">
                  {lecture.title}
                </Typography>
                <Typography variant="small" color="tertiary" className="mb-4">
                  {lecture.speaker} | {lecture.date}
                </Typography>
                <Typography variant="body" color="secondary">
                  {lecture.description}
                </Typography>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="large"
              onClick={() => handleConsultationClick()}
            >
              KH정보교육원 지원하기
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Reviews Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4 whitespace-pre-line">
              수강생 블로그에서도 확인할 수 있는{'\n'}100% Real 후기
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {blogReviews.map((review, index) => (
              <Card key={index} padding="medium" variant="elevated" className="hover:border-[var(--color-brand-accent)] transition-colors cursor-pointer">
                <Typography variant="h6" className="mb-2">
                  {review.title}
                </Typography>
                <Typography variant="small" color="tertiary" className="mb-4">
                  {review.author} | {review.date}
                </Typography>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-brand-accent)] hover:underline text-sm"
                >
                  블로그 보기 →
                </a>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="large"
              onClick={() => handleConsultationClick()}
            >
              KH정보교육원 지원하기
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Support Section */}
      <section className="py-5 bg-[var(--color-bg-secondary)] flex items-center">
        <div className="max-w-[1024px] mx-auto px-6 w-full">
          <div className="text-center">
            <Typography variant="h2" className="mb-3">
              {learningSupport.title}
            </Typography>
            <Typography variant="h4" color="secondary" className="mb-4">
              {learningSupport.subtitle}
            </Typography>
            <Typography variant="body" color="secondary" className="text-lg">
              온오프라인을 넘나드는 든든한 학습지원 시스템
            </Typography>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              지점 안내
            </Typography>
            <Typography variant="body" color="secondary" className="text-lg">
              전국 5개 지점에서 만나보세요
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <Card key={index} padding="medium" variant="default">
                <Typography variant="h6" className="mb-2">
                  {location.name}
                </Typography>
                {location.branches ? (
                  <div className="space-y-2">
                    {location.branches.map((branch, branchIndex) => (
                      <div key={branchIndex}>
                        <Typography variant="small" className="font-semibold mb-1">
                          {branch.name}
                        </Typography>
                        <Typography variant="small" color="tertiary">
                          {branch.address}
                        </Typography>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography variant="small" color="tertiary">
                    {location.address}
                  </Typography>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Types Section */}
      <section id="support" className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              국비지원 안내
            </Typography>
            <Typography variant="body" color="secondary" className="text-lg">
              다양한 국비지원 프로그램을 통해 부담 없이 학습하세요
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coursesData.common_info.support_types.map((support, index) => (
              <Card key={index} padding="large" variant="elevated">
                <Typography variant="h5" className="mb-3">
                  {support.type}
                </Typography>
                <Typography variant="body" color="secondary" className="mb-4">
                  {support.description}
                </Typography>
                <div className="space-y-2">
                  {support.courses.map((course, courseIndex) => (
                    <Badge key={courseIndex} variant="info" size="small">
                      {course}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        logoText={companyInfo.name}
        description="1998년부터 20년 이상 IT 전문 교육을 제공해온 KH정보교육원입니다."
        columns={[
          {
            title: '지점 안내',
            links: locations.map(loc => ({
              label: loc.name,
              href: '#locations'
            }))
          },
          {
            title: '소셜 미디어',
            links: [
              { label: '페이스북', href: socialMedia.facebook, external: true },
              { label: '블로그', href: socialMedia.blog, external: true },
              { label: '인스타그램', href: socialMedia.instagram, external: true },
              { label: '카카오톡', href: socialMedia.kakao, external: true }
            ]
          }
        ]}
        bottomLinks={[
          { label: '개인정보처리방침', href: '#' },
          { label: '이용약관', href: '#' }
        ]}
        copyright={companyInfo.copyright}
      />

      {/* Sticky Bottom Banner */}
      {showStickyBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[var(--z-index-header)] bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-primary)] px-4 sm:px-6 py-3 sm:py-4 shadow-[var(--shadow-high)] transition-all duration-300">
          <div className="max-w-[1024px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center gap-2 flex-1 min-w-0 flex-wrap justify-center sm:justify-start">
              <Typography variant="body" className="text-white text-sm sm:text-base text-center sm:text-left">
                기업이 찾는 고급 인력이 되고싶다면?
              </Typography>
              <span className="text-xl sm:text-2xl">🧑‍💻</span>
              <span className="text-[var(--color-semantic-green)] font-semibold text-sm sm:text-base whitespace-nowrap">
                → 수강료 0원
              </span>
            </div>
            <Button
              variant="primary"
              size="large"
              onClick={() => handleConsultationClick()}
              className="bg-[var(--color-semantic-green)] hover:bg-[var(--color-semantic-green)]/90 text-white whitespace-nowrap rounded-lg px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base font-semibold"
            >
              지금 시작하기
            </Button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[var(--z-index-tooltip)] p-4 rounded-full bg-[var(--color-brand-accent)] text-white shadow-[var(--shadow-high)] hover:bg-[var(--color-brand-accent-hover)] transition-all animate-in fade-in duration-300"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Consultation Modal */}
      <Modal
        isOpen={isConsultationModalOpen}
        onClose={() => {
          setIsConsultationModalOpen(false);
          setFormSubmitted(false);
        }}
        title="상담 신청"
        size="medium"
      >
        {formSubmitted ? (
          <Alert variant="success" title="신청 완료">
            상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="이름"
              placeholder="이름을 입력하세요"
              required
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            
            <Input
              label="연락처"
              type="tel"
              placeholder="010-0000-0000"
              required
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
            
            <Input
              label="이메일"
              type="email"
              placeholder="example@email.com"
              required
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                관심 강의
              </label>
              <select
                className="w-full px-3 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-md text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-[var(--color-brand-accent)] transition-all"
                value={formData.course}
                onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
              >
                <option value="">선택하세요</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                문의사항
              </label>
              <textarea
                className="w-full px-3 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-md text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-[var(--color-brand-accent)] transition-all min-h-[100px] resize-y"
                placeholder="문의사항을 입력하세요"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={() => setIsConsultationModalOpen(false)}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
              >
                신청하기
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
