import { useEffect, useState } from 'react'

const PROJECTS = [
  {
    num: '01',
    name: 'Poona Panjarpol Trust Website',
    description: 'Developed and deployed a website for Poona Panjarpol Trust to establish its digital presence and improve outreach. Collaborated in a team to design structure and content, implemented key features, and gathered requirements from stakeholders.',
    link: 'https://poonapanjarpoltrust.org',
    kind: 'Web Design'
  },
  {
    num: '02',
    name: 'SysAutopsy: A Digital BlackBox',
    description: 'Developed a system that acts as a digital black box for software systems, enabling automated root-cause analysis of failures. Designed a pipeline to process raw logs into structured events, reconstruct failure timelines, and rank root causes.',
    link: 'https://sysautopsy.onrender.com/',
    kind: 'Full Stack'
  },
  {
    num: '03',
    name: 'Nirgun Washers Website',
    description: 'Built a web platform for a Pune-based laundry startup offering doorstep laundry and dry-cleaning services. Implemented a responsive UI to improve customer interaction and service visibility, contributing to digitizing a local business.',
    link: 'https://nirgunwashers.in',
    kind: 'Web Design'
  },
  {
    num: '04',
    name: 'Dnyanavishkar Foundation Website',
    description: 'Designed and developed a responsive website for an educational foundation focused on science outreach and community education initiatives.',
    link: '#',
    kind: 'Web Design'
  }
]

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1 })

    const element = document.querySelector('#projects')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="s" id="projects">
      <div className="wrap">
        <div className={`s-label rev ${isVisible ? 'in' : ''} d1`}>
          PROJECTS | MY WORK
        </div>

        <div style={{ marginTop: '50px', marginBottom: '60px' }}>
          <h2 className={`s-h rev ${isVisible ? 'in' : ''} d2`}>
            Featured Projects
          </h2>
          <p className={`section-desc rev ${isVisible ? 'in' : ''} d3`}>
            Showcasing web applications, digital platforms, and full-stack solutions that solve real problems for organizations and communities.
          </p>
        </div>

        <div className="proj-wrap" style={{ marginTop: '60px' }}>
          {PROJECTS.map((proj, idx) => (
            <div 
              key={idx}
              className={`proj-cell rev ${isVisible ? 'in' : ''}`}
              style={{
                padding: '40px',
                borderBottom: '1px solid var(--line)',
                cursor: 'none',
                transition: 'background .25s',
                transitionDelay: `${(idx + 1) * 0.08}s`
              }}
            >
              <div className="proj-num">{proj.num}</div>
              <div className="proj-name">{proj.name}</div>
              <div className="proj-desc">{proj.description}</div>
              <div className="proj-foot" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <a 
                  href={proj.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="proj-link"
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '10px',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--white)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '9px',
                    transition: 'gap .2s'
                  }}
                >
                  View Project →
                </a>
                <div className="proj-kind" style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '9px',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--faint)'
                }}>
                  {proj.kind}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
