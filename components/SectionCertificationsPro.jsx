const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// certificateLink points at a local file (e.g. "/certificate-psm1.pdf"), so it
// needs the base path prefix; link (verify) is always an external URL and is
// used as-is.
function resolveLink(href) {
  return href && href.startsWith('/') ? `${basePath}${href}` : href
}

// Badge icon is inline here (single use) rather than in SocialIcons.jsx, which
// is scoped to social/contact links.
function IconBadge() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7" />
    </svg>
  )
}

export default function SectionCertificationsPro({ t }) {
  const items = t('certifications.items') || []

  return (
    <>
      <h2>{t('certifications.title')}</h2>
      <p className="pro-placeholder-lead">{t('certifications.lead')}</p>

      <div className="pro-cert-grid">
        {items.map((item) => (
          <article className="pro-panel pro-cert-card" key={`${item.name}-${item.year}`}>
            <div className="pro-cert-badge">
              {item.badge ? (
                <img src={resolveLink(item.badge)} alt="" className="pro-cert-badge-img" />
              ) : (
                <IconBadge />
              )}
            </div>
            <div className="pro-cert-body">
              {/* "name — issuer" as the heading, "year" as the line below —
                  matches the two-line format the client asked for (the year
                  field carries the full "PSM I · Issued Dec 2025" string). */}
              <h3>
                {item.name} — {item.issuer}
              </h3>
              <p className="pro-cert-issuer">{item.year}</p>
              {item.credentialId && (
                <p className="pro-cert-id">
                  {t('certifications.credentialLabel')}: {item.credentialId}
                </p>
              )}
              {(item.link || item.certificateLink) && (
                <div className="pro-cert-actions">
                  {item.link && (
                    <a
                      className="pro-btn pro-btn--ghost pro-cert-link"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('certifications.verifyLabel')} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {item.certificateLink && (
                    <a
                      className="pro-btn pro-btn--ghost pro-cert-link"
                      href={resolveLink(item.certificateLink)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('certifications.certificateLabel')}
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
