import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getMessage } from '../lib/locales'
import SectionHeroPro from './SectionHeroPro'
import SectionAboutPro from './SectionAboutPro'
import SectionSkillsPro from './SectionSkillsPro'
import SectionProjectsPro from './SectionProjectsPro'
import SectionExperiencePro from './SectionExperiencePro'
import SectionCertificationsPro from './SectionCertificationsPro'
import SectionContactPro from './SectionContactPro'
import FooterPro from './FooterPro'

const languages = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'pt', label: 'PT', flag: '🇵🇹' }
]

const sectionIds = ['home', 'about', 'skills', 'projects', 'work', 'certifications', 'contact']

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function ProfessionalPage({ locale, onLocaleChange, onManageCookies }) {
  const t = (path) => getMessage(locale, path)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setLanguageOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const sectionRefs = useRef({})

  const sections = sectionIds.map((id) => ({ id, label: t(`menu.${id}`) }))
  const selectedLanguage = languages.find((item) => item.code === locale) || languages[0]

  // Scrollspy: highlight the nav item for the section whose top has crossed
  // above a reference line near the vertical center of the viewport (45%
  // down, mirroring the sticky header offset). Recomputed from actual
  // element positions on every scroll frame rather than relying on
  // IntersectionObserver's change-only callbacks — a short section (e.g.
  // "home" at the top, "contact" at the bottom, but potentially any of them)
  // can otherwise be scrolled past entirely within a single frame during a
  // fast scroll, without ever firing an enter/exit event, leaving the
  // previous nav item stuck as "active".
  useEffect(() => {
    const elements = sectionIds.map((id) => sectionRefs.current[id]).filter(Boolean)
    if (!elements.length) return

    let ticking = false

    const computeActive = () => {
      ticking = false
      const referenceY = window.innerHeight * 0.45

      // The section whose top is highest above the reference line while
      // still being the closest one to it "wins" — i.e. the last id in
      // page order whose top has already crossed the line. This holds at
      // both edges too: at scroll top only "home"'s top qualifies, and at
      // max scroll every section above "contact" already qualifies, so
      // "contact" (the last one checked) naturally wins.
      let current = sectionIds[0]
      elements.forEach((el, index) => {
        if (el.getBoundingClientRect().top <= referenceY) {
          current = sectionIds[index]
        }
      })
      setActiveSection(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(computeActive)
      }
    }

    computeActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [locale])

  const scrollToSection = useCallback((id) => {
    const el = sectionRefs.current[id]
    if (!el) return
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    setMobileMenuOpen(false)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [])

  const handleLocaleSelect = (code) => {
    onLocaleChange(code)
    setLanguageOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <div className="pro-page">
      <header className="pro-header">
        <div className="pro-header-inner">
          <span className="pro-brand">{t('home.brand')}</span>

          <nav className="pro-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className="pro-nav-link"
                aria-current={activeSection === section.id ? 'true' : undefined}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="pro-header-actions">
            <div className="pro-language-selector">
              <button
                type="button"
                className="pro-btn pro-btn--ghost pro-language-button"
                aria-haspopup="menu"
                aria-expanded={isLanguageOpen}
                onClick={() => setLanguageOpen((open) => !open)}
              >
                {selectedLanguage.flag} {selectedLanguage.label}
              </button>
              {isLanguageOpen && (
                <div className="pro-language-menu">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      className={`pro-language-item ${item.code === locale ? 'selected' : ''}`}
                      onClick={() => handleLocaleSelect(item.code)}
                    >
                      {item.flag} {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link className="pro-btn pro-enter-pixel" href="/pixel">
              <span className="pro-enter-pixel-icon" aria-hidden="true">
                👾
              </span>
              {t('world.enterPixel')}
              <span className="pro-enter-pixel-arrow" aria-hidden="true">
                ›
              </span>
            </Link>

            <button
              type="button"
              className="pro-mobile-toggle"
              aria-label={t('menu.openMenu')}
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="pro-mobile-menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              ☰
            </button>
          </div>
        </div>

        <button
          type="button"
          className={`pro-mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
          tabIndex={-1}
          onClick={() => setMobileMenuOpen(false)}
        />
        <aside
          id="pro-mobile-menu"
          className={`pro-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="pro-mobile-menu-head">
            <span>{t('home.brand')}</span>
            <button
              type="button"
              className="pro-mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={t('menu.close')}
            >
              ✕
            </button>
          </div>

          <nav className="pro-mobile-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className="pro-mobile-nav-link"
                aria-current={activeSection === section.id ? 'true' : undefined}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="pro-mobile-lang">
            <span className="pro-mobile-lang-label">{t('menu.language')}</span>
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`pro-language-item ${item.code === locale ? 'selected' : ''}`}
                onClick={() => handleLocaleSelect(item.code)}
              >
                {item.flag} {item.label}
              </button>
            ))}
          </div>

          <Link
            className="pro-btn pro-enter-pixel"
            href="/pixel"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="pro-enter-pixel-icon" aria-hidden="true">
              👾
            </span>
            {t('world.enterPixel')}
            <span className="pro-enter-pixel-arrow" aria-hidden="true">
              ›
            </span>
          </Link>
        </aside>
      </header>

      <main>
        <section id="home" ref={(el) => (sectionRefs.current.home = el)} className="pro-section">
          <SectionHeroPro t={t} onNavigate={scrollToSection} />
        </section>

        <section id="about" ref={(el) => (sectionRefs.current.about = el)} className="pro-section">
          <div className="pro-section-inner pro-section-inner--wide">
            <SectionAboutPro t={t} />
          </div>
        </section>

        <section
          id="skills"
          ref={(el) => (sectionRefs.current.skills = el)}
          className="pro-section"
        >
          <div className="pro-section-inner pro-section-inner--wide">
            <SectionSkillsPro t={t} />
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => (sectionRefs.current.projects = el)}
          className="pro-section"
        >
          <div className="pro-section-inner pro-section-inner--wide">
            <SectionProjectsPro t={t} />
          </div>
        </section>

        <section id="work" ref={(el) => (sectionRefs.current.work = el)} className="pro-section">
          <div className="pro-section-inner pro-section-inner--wide">
            <SectionExperiencePro t={t} />
          </div>
        </section>

        <section
          id="certifications"
          ref={(el) => (sectionRefs.current.certifications = el)}
          className="pro-section"
        >
          <div className="pro-section-inner pro-section-inner--wide">
            <SectionCertificationsPro t={t} />
          </div>
        </section>

        <section
          id="contact"
          ref={(el) => (sectionRefs.current.contact = el)}
          className="pro-section"
        >
          <div className="pro-section-inner pro-section-inner--wide">
            <SectionContactPro t={t} />
          </div>
        </section>
      </main>

      <FooterPro t={t} onScrollTop={scrollToTop} onManageCookies={onManageCookies} />
    </div>
  )
}
