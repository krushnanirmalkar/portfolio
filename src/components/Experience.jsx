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
    role: 'Full Stack Developer',
    org: 'DY Patil International University',
    period: '03/2026 – Present',
    location: 'Pune',
    description: 'Building internal tools and web applications for university initiatives and academic projects.',
    highlights: [
      'Developing responsive web applications',
      'Designing scalable backend systems',
      'Implementing modern frontend frameworks'
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
          <p className={`section-desc rev ${isVisible ? 'in' : ''} d3`}>
            From internships to leadership roles, building and shipping real-world solutions across cloud, web, and data science.
          </p>
        </div>

        <div className="exp-list" style={{ marginTop: '60px' }}>
          {EXPERIENCES.map((exp, idx) => (
            <div 
              key={idx}
              className={`exp-item rev ${isVisible ? 'in' : ''}`}
              style={{
                transitionDelay: `${(idx + 1) * 0.1}s`
              }}
            >
              <div className="exp-period">
                {exp.period}
              </div>

              <div className="exp-main">
                <div className="exp-head">
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-org">{exp.org}</div>
                </div>

                <div className="exp-body">
                  <div className="exp-note">{exp.description}</div>
                  <ul className="exp-pts">
                    {exp.highlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                </div>
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
