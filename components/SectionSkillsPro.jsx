export default function SectionSkillsPro({ t }) {
  const groups = t('skills.groups') || []

  return (
    <>
      <h2>{t('skills.title')}</h2>
      <p className="pro-placeholder-lead">{t('skills.lead')}</p>

      <div className="pro-skills-grid">
        {groups.map((group) => (
          <div className="pro-panel" key={group.title}>
            <h3 className="pro-about-block-title">{group.title}</h3>
            <div className="pro-skills-tags">
              {group.items.map((item) => (
                <span className="pro-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
            {group.note && <p className="pro-skills-note">{group.note}</p>}
          </div>
        ))}
      </div>
    </>
  )
}
