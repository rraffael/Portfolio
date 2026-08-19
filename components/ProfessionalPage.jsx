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

  // Scrollspy: highlight the nav item for whichever section currently sits in
  // the vertical center band of the viewport (offset below the sticky header).
  useEffect(() => {
    const elements = sectionIds.map((id) => sectionRefs.current[id]).filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [locale])

  // The scrollspy band above never reaches the last section: "contact" is
  // short and followed by the footer, so once the page hits max scroll the
  // band falls over the footer and neither "certifications" nor "contact"
  // cross it — leaving the previous section stuck as "active". Force the
  // last section active whenever the page is scrolled to (or clamped at) the
  // bottom, which also covers clicking "Contact" in the nav since scrolling
  // that short last section into view clamps to the same max scroll position.
  useEffect(() => {
    const lastSectionId = sectionIds[sectionIds.length - 1]

    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActiveSection(lastSectionId)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
