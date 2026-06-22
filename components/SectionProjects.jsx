export default function ProjectsSection({ t }) {
  const items = t('projects.items') || []

  return (
    <div className="section-content">
      <div className="section-head">
        <span className="section-kicker">[ 03 ]</span>
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-lead">{t('projects.lead')}</p>
      </div>

      <div className="projects-grid">
        {items.map((project) => (
          <article className="panel project-card" key={project.name}>
            <div className="project-head">
              <h3 className="project-name">{project.name}</h3>
              <span className="project-year">{project.year}</span>
            </div>
            <p className="project-desc">{project.desc}</p>

            <div className="project-stack">
              {project.stack.map((tech) => (
                <span className="stack-chip" key={tech}>{tech}</span>
              ))}
            </div>

            <div className="project-links">
              {project.code && (
                <a
                  className="project-link project-link--code"
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                >
                  {'</> '}{t('projects.codeLabel')}
                </a>
              )}
              {project.demo && (
                <a
                  className="project-link"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ {t('projects.demoLabel')}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
