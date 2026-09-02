export default function WorkSection({ t }) {
  const items = t('work.items') || []

  return (
    <div className="section-content">
      <div className="section-head">
        <span className="section-kicker">[ 03 ]</span>
        <h2 className="section-title">{t('work.title')}</h2>
        <p className="section-lead">{t('work.lead')}</p>
      </div>

      <div className="work-list">
        {items.map((job, index) => (
          <div className="work-item" key={`${job.company}-${job.period}`}>
            <div className="work-rail">
              <span className="work-marker" />
              {index < items.length - 1 && <span className="work-line" />}
            </div>
            <div className="panel">
              <div className="work-head">
                <h3 className="work-role">{job.role}</h3>
                <span className="work-company">@ {job.company}</span>
              </div>
              <div className="work-meta">
                {job.period} · {job.location}
              </div>
              <p className="work-desc">{job.desc}</p>

              {job.stack?.length > 0 && (
                <div className="work-stack">
                  {job.stack.map((tech) => (
                    <span className="stack-chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {job.links?.length > 0 && (
                <div className="work-links">
                  {job.links.map((link) => (
                    <a
                      className="work-link"
                      href={link.url}
                      key={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ↗ {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
