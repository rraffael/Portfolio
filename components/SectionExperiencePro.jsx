export default function SectionExperiencePro({ t }) {
  const items = t('work.items') || []

  return (
    <>
      <h2>{t('work.title')}</h2>
      <p className="pro-placeholder-lead">{t('work.lead')}</p>

      <div className="pro-timeline">
        {items.map((job, index) => (
          <div className="pro-timeline-item" key={`${job.company}-${job.period}`}>
            <div className="pro-timeline-rail">
              <span className="pro-timeline-marker" />
              {index < items.length - 1 && <span className="pro-timeline-line" />}
            </div>
            <div className="pro-panel">
              <div className="pro-timeline-head">
                <h3>{job.role}</h3>
                <span className="pro-timeline-company">{job.company}</span>
              </div>
              <div className="pro-timeline-meta">
                {job.period} · {job.location}
              </div>
              <p className="pro-placeholder-lead">{job.desc}</p>

              {job.links?.length > 0 && (
                <div className="pro-timeline-links">
                  {job.links.map((link) => (
                    <a
                      className="pro-btn pro-btn--ghost pro-timeline-link"
                      href={link.url}
                      key={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
