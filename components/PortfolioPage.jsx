import { useCallback, useEffect, useRef, useState } from 'react'
import HomeSection from './SectionHome'
import AboutSection from './SectionAbout'
import SkillsSection from './SectionSkills'
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
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef(null)
  const sectionRefs = useRef([])
  const activeRef = useRef(0)

  const t = (path) => getMessage(locale, path)

  const sections = [
    { id: 'home', label: t('menu.home') },
    { id: 'about', label: t('menu.about') },
    { id: 'skills', label: t('menu.skills') },
    { id: 'projects', label: t('menu.projects') },
    { id: 'work', label: t('menu.work') },
    { id: 'contact', label: t('menu.contact') }
  ]
  const sectionCount = sections.length

  const setActive = useCallback((index) => {
    activeRef.current = index
    setActiveSection(index)
  }, [])

  // Move the deck to a slide on the horizontal axis.
  const goTo = useCallback((index) => {
    const container = containerRef.current
    if (!container) return
    const clamped = Math.max(0, Math.min(index, sectionRefs.current.length - 1))
    container.scrollTo({ left: clamped * container.clientWidth, behavior: 'smooth' })
    setActive(clamped)
  }, [setActive])

  const handleScroll = () => {
    const container = containerRef.current
    if (!container || !container.clientWidth) return
    setActive(Math.round(container.scrollLeft / container.clientWidth))
  }

  const handleLocaleSelect = (code) => {
    onLocaleChange(code)
    setLanguageOpen(false)
    setMobileMenuOpen(false)
  }

  // Wheel → horizontal (one slide per gesture) + arrow-key navigation.
  // Vertical wheel is left untouched while a slide's own content can still scroll.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let locked = false

    const onWheel = (event) => {
      const slide = sectionRefs.current[activeRef.current]
      if (slide && slide.scrollHeight > slide.clientHeight + 1) {
        const atTop = slide.scrollTop <= 0
        const atBottom = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 1
        if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) return
      }

      event.preventDefault()
      if (locked) return

      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (Math.abs(delta) < 8) return

      goTo(activeRef.current + (delta > 0 ? 1 : -1))
      locked = true
      window.setTimeout(() => { locked = false }, 700)
    }

    const onKey = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goTo(activeRef.current + 1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(activeRef.current - 1)
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      container.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [goTo])

  const selectedLanguage = languages.find((item) => item.code === locale) || languages[0]

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">{t('home.brand')}</div>

          <nav className="desktop-nav">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`nav-link ${activeSection === index ? 'active' : ''}`}
                type="button"
                onClick={() => goTo(index)}
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
                  onClick={() => goTo(index)}
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
          className="section"
        >
          <HomeSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          id="about"
          className="section"
        >
          <AboutSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          id="skills"
          className="section"
        >
          <SkillsSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          id="projects"
          className="section"
        >
          <ProjectsSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          id="work"
          className="section"
        >
          <WorkSection t={t} />
        </section>

        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          id="contact"
          className="section"
        >
          <ContactSection t={t} />
        </section>
      </main>

      <button
        className="deck-arrow deck-arrow--prev"
        type="button"
        onClick={() => goTo(activeSection - 1)}
        disabled={activeSection === 0}
        aria-label={t('menu.previous')}
      >
        ◄
      </button>
      <button
        className="deck-arrow deck-arrow--next"
        type="button"
        onClick={() => goTo(activeSection + 1)}
        disabled={activeSection === sectionCount - 1}
        aria-label={t('menu.next')}
      >
        ►
      </button>

      <Footer t={t} />
    </div>
  )
}
