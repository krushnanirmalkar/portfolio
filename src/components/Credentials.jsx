import { useEffect, useState } from 'react'

const CERTIFICATES = [
  { title: 'Data Analytics using Python', org: 'IIT Roorkee' },
  { title: 'Data Science using Python', org: 'IIT Madras' },
  { title: 'Introduction to Large Language Models', org: 'IBM SkillsBuild (2025)' },
  { title: 'AWS Educate Introduction to Generative AI', org: 'AWS' },
  { title: 'Deloitte Australia - Data Analytics Job Simulation', org: 'Deloitte' },
  { title: 'Tata - GenAI Powered Data Analytics Job Simulation', org: 'Tata' }
]

const ACHIEVEMENTS = [
  { year: '2026', title: 'Academic Excellence Scholarship', org: 'DY Patil International University' },
  { year: '2025', title: 'Emerging Talent Scholarship', org: 'DY Patil International University' }
]

export default function Credentials() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1 })

    const element = document.querySelector('#credentials')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="s" id="credentials">
      <div className="wrap">
        <div className={`s-label rev ${isVisible ? 'in' : ''} d1`}>
          CREDENTIALS | ACHIEVEMENTS
        </div>

        <div style={{ marginTop: '50px', marginBottom: '60px' }}>
          <h2 className={`s-h rev ${isVisible ? 'in' : ''} d2`}>
            Certificates and Achievements
          </h2>
          <p className={`section-desc rev ${isVisible ? 'in' : ''} d3`} style={{
            fontFamily: 'var(--mono)',
            fontSize: '14px',
            letterSpacing: '.05em',
            color: 'var(--faint)',
            marginTop: '20px',
            lineHeight: '1.6'
          }}>
            Recognition of professional growth through certifications from leading institutions and scholarship awards for academic excellence.
          </p>
        </div>

        {/* Certificates */}
        <div style={{ marginTop: '60px' }}>
          <h3 style={{
            fontFamily: 'var(--serif)',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '28px',
            color: 'var(--white)'
          }}>Certificates</h3>

          <div className="certs-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'var(--line-m)',
            border: '1px solid var(--line-m)'
          }}>
            {CERTIFICATES.map((cert, idx) => (
              <div 
                key={idx}
                className={`cert-cell rev ${isVisible ? 'in' : ''}`}
                style={{
                  background: 'var(--black)',
                  padding: '26px 30px',
                  display: 'flex',
                  gap: '18px',
                  alignItems: 'flex-start',
                  transition: 'background .2s, opacity .85s var(--ease), transform .85s var(--ease)',
                  transitionDelay: `${(idx + 1) * 0.06}s`
                }}
              >
                <div className="cert-i" style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '9px',
                  color: 'var(--faint)',
                  letterSpacing: '.1em',
                  minWidth: '22px',
                  paddingTop: '3px'
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="cert-t" style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.35',
                    marginBottom: '4px',
                    color: 'var(--white)'
                  }}>
                    {cert.title}
                  </div>
                  <div className="cert-o" style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '9px',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--faint)'
                  }}>
                    {cert.org}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div style={{ marginTop: '60px' }}>
          <h3 style={{
            fontFamily: 'var(--serif)',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '28px',
            color: 'var(--white)'
          }}>Achievements</h3>

          <div className="ach-list" style={{ marginTop: '28px' }}>
            {ACHIEVEMENTS.map((ach, idx) => (
              <div 
                key={idx}
                className={`ach-row rev ${isVisible ? 'in' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '32px',
                  padding: '30px 0',
                  borderTop: '1px solid var(--line)',
                  borderBottom: idx === ACHIEVEMENTS.length - 1 ? '1px solid var(--line)' : 'none',
                  transition: 'opacity .85s var(--ease), transform .85s var(--ease)',
                  transitionDelay: `${(idx + 1) * 0.1}s`
                }}
              >
                <div className="ach-yr" style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  color: 'var(--faint)',
                  letterSpacing: '.1em',
                  minWidth: '38px'
                }}>
                  {ach.year}
                </div>
                <div className="ach-name" style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '22px',
                  fontWeight: '700',
                  color: 'var(--white)'
                }}>
                  {ach.title}
                </div>
                <div className="ach-org" style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '9px',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--faint)',
                  marginLeft: 'auto',
                  textAlign: 'right'
                }}>
                  {ach.org}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
