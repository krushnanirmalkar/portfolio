import { useEffect, useState } from 'react'

const EXPERIENCES = [
  {
    role: 'Vice President',
    org: 'AWS Cloud Club DYPIU',
    period: '03/2026 – Present',
    location: 'Pune',
    description: 'Leading team initiatives, organizing technical events, exploring cloud technologies, and promoting cloud computing awareness among students.',
    highlights: [
      'Lead cloud infrastructure workshops',
      'Organize AWS certification preparation sessions',
      'Mentor 50+ students in cloud technologies'
    ]
  },
  {
    role: 'Web Development Intern',
    org: 'Raja Bahadur International Limited (Poona Panjarpol Trust)',
    period: '05/2025 – 07/2025',
    location: 'Pune',
    description: 'Completed a Rural Internship at Poona Panjarpol Trust, Pune. Worked in a team of three to design and deploy a website to help the organization establish a digital presence.',
    highlights: [
      'Developed and deployed poonapanjarpoltrust.org',
      'Collaborated with team to design structure and content',
      'Gathered requirements from stakeholders',
      'Used AI-assisted IDE tools for rapid development'
    ]
  },
  {
    role: 'Full Stack Developer',
    org: 'DY Patil International University',
    period: '2024 – Present',
    location: 'Pune',
    description: 'Building internal tools and web applications for university initiatives and academic projects.',
    highlights: [
      'Developed responsive web applications',
      'Designed scalable backend systems',
      'Implemented modern frontend frameworks'
    ]
  }
]

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1 })

    const element = document.querySelector('#experience')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="s" id="experience">
      <div className="wrap">
        <div className={`s-label rev ${isVisible ? 'in' : ''} d1`}>
          EXPERIENCE | MY JOURNEY
        </div>

        <div style={{ marginTop: '50px', marginBottom: '60px' }}>
          <h2 className={`s-h rev ${isVisible ? 'in' : ''} d2`}>
            Professional Experience
          </h2>
          <p className={`section-desc rev ${isVisible ? 'in' : ''} d3`} style={{
            fontFamily: 'var(--mono)',
            fontSize: '14px',
            letterSpacing: '.05em',
            color: 'var(--faint)',
            marginTop: '20px',
            lineHeight: '1.6'
          }}>
            From internships to leadership roles, building and shipping real-world solutions across cloud, web, and data science.
          </p>
        </div>

        <div className="exp-list" style={{ marginTop: '60px' }}>
          {EXPERIENCES.map((exp, idx) => (
            <div 
              key={idx}
              className={`rev ${isVisible ? 'in' : ''}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 160px',
                gap: '40px',
                padding: '44px 0',
                borderTop: '1px solid var(--line)',
                alignItems: 'start',
                transition: 'background .2s',
                transitionDelay: `${(idx + 1) * 0.1}s`
              }}
            >
              <div className="exp-period">
                {exp.period}
              </div>

              <div>
                <div className="exp-role">{exp.role}</div>
                <div className="exp-org">{exp.org}</div>
                <div className="exp-note">{exp.description}</div>
                <ul className="exp-pts">
                  {exp.highlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </div>

              <div className="exp-loc">
                {exp.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
