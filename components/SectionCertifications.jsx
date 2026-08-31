const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// certificateLink points at a local file (e.g. "/certificate-psm1.pdf"), so it
// needs the base path prefix; link (verify) is always an external URL and is
// used as-is.
function resolveLink(href) {
  return href && href.startsWith('/') ? `${basePath}${href}` : href
}

// A hand-pixelled sparkle/star (single use, so kept inline rather than in a
// shared icon file) — colored via currentColor so the badge can go
// transparent while the glyph itself stays gold, which an emoji can't do.
function IconSparkle() {
  return (
    <svg width="28" height="28" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="3" y="0" width="1" height="1" fill="currentColor" />
      <rect x="3" y="1" width="1" height="1" fill="currentColor" />
      <rect x="0" y="2" width="1" height="1" fill="currentColor" />
      <rect x="3" y="2" width="1" height="1" fill="currentColor" />
      <rect x="6" y="2" width="1" height="1" fill="currentColor" />
      <rect x="1" y="3" width="1" height="1" fill="currentColor" />
      <rect x="3" y="3" width="1" height="1" fill="currentColor" />
      <rect x="5" y="3" width="1" height="1" fill="currentColor" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" />
      <rect x="3" y="4" width="1" height="1" fill="currentColor" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" />
      <rect x="3" y="5" width="1" height="1" fill="currentColor" />
      <rect x="5" y="5" width="1" height="1" fill="currentColor" />
      <rect x="0" y="6" width="1" height="1" fill="currentColor" />
      <rect x="3" y="6" width="1" height="1" fill="currentColor" />
      <rect x="6" y="6" width="1" height="1" fill="currentColor" />
    </svg>
  )
}

export default function CertificationsSection({ t }) {
  const items = t('certifications.items') || []

  return (
    <div className="section-content">
      <div className="section-head">
        <span className="section-kicker">[ 05 ]</span>
        <h2 className="section-title">{t('certifications.title')}</h2>
        <p className="section-lead">{t('certifications.lead')}</p>
      </div>

      <div className="cert-grid">
        {items.map((item) => (
          <article className="panel cert-card" key={`${item.name}-${item.year}`}>
            <span className="cert-badge">
              <IconSparkle />
            </span>
            <div className="cert-body">
              <h3 className="cert-name">
                {item.name} — {item.issuer}
              </h3>
              <p className="cert-issuer">
                <span className="cert-dot" aria-hidden="true" />
                {item.year}
              </p>
              {item.credentialId && (
                <p className="cert-id">
                  {t('certifications.credentialLabel')}: {item.credentialId}
                </p>
              )}
              {(item.link || item.certificateLink) && (
                <div className="cert-links">
                  {item.link && (
                    <a className="cert-link" href={item.link} target="_blank" rel="noreferrer">
                      ↗ {t('certifications.verifyLabel')}
                    </a>
                  )}
                  {item.certificateLink && (
                    <a
                      className="cert-link"
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
    </div>
  )
}
