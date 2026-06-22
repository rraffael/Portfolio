export default function SkillsSection({ t }) {
  const groups = t('skills.groups') || []

  return (
    <div className="section-content">
      <div className="section-head">
        <span className="section-kicker">[ 02 ]</span>
        <h2 className="section-title">{t('skills.title')}</h2>
        <p className="section-lead">{t('skills.lead')}</p>
      </div>

      <div className="skills-grid">
        {groups.map((group) => (
          <div className="panel skill-group" key={group.title}>
            <h3 className="skill-group-title">{group.title}</h3>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span className="skill-tag" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
