import { useEffect, useRef, useState } from 'react'
import HomeSection from './SectionHome'
import AboutSection from './SectionAbout'
import ContactSection from './SectionContact'
import ProjectsSection from './SectionProjects'
import WorkSection from './SectionWork'
import Footer from './Footer'
import { getMessage } from '../lib/locales'

const languages = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'pt', label: 'PT', flag: '🇵🇹' }
]

export default function PortfolioPage({ locale, onLocaleChange }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setLanguageOpen] = useState(false)
  const [isAutoScrolling, setAutoScrolling] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef(null)
  const sectionRefs = useRef([])
  const scrollTimer = useRef(null)

  const t = (path) => getMessage(locale, path)

  const sections = [
    { id: 'home', label: t('menu.home'), component: HomeSection },
    { id: 'about', label: t('menu.about'), component: AboutSection },
    { id: 'contact', label: t('menu.contact'), component: ContactSection },
    { id: 'projects', label: t('menu.projects'), component: ProjectsSection },
    { id: 'work', label: t('menu.work'), component: WorkSection }
  ]

  const scrollToSection = (index) => {
    const section = sectionRefs.current[index]
    if (!section || !containerRef.current) return

    setAutoScrolling(true)
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(index)

    if (scrollTimer.current) {
      window.clearTimeout(scrollTimer.current)
    }
    scrollTimer.current = window.setTimeout(() => {
      setAutoScrolling(false)
    }, 550)
  }

  const handleScroll = () => {
    if (!containerRef.current || isAutoScrolling) return

    const { scrollTop, clientHeight } = containerRef.current
    const threshold = clientHeight * 0.35
    const offsets = sectionRefs.current.map((section) => section?.offsetTop || 0)
    let currentIndex = 0

    for (let index = 0; index < offsets.length; index += 1) {
      if (scrollTop >= offsets[index]) {
        currentIndex = index
      }
    }

    const currentTop = offsets[currentIndex] || 0
    const distance = scrollTop - currentTop

    if (distance > threshold && currentIndex < offsets.length - 1) {
      scrollToSection(currentIndex + 1)
    } else if (distance < -threshold && currentIndex > 0) {
      scrollToSection(currentIndex - 1)
    } else {
      setActiveSection(currentIndex)
    }
  }

  const handleLocaleSelect = (code) => {
    onLocaleChange(code)
    setLanguageOpen(false)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        window.clearTimeout(scrollTimer.current)
      }
    }
  }, [])

  const selectedLanguage = languages.find((item) => item.code === locale) || languages[0]

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">{t('home.title')}</div>

          <nav className="desktop-nav">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`nav-link ${activeSection === index ? 'active' : ''}`}
                type="button"
                onClick={() => scrollToSection(index)}
              >
                {section.label}
              </button>
            ))}

            <div className="language-selector">
              <button
                className="language-button"
                type="button"
                onClick={() => setLanguageOpen((open) => !open)}
              >
                {selectedLanguage.flag} {selectedLanguage.label}
              </button>
              {isLanguageOpen && (
                <div className="language-menu">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      className="language-item"
                      type="button"
                      onClick={() => handleLocaleSelect(item.code)}
                    >
                      {item.flag} {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            className="mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Open mobile menu"
          >
            ☰
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className="mobile-link"
                  type="button"
                  onClick={() => scrollToSection(index)}
                >
                  {section.label}
                </button>
              ))}
            </nav>
            <div className="mobile-language">
              <span>{t('menu.language')}</span>
              {languages.map((item) => (
                <button
                  key={item.code}
                  className={`language-item ${item.code === locale ? 'selected' : ''}`}
                  type="button"
                  onClick={() => handleLocaleSelect(item.code)}
                >
                  {item.flag} {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="scroll-area" ref={containerRef} onScroll={handleScroll}>
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          id="home"
          className="section section-home"
        >
          <HomeSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          id="about"
          className="section section-white"
        >
          <AboutSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          id="contact"
          className="section section-white"
        >
          <ContactSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          id="projects"
          className="section section-white"
        >
          <ProjectsSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          id="work"
          className="section section-white"
        >
          <WorkSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          id="footer"
          className="section section-footer"
        >
          <Footer t={t} />
        </section>
      </main>
    </div>
  )
}
