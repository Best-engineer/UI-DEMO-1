'use client';

import React, { useState } from 'react';
import { Button, Card, Input, Badge, Alert, Typography, Carousel, Navbar, Footer, Hero } from '../../components/ui';

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-[1024px] mx-auto px-6 py-16">
        <div className="mb-12">
          <Typography variant="h1" className="mb-4">
            Component Library
          </Typography>
          <Typography variant="body" color="secondary">
            Linear Dark Theme 기반의 재사용 가능한 컴포넌트 데모
          </Typography>
        </div>

        {/* Navbar Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Navbar
          </Typography>
          <div className="space-y-8">
            <div>
              <Typography variant="h5" className="mb-4">Default Navbar</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Navbar
                  logoText="Linear"
                  links={[
                    { label: 'Features', href: '#features' },
                    { label: 'Pricing', href: '#pricing' },
                    { label: 'About', href: '#about' },
                    { label: 'Docs', href: '#docs', external: true }
                  ]}
                  ctaButton={{
                    label: 'Get Started',
                    onClick: () => alert('Get Started clicked!')
                  }}
                />
              </Card>
            </div>
            <div>
              <Typography variant="h5" className="mb-4">Transparent Navbar</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <div className="bg-gradient-to-br from-[var(--color-brand-accent)] to-[var(--color-semantic-indigo)] p-8">
                  <Navbar
                    variant="transparent"
                    logoText="Linear"
                    links={[
                      { label: 'Home', href: '#' },
                      { label: 'Products', href: '#' },
                      { label: 'Contact', href: '#' }
                    ]}
                    ctaButton={{
                      label: 'Sign In',
                      href: '#signin'
                    }}
                  />
                </div>
              </Card>
            </div>
            <div>
              <Typography variant="h5" className="mb-4">Navbar with Custom Logo</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Navbar
                  logo={
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-brand-accent)] to-[var(--color-semantic-blue)] flex items-center justify-center">
                      <span className="text-white font-bold">L</span>
                    </div>
                  }
                  logoText=""
                  links={[
                    { label: 'Dashboard', href: '#' },
                    { label: 'Projects', href: '#' },
                    { label: 'Team', href: '#' }
                  ]}
                />
              </Card>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Hero
          </Typography>
          <div className="space-y-8">
            <div>
              <Typography variant="h5" className="mb-4">Default Hero</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Hero
                  title="Build amazing products faster"
                  subtitle="Welcome"
                  description="Create beautiful, modern applications with our comprehensive component library. Everything you need to build your next project."
                  primaryAction={{
                    label: 'Get Started',
                    onClick: () => alert('Get Started clicked!')
                  }}
                  secondaryAction={{
                    label: 'Learn More',
                    href: '#learn'
                  }}
                />
              </Card>
            </div>
            <div>
              <Typography variant="h5" className="mb-4">Centered Hero</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Hero
                  variant="centered"
                  title="Transform your workflow"
                  subtitle="Productivity"
                  description="Streamline your team's work with powerful tools designed for modern teams. Collaborate seamlessly and ship faster."
                  primaryAction={{
                    label: 'Start Free Trial',
                    onClick: () => alert('Trial started!')
                  }}
                  secondaryAction={{
                    label: 'View Demo',
                    onClick: () => alert('Demo opened!')
                  }}
                />
              </Card>
            </div>
            <div>
              <Typography variant="h5" className="mb-4">Split Hero with Content</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Hero
                  variant="split"
                  title="Everything you need in one place"
                  subtitle="All-in-one"
                  description="Manage projects, track progress, and collaborate with your team all from a single, intuitive interface."
                  primaryAction={{
                    label: 'Try it Free',
                    onClick: () => alert('Free trial started!')
                  }}
                >
                  <div className="bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-quaternary)] rounded-lg p-8 border border-[var(--color-border-primary)]">
                    <div className="space-y-4">
                      <div className="h-32 bg-[var(--color-bg-secondary)] rounded-md flex items-center justify-center">
                        <Typography variant="body" color="tertiary">Feature Preview</Typography>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 bg-[var(--color-bg-secondary)] rounded-md"></div>
                        <div className="h-20 bg-[var(--color-bg-secondary)] rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </Hero>
              </Card>
            </div>
            <div>
              <Typography variant="h5" className="mb-4">Hero with Background Image</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Hero
                  variant="centered"
                  title="Launch your next big idea"
                  subtitle="Innovation"
                  description="Join thousands of teams building the future with our platform. Start building today."
                  backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
                  primaryAction={{
                    label: 'Get Started',
                    onClick: () => alert('Get Started clicked!')
                  }}
                />
              </Card>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Footer
          </Typography>
          <div className="space-y-8">
            <div>
              <Typography variant="h5" className="mb-4">Default Footer</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Footer
                  logoText="Linear"
                  description="Building the future of product development. Modern tools for modern teams."
                  columns={[
                    {
                      title: 'Product',
                      links: [
                        { label: 'Features', href: '#features' },
                        { label: 'Pricing', href: '#pricing' },
                        { label: 'Changelog', href: '#changelog' },
                        { label: 'Roadmap', href: '#roadmap' }
                      ]
                    },
                    {
                      title: 'Company',
                      links: [
                        { label: 'About', href: '#about' },
                        { label: 'Blog', href: '#blog' },
                        { label: 'Careers', href: '#careers' },
                        { label: 'Contact', href: '#contact' }
                      ]
                    },
                    {
                      title: 'Resources',
                      links: [
                        { label: 'Documentation', href: '#docs' },
                        { label: 'API Reference', href: '#api', external: true },
                        { label: 'Community', href: '#community' },
                        { label: 'Support', href: '#support' }
                      ]
                    }
                  ]}
                  bottomLinks={[
                    { label: 'Privacy Policy', href: '#privacy' },
                    { label: 'Terms of Service', href: '#terms' },
                    { label: 'Cookie Policy', href: '#cookies' }
                  ]}
                />
              </Card>
            </div>
            <div>
              <Typography variant="h5" className="mb-4">Minimal Footer</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Footer
                  logoText="Linear"
                  bottomLinks={[
                    { label: 'Privacy', href: '#privacy' },
                    { label: 'Terms', href: '#terms' }
                  ]}
                  copyright="© 2025 Linear. All rights reserved."
                />
              </Card>
            </div>
            <div>
              <Typography variant="h5" className="mb-4">Footer with Custom Logo</Typography>
              <Card padding="none" variant="default" className="overflow-hidden">
                <Footer
                  logo={
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-brand-accent)] to-[var(--color-semantic-blue)] flex items-center justify-center">
                      <span className="text-white font-bold">L</span>
                    </div>
                  }
                  logoText=""
                  description="Simple, powerful, and fast. Everything you need to build great products."
                  columns={[
                    {
                      title: 'Platform',
                      links: [
                        { label: 'Features', href: '#' },
                        { label: 'Integrations', href: '#' },
                        { label: 'Security', href: '#' }
                      ]
                    },
                    {
                      title: 'Support',
                      links: [
                        { label: 'Help Center', href: '#' },
                        { label: 'Contact Us', href: '#' },
                        { label: 'Status', href: '#', external: true }
                      ]
                    }
                  ]}
                />
              </Card>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Typography
          </Typography>
          <Card padding="large">
            <div className="space-y-4">
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
              <Typography variant="body">Body text - Regular paragraph text</Typography>
              <Typography variant="small">Small text - For captions and labels</Typography>
              <Typography variant="tiny">Tiny text - For fine print</Typography>
              <div className="pt-4 border-t border-[var(--color-border-primary)]">
                <Typography variant="body" color="primary">Primary text color</Typography>
                <Typography variant="body" color="secondary">Secondary text color</Typography>
                <Typography variant="body" color="tertiary">Tertiary text color</Typography>
                <Typography variant="body" color="quaternary">Quaternary text color</Typography>
              </div>
            </div>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Buttons
          </Typography>
          <Card padding="large">
            <div className="space-y-6">
              <div>
                <Typography variant="h5" className="mb-4">Variants</Typography>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>
              <div>
                <Typography variant="h5" className="mb-4">Sizes</Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="small">Small</Button>
                  <Button size="medium">Medium</Button>
                  <Button size="large">Large</Button>
                </div>
              </div>
              <div>
                <Typography variant="h5" className="mb-4">States</Typography>
                <div className="flex flex-wrap gap-3">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Inputs
          </Typography>
          <Card padding="large">
            <div className="space-y-6 max-w-md">
              <Input
                label="Default Input"
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="With Helper Text"
                placeholder="Enter email..."
                helperText="We'll never share your email"
              />
              <Input
                label="With Error"
                placeholder="Enter password..."
                error="Password must be at least 8 characters"
              />
              <Input
                label="Full Width"
                placeholder="Full width input..."
                fullWidth
              />
            </div>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Badges
          </Typography>
          <Card padding="large">
            <div className="space-y-6">
              <div>
                <Typography variant="h5" className="mb-4">Variants</Typography>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>
              <div>
                <Typography variant="h5" className="mb-4">Sizes</Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge size="small">Small Badge</Badge>
                  <Badge size="medium">Medium Badge</Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Alerts Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Alerts
          </Typography>
          <Card padding="large">
            <div className="space-y-4">
              {showAlert && (
                <Alert
                  variant="info"
                  title="Information"
                  onClose={() => setShowAlert(false)}
                >
                  This is an informational alert message.
                </Alert>
              )}
              <Alert variant="success" title="Success">
                Your changes have been saved successfully.
              </Alert>
              <Alert variant="warning" title="Warning">
                Please review your input before submitting.
              </Alert>
              <Alert variant="error" title="Error">
                Something went wrong. Please try again.
              </Alert>
            </div>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Cards
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="small" variant="default">
              <Typography variant="h5" className="mb-2">Default Card</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                Small padding, default variant
              </Typography>
            </Card>
            <Card padding="medium" variant="elevated">
              <Typography variant="h5" className="mb-2">Elevated Card</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                Medium padding, elevated variant with shadow
              </Typography>
            </Card>
            <Card padding="large" variant="default" onClick={() => alert('Card clicked!')}>
              <Typography variant="h5" className="mb-2">Interactive Card</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                Clickable card with hover effect
              </Typography>
            </Card>
            <Card padding="none" variant="default">
              <div className="p-4">
                <Typography variant="h5" className="mb-2">No Padding</Typography>
                <Typography variant="body" color="secondary" className="text-sm">
                  Card with no padding (custom padding inside)
                </Typography>
              </div>
            </Card>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Color Palette
          </Typography>
          <Card padding="large">
            <div className="space-y-8">
              <div>
                <Typography variant="h5" className="mb-4">Brand Colors</Typography>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-brand-primary)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Primary</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-brand-accent)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Accent</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-brand-accent-hover)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Accent Hover</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-brand-accent-tint)] mb-2 border border-[var(--color-border-primary)]"></div>
                    <Typography variant="small" color="tertiary">Accent Tint</Typography>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="h5" className="mb-4">Semantic Colors</Typography>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-semantic-red)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Red</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-semantic-orange)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Orange</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-semantic-yellow)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Yellow</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-semantic-green)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Green</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-semantic-blue)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Blue</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-semantic-indigo)] mb-2"></div>
                    <Typography variant="small" color="tertiary">Indigo</Typography>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="h5" className="mb-4">Background Levels</Typography>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-bg-level0)] mb-2 border border-[var(--color-border-primary)]"></div>
                    <Typography variant="small" color="tertiary">Level 0</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-bg-level1)] mb-2 border border-[var(--color-border-primary)]"></div>
                    <Typography variant="small" color="tertiary">Level 1</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-bg-level2)] mb-2 border border-[var(--color-border-primary)]"></div>
                    <Typography variant="small" color="tertiary">Level 2</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-bg-level3)] mb-2 border border-[var(--color-border-primary)]"></div>
                    <Typography variant="small" color="tertiary">Level 3</Typography>
                  </div>
                  <div>
                    <div className="h-16 rounded-md bg-[var(--color-bg-secondary)] mb-2 border border-[var(--color-border-primary)]"></div>
                    <Typography variant="small" color="tertiary">Secondary</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Cards with Images Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Cards with Images
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              variant="elevated"
              image={{
                src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
                alt: 'Modern workspace',
                objectFit: 'cover'
              }}
            >
              <Typography variant="h5" className="mb-2">Modern Workspace</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                A clean and organized workspace designed for productivity and creativity.
              </Typography>
              <div className="mt-4 flex gap-2">
                <Badge variant="primary">Design</Badge>
                <Badge variant="info">Workspace</Badge>
              </div>
            </Card>

            <Card
              variant="default"
              image={{
                src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
                alt: 'Coding setup',
                objectFit: 'cover'
              }}
            >
              <Typography variant="h5" className="mb-2">Coding Setup</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                Professional development environment with multiple monitors and ergonomic setup.
              </Typography>
              <div className="mt-4 flex gap-2">
                <Badge variant="success">Tech</Badge>
              </div>
            </Card>

            <Card
              variant="elevated"
              image={{
                src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                alt: 'Data visualization',
                objectFit: 'cover'
              }}
              onClick={() => alert('Card clicked!')}
            >
              <Typography variant="h5" className="mb-2">Data Analytics</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                Beautiful data visualizations that tell compelling stories from complex datasets.
              </Typography>
              <div className="mt-4 flex gap-2">
                <Badge variant="warning">Analytics</Badge>
                <Badge variant="info">Data</Badge>
              </div>
            </Card>

            <Card
              variant="default"
              image={{
                src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
                alt: 'Mobile app',
                objectFit: 'cover'
              }}
              imagePosition="bottom"
            >
              <Typography variant="h5" className="mb-2">Mobile App Design</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                Intuitive mobile interface design with focus on user experience and accessibility.
              </Typography>
              <div className="mt-4 flex gap-2">
                <Badge variant="primary">Mobile</Badge>
                <Badge variant="success">UI/UX</Badge>
              </div>
            </Card>

            <Card
              variant="elevated"
              image={{
                src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
                alt: 'Team collaboration',
                objectFit: 'cover'
              }}
            >
              <Typography variant="h5" className="mb-2">Team Collaboration</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                Effective team collaboration tools that enhance communication and productivity.
              </Typography>
              <div className="mt-4 flex gap-2">
                <Badge variant="info">Team</Badge>
                <Badge variant="primary">Productivity</Badge>
              </div>
            </Card>

            <Card
              variant="default"
              image={{
                src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
                alt: 'Cloud infrastructure',
                objectFit: 'cover'
              }}
            >
              <Typography variant="h5" className="mb-2">Cloud Infrastructure</Typography>
              <Typography variant="body" color="secondary" className="text-sm">
                Scalable cloud solutions that grow with your business needs.
              </Typography>
              <div className="mt-4 flex gap-2">
                <Badge variant="success">Cloud</Badge>
                <Badge variant="info">Infrastructure</Badge>
              </div>
            </Card>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Carousel
          </Typography>
          <div className="space-y-8">
            <div>
              <Typography variant="h5" className="mb-4">Basic Carousel</Typography>
              <Carousel
                items={[
                  {
                    id: 1,
                    content: (
                      <div className="h-64 bg-gradient-to-br from-[var(--color-brand-accent)] to-[var(--color-semantic-indigo)] flex items-center justify-center rounded-lg">
                        <Typography variant="h3" className="text-white">Slide 1</Typography>
                      </div>
                    )
                  },
                  {
                    id: 2,
                    content: (
                      <div className="h-64 bg-gradient-to-br from-[var(--color-semantic-green)] to-[var(--color-semantic-blue)] flex items-center justify-center rounded-lg">
                        <Typography variant="h3" className="text-white">Slide 2</Typography>
                      </div>
                    )
                  },
                  {
                    id: 3,
                    content: (
                      <div className="h-64 bg-gradient-to-br from-[var(--color-semantic-orange)] to-[var(--color-semantic-red)] flex items-center justify-center rounded-lg">
                        <Typography variant="h3" className="text-white">Slide 3</Typography>
                      </div>
                    )
                  }
                ]}
                showIndicators
                showNavigation
              />
            </div>

            <div>
              <Typography variant="h5" className="mb-4">Auto-play Carousel</Typography>
              <Carousel
                items={[
                  {
                    id: 1,
                    content: (
                      <Card variant="elevated" padding="large">
                        <div className="text-center">
                          <Typography variant="h4" className="mb-2">Feature 1</Typography>
                          <Typography variant="body" color="secondary">
                            Powerful automation tools that save you time
                          </Typography>
                        </div>
                      </Card>
                    )
                  },
                  {
                    id: 2,
                    content: (
                      <Card variant="elevated" padding="large">
                        <div className="text-center">
                          <Typography variant="h4" className="mb-2">Feature 2</Typography>
                          <Typography variant="body" color="secondary">
                            Real-time collaboration with your team
                          </Typography>
                        </div>
                      </Card>
                    )
                  },
                  {
                    id: 3,
                    content: (
                      <Card variant="elevated" padding="large">
                        <div className="text-center">
                          <Typography variant="h4" className="mb-2">Feature 3</Typography>
                          <Typography variant="body" color="secondary">
                            Advanced analytics and reporting
                          </Typography>
                        </div>
                      </Card>
                    )
                  },
                  {
                    id: 4,
                    content: (
                      <Card variant="elevated" padding="large">
                        <div className="text-center">
                          <Typography variant="h4" className="mb-2">Feature 4</Typography>
                          <Typography variant="body" color="secondary">
                            Secure and reliable infrastructure
                          </Typography>
                        </div>
                      </Card>
                    )
                  }
                ]}
                autoPlay
                autoPlayInterval={4000}
                showIndicators
                showNavigation
                infinite
              />
            </div>

            <div>
              <Typography variant="h5" className="mb-4">Carousel with Image Cards</Typography>
              <Carousel
                items={[
                  {
                    id: 1,
                    content: (
                      <Card
                        variant="elevated"
                        image={{
                          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
                          alt: 'Workspace',
                          objectFit: 'cover'
                        }}
                      >
                        <Typography variant="h5" className="mb-2">Workspace Design</Typography>
                        <Typography variant="body" color="secondary" className="text-sm">
                          Modern and ergonomic workspace solutions
                        </Typography>
                      </Card>
                    )
                  },
                  {
                    id: 2,
                    content: (
                      <Card
                        variant="elevated"
                        image={{
                          src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
                          alt: 'Development',
                          objectFit: 'cover'
                        }}
                      >
                        <Typography variant="h5" className="mb-2">Development Tools</Typography>
                        <Typography variant="body" color="secondary" className="text-sm">
                          Professional development environment setup
                        </Typography>
                      </Card>
                    )
                  },
                  {
                    id: 3,
                    content: (
                      <Card
                        variant="elevated"
                        image={{
                          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
                          alt: 'Analytics',
                          objectFit: 'cover'
                        }}
                      >
                        <Typography variant="h5" className="mb-2">Data Analytics</Typography>
                        <Typography variant="body" color="secondary" className="text-sm">
                          Comprehensive analytics and insights
                        </Typography>
                      </Card>
                    )
                  }
                ]}
                showIndicators
                showNavigation
                infinite
              />
            </div>
          </div>
        </section>

        {/* Combined Example */}
        <section className="mb-16">
          <Typography variant="h2" className="mb-6">
            Combined Example
          </Typography>
          <Card padding="large" variant="elevated">
            <div className="space-y-6">
              <div>
                <Typography variant="h3" className="mb-2">Create New Project</Typography>
                <Typography variant="body" color="secondary">
                  Fill out the form below to create a new project
                </Typography>
              </div>
              <div className="space-y-4">
                <Input
                  label="Project Name"
                  placeholder="Enter project name..."
                  fullWidth
                />
                <Input
                  label="Description"
                  placeholder="Enter description..."
                  fullWidth
                />
                <div className="flex gap-3">
                  <Badge variant="primary">New</Badge>
                  <Badge variant="info">In Progress</Badge>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-[var(--color-border-primary)]">
                <Button variant="primary">Create Project</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

