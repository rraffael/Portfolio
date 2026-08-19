import { IconGithub } from './SocialIcons'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function SectionProjectsPro({ t }) {
  const items = t('projects.items') || []

  return (
    <>
      <h2>{t('projects.title')}</h2>
      <p className="pro-placeholder-lead">{t('projects.lead')}</p>

      <div className="pro-projects-grid">
        {items.map((project) => (
          <article className="pro-panel pro-project-card" key={project.name}>
            {project.image && (
              <img
                className="pro-project-thumb"
                src={`${basePath}${project.image}`}
                alt=""
                loading="lazy"
              />
            )}
            <div className="pro-project-head">
              <h3>{project.name}</h3>
              <span className="pro-project-year">{project.year}</span>
            </div>
            <p className="pro-placeholder-lead pro-project-desc">{project.desc}</p>

            <div className="pro-project-stack">
              {project.stack.map((tech) => (
                <span className="pro-chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="pro-project-links">
              {project.code && (
                <a
                  className="pro-btn pro-btn--ghost pro-project-link"
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconGithub size={16} /> {t('projects.codeLabel')}
                </a>
              )}
              {project.demo && (
                <a
                  className="pro-btn pro-btn--ghost pro-project-link"
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
    </>
  )
}
