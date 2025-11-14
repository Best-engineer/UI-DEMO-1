'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Badge, Typography, Navbar, Footer, Modal, Input, Alert, Carousel, Accordion } from '@/components/ui';
import kiData from '@/data/ki-academy-data.json';

export default function KIAcademyPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showStickyBanner, setShowStickyBanner] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeStickyNav, setActiveStickyNav] = useState('features');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
      
      // Sticky navigation active state
      const sections = ['features', 'curriculum', 'job-support', 'enrollment'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveStickyNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 초기 상태 확인
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Countdown timer
    const endDate = new Date(kiData.heroBanner.countdown.endDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setIsConsultationModalOpen(false);
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Navbar */}
      <Navbar
        logoText={kiData.siteName}
        links={[
          { label: '과정소개', href: '#features' },
          { label: '커리큘럼', href: '#curriculum' },
          { label: '취업지원', href: '#job-support' },
          { label: '모집개요', href: '#enrollment' }
        ]}
        ctaButton={{
          label: '상담 신청',
          onClick: () => setIsConsultationModalOpen(true)
        }}
      />

      {/* Hero Banner */}
      {kiData.heroBanner.countdown.display && (
        <section className="bg-gradient-to-r from-[var(--color-semantic-orange)] to-[var(--color-semantic-orange)]/80 py-3 md:py-4">
          <div className="max-w-[1024px] mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 text-white">
              <Badge variant="warning" className="bg-white text-[var(--color-semantic-orange)] text-xs sm:text-sm whitespace-nowrap">
                {kiData.heroBanner.badge}
              </Badge>
              <Typography variant="body" className="text-white text-sm sm:text-base text-center sm:text-left">
                {kiData.heroBanner.tagline}
              </Typography>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm sm:text-base md:text-lg">
                  {String(countdown.days).padStart(2, '0')}:
                  {String(countdown.hours).padStart(2, '0')}:
                  {String(countdown.minutes).padStart(2, '0')}:
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <Typography variant="body" color="secondary" className="mb-4 uppercase tracking-wider text-xs">
              {kiData.heroSection.eyebrow}
            </Typography>
            <Typography variant="h1" className="mb-6">
              {kiData.heroSection.mainHeading}
            </Typography>
            <div className="space-y-2 mb-8">
              {kiData.heroSection.subheading.map((text, index) => (
                <Typography key={index} variant="body" color="secondary" className="text-lg">
                  {text}
                </Typography>
              ))}
            </div>
            <Button
              variant="primary"
              size="large"
              onClick={() => setIsConsultationModalOpen(true)}
            >
              {kiData.heroSection.cta.text}
            </Button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-3 max-w-2xl">
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  padding="none"
                  variant="elevated"
                  className="aspect-square bg-[var(--color-bg-level1)]"
                >
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-text-tertiary)] text-sm">
                    Image {i}
                  </div>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-xl">
              {[4, 5].map((i) => (
                <Card
                  key={i}
                  padding="none"
                  variant="elevated"
                  className="aspect-square bg-[var(--color-bg-level1)]"
                >
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-text-tertiary)] text-sm">
                    Image {i}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div className="sticky top-[var(--spacing-header-height)] z-[var(--z-index-header)] bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center items-center flex-wrap">
            {kiData.stickyNavigation.items.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeStickyNav === item.href.replace('#', '')
                    ? 'border-[var(--color-brand-accent)] text-[var(--color-brand-accent)]'
                    : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <Typography variant="body">{item.label}</Typography>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6 space-y-20">
          {kiData.features.sections.map((section, index) => (
            <div key={index}>
              {section.heading && (
                <div className={`text-center mb-12 ${section.heading.includes('오프라인 집중력') ? 'py-20 px-6 rounded-lg relative overflow-hidden' : ''}`}>
                  {section.heading.includes('오프라인 집중력') && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                      style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80")'
                      }}
                    />
                  )}
                  <Typography variant="h2" className={`mb-4 whitespace-pre-line relative z-10 ${section.heading.includes('오프라인 집중력') ? 'text-[2.5rem] md:text-[3rem]' : ''}`}>
                    {section.heading}
                  </Typography>
                  {section.subtitle && (
                    <Typography variant="h4" color="secondary" className="mb-4">
                      {section.subtitle}
                    </Typography>
                  )}
                  {section.content && (
                    <Typography variant="body" color="secondary" className="text-lg">
                      {section.content}
                    </Typography>
                  )}
                </div>
              )}

              {section.cards && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.cards.map((card, cardIndex) => (
                    <Card key={cardIndex} padding="large" variant="elevated">
                      <Typography variant="h5" className="mb-3">
                        {card.title}
                      </Typography>
                      <Typography variant="body" color="secondary">
                        {card.description}
                      </Typography>
                    </Card>
                  ))}
                </div>
              )}

              {section.items && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.items.map((item, itemIndex) => (
                    <Card key={itemIndex} padding="medium" variant="elevated" className="text-center">
                      <Typography variant="h6" className="mb-2">
                        {item.title}
                      </Typography>
                      <Typography variant="small" color="secondary">
                        {item.description}
                      </Typography>
                    </Card>
                  ))}
                </div>
              )}

              {section.statistics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card padding="large" variant="elevated" className="text-center">
                    <Typography variant="h3" className="mb-2 text-[var(--color-semantic-green)]">
                      {section.statistics.employmentRate}
                    </Typography>
                    <Typography variant="body" color="secondary">
                      취업률
                    </Typography>
                  </Card>
                  <Card padding="large" variant="elevated" className="text-center">
                    <Typography variant="h3" className="mb-2 text-[var(--color-brand-accent)]">
                      {section.statistics.averageTime}
                    </Typography>
                    <Typography variant="body" color="secondary">
                      평균 취업 기간
                    </Typography>
                  </Card>
                  <Card padding="large" variant="elevated" className="text-center">
                    <Typography variant="h3" className="mb-2 text-[var(--color-semantic-yellow)]">
                      {section.statistics.satisfaction}
                    </Typography>
                    <Typography variant="body" color="secondary">
                      만족도
                    </Typography>
                  </Card>
                </div>
              )}

              {section.technologies && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {section.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="primary" size="medium">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Node.js Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1024px] mx-auto px-6 space-y-16">
          {kiData.whyNodejs.sections.map((section, index) => (
            <div key={index}>
              <div className="text-center mb-12">
                <Typography variant="h2" className="mb-4">
                  {section.heading}
                </Typography>
                {section.content && (
                  <Typography variant="body" color="secondary" className="text-lg mb-4">
                    {section.content}
                  </Typography>
                )}
                {section.description && (
                  <Typography variant="body" color="secondary">
                    {section.description}
                  </Typography>
                )}
              </div>

              {section.cards && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.cards.map((card, cardIndex) => (
                    <Card key={cardIndex} padding="large" variant="elevated">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-brand-accent)] flex items-center justify-center text-white font-bold text-xl">
                          {card.number}
                        </div>
                        <div>
                          <Typography variant="h5" className="mb-2">
                            {card.title}
                          </Typography>
                          <Typography variant="body" color="secondary">
                            {card.description}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              {kiData.stats.heading}
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kiData.stats.stats.map((stat, index) => (
              <Card key={index} padding="large" variant="elevated" className="text-center">
                <Typography variant="h3" className="mb-2 text-[var(--color-brand-accent)]">
                  {stat.value}
                </Typography>
                <Typography variant="body" color="secondary">
                  {stat.label}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              {kiData.portfolio.heading}
            </Typography>
          </div>
          <Carousel
            items={kiData.portfolio.projects.map((project, index) => ({
              id: index,
              content: (
                <Card padding="large" variant="elevated" className="mx-4">
                  <Typography variant="h5" className="mb-3">
                    {project.title}
                  </Typography>
                  <Typography variant="body" color="secondary" className="mb-4">
                    {project.description}
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="default" size="small">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )
            }))}
            autoPlay
            autoPlayInterval={5000}
            showIndicators
            showNavigation
          />
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              {kiData.curriculum.heading}
            </Typography>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {kiData.curriculum.tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-md whitespace-nowrap transition-colors ${
                  activeTab === index
                    ? 'bg-[var(--color-brand-accent)] text-white'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                <Typography variant="body">{tab.name}</Typography>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <Card padding="large" variant="elevated">
            <div className="mb-4">
              <Typography variant="h4" className="mb-2">
                {kiData.curriculum.tabs[activeTab].title}
              </Typography>
              <Badge variant="info">{kiData.curriculum.tabs[activeTab].duration}</Badge>
            </div>
            <div className="mb-6">
              <Typography variant="body" className="font-semibold mb-3">주요 학습 내용:</Typography>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-text-secondary)]">
                {kiData.curriculum.tabs[activeTab].topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>{topic}</li>
                ))}
              </ul>
            </div>
            {kiData.curriculum.tabs[activeTab].projects && (
              <div>
                <Typography variant="body" className="font-semibold mb-2">프로젝트:</Typography>
                <Typography variant="body" color="secondary">
                  {kiData.curriculum.tabs[activeTab].projects}
                </Typography>
              </div>
            )}
          </Card>

          {/* Projects */}
          <div className="mt-12">
            <Typography variant="h4" className="mb-6">프로젝트 소개</Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {kiData.curriculum.projects.map((project, index) => (
                <Card
                  key={index}
                  padding="large"
                  variant={project.highlight ? 'elevated' : 'default'}
                  className={project.highlight ? 'border-2 border-[var(--color-brand-accent)]' : ''}
                >
                  <Badge variant={project.highlight ? 'primary' : 'default'} className="mb-3">
                    {project.type}
                  </Badge>
                  <Typography variant="h6" className="mb-2">
                    {project.name}
                  </Typography>
                  <Typography variant="body" color="secondary">
                    {project.description}
                  </Typography>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              {kiData.reviews.heading}
            </Typography>
            <Typography variant="h4" color="secondary">
              {kiData.reviews.subtitle}
            </Typography>
          </div>
          <Carousel
            items={kiData.reviews.items.map((review, index) => ({
              id: index,
              content: (
                <Card padding="large" variant="elevated" className="mx-4">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-[var(--color-semantic-yellow)]">⭐</span>
                    ))}
                  </div>
                  <Typography variant="body" className="mb-4">
                    "{review.content}"
                  </Typography>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-primary)]">
                    <div>
                      <Typography variant="h6">{review.name}</Typography>
                      <Typography variant="small" color="tertiary">
                        {review.course}
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="small" className="font-semibold">
                        {review.company}
                      </Typography>
                      <Typography variant="small" color="tertiary">
                        {review.position}
                      </Typography>
                    </div>
                  </div>
                </Card>
              )
            }))}
            autoPlay
            autoPlayInterval={5000}
            showIndicators
            showNavigation
          />
        </div>
      </section>

      {/* Interviews Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              {kiData.interviews.heading}
            </Typography>
            <Typography variant="h4" color="secondary">
              {kiData.interviews.subtitle}
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kiData.interviews.items.map((item, index) => (
              <Card key={index} padding="large" variant="elevated">
                <Badge variant="success" className="mb-3">
                  {item.tag}
                </Badge>
                <Typography variant="h6" className="mb-2">
                  {item.company}
                </Typography>
                <Typography variant="body" color="secondary" className="mb-4">
                  {item.content}
                </Typography>
                <Typography variant="small" color="tertiary">
                  {item.name} | {item.position}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Support Section */}
      <section id="job-support" className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              {kiData.jobSupport.heading}
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {kiData.jobSupport.categories.map((category, index) => (
              <Card key={index} padding="large" variant="elevated">
                <Typography variant="h4" className="mb-6">
                  {category.title}
                </Typography>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="text-[var(--color-semantic-green)] mt-1">✓</span>
                      <Typography variant="body" color="secondary">
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section id="enrollment" className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4 whitespace-pre-line">
              {kiData.enrollment.heading}
            </Typography>
          </div>

          {/* Info Box */}
          <Card padding="large" variant="elevated" className="mb-12">
            <div className="space-y-4">
              {kiData.enrollment.infoBox.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-[var(--color-border-primary)] last:border-0">
                  <Typography variant="body" className="font-semibold">
                    {item.label}
                  </Typography>
                  <div className="text-right">
                    {typeof item.value === 'object' ? (
                      <div>
                        <Typography variant="body" className="line-through text-[var(--color-text-tertiary)]">
                          {item.value.original}
                        </Typography>
                        <Typography variant="body" className="text-[var(--color-semantic-green)] font-bold">
                          {item.value.discounted}
                        </Typography>
                      </div>
                    ) : (
                      <Typography variant="body" color="secondary">
                        {item.value}
                      </Typography>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Process */}
          <div>
            <Typography variant="h3" className="mb-8 text-center">
              {kiData.enrollment.process.heading}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {kiData.enrollment.process.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-brand-accent)] flex items-center justify-center mx-auto mb-4">
                    <Typography variant="h4" className="text-white">
                      {step.number}
                    </Typography>
                  </div>
                  <Typography variant="h6" className="mb-2">
                    {step.name}
                  </Typography>
                  <Typography variant="small" color="tertiary">
                    {step.description}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              {kiData.faq.heading}
            </Typography>
            <Typography variant="h4" color="secondary">
              {kiData.faq.subtitle}
            </Typography>
          </div>
          <Accordion items={kiData.faq.questions} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-semantic-blue)] to-[var(--color-semantic-indigo)]">
        <div className="max-w-[1024px] mx-auto px-6 text-center">
          <Typography variant="h2" className="mb-8 text-white">
            {kiData.bottomCTA.text}
          </Typography>
          <Button
            variant="primary"
            size="large"
            onClick={() => setIsConsultationModalOpen(true)}
            className="bg-white text-[var(--color-semantic-blue)] hover:bg-white/90"
          >
            {kiData.bottomCTA.buttonText}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer
        logoText={kiData.siteName}
        description="20년의 노하우로 IT 전문가를 양성하는 KH정보교육원입니다."
        columns={[
          {
            title: '회사 정보',
            links: kiData.footer.companyInfo.map((info, index) => ({
              label: info,
              href: '#'
            }))
          },
          {
            title: '소셜 미디어',
            links: kiData.footer.socialLinks.map((link) => ({
              label: link.name,
              href: link.url,
              external: true
            }))
          },
          {
            title: '관련 사이트',
            links: kiData.footer.relatedSites.map((site) => ({
              label: site.name,
              href: site.url
            }))
          }
        ]}
        bottomLinks={kiData.footer.legalLinks.map((link) => ({
          label: link.name,
          href: link.url
        }))}
        copyright={kiData.footer.copyright}
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
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-[var(--color-semantic-green)] hover:bg-[var(--color-semantic-green)]/90 text-white whitespace-nowrap rounded-lg px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
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
          className="fixed bottom-8 right-8 z-[var(--z-index-tooltip)] p-4 rounded-full bg-[var(--color-brand-accent)] text-white shadow-[var(--shadow-high)] hover:bg-[var(--color-brand-accent-hover)] transition-all"
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
              <Button type="submit" variant="primary" fullWidth>
                신청하기
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

