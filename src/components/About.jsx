import { useEffect, useState } from 'react'
import PixelCard from './PixelCard'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1 })

    const element = document.querySelector('#about')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="s" id="about">
      <div className="wrap">
        <div className={`s-label rev ${isVisible ? 'in' : ''} d1`}>
          ABOUT | KNOW ME
        </div>

        <div style={{ marginTop: '50px', marginBottom: '60px' }}>
          <h2 className={`s-h rev ${isVisible ? 'in' : ''} d2`}>
            Who I Am
          </h2>
          <p className={`section-desc rev ${isVisible ? 'in' : ''} d3`} style={{
            fontFamily: 'var(--mono)',
            fontSize: '14px',
            letterSpacing: '.05em',
            color: 'var(--faint)',
            marginTop: '20px',
            lineHeight: '1.6'
          }}>
            A full-stack developer passionate about building meaningful digital experiences through innovation and clean code.
          </p>
        </div>

        <div className="about-cols">
          <div className={`about-text rev ${isVisible ? 'in' : ''} d2`}>
            <p>
              I'm a <strong>Full Stack Developer</strong> passionate about building meaningful digital experiences through code and design. With expertise across frontend, backend, and cloud technologies, I create scalable solutions that solve real problems.
            </p>
            <p>
              Currently leading initiatives as <strong>Vice President</strong> of AWS Cloud Club at DY Patil International University, while exploring AI-assisted development and modern cloud architectures.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open-source projects, and mentoring fellow developers.
            </p>
          </div>

          <div className={`rev ${isVisible ? 'in' : ''} d3`}>
            <PixelCard variant="pink">
              <img 
                src="/media/profile.jpeg" 
                alt="Krushna Nirmalkar" 
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  position: 'absolute',
                  inset: 0
                }} 
              />
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  )
}
