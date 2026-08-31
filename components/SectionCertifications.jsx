const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// certificateLink points at a local file (e.g. "/certificate-psm1.pdf"), so it
// needs the base path prefix; link (verify) is always an external URL and is
// used as-is.
function resolveLink(href) {
  return href && href.startsWith('/') ? `${basePath}${href}` : href
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
            <span className="cert-badge" aria-hidden="true">
              🎖
            </span>
            <div className="cert-body">
              <h3 className="cert-name">
                {item.name} — {item.issuer}
              </h3>
              <p className="cert-issuer">{item.year}</p>
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
