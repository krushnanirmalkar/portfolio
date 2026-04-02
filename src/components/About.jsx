import { useEffect, useState } from 'react'
import { RetroGrid } from './RetroGrid'

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
    <section className="s relative overflow-hidden" id="about">
      <RetroGrid />
      <div className="wrap relative z-10">
        <div className={`s-label rev ${isVisible ? 'in' : ''} d1`}>
          ABOUT | KNOW ME
        </div>

        <div style={{ marginTop: '50px', marginBottom: '60px' }}>
          <h2 className={`s-h rev ${isVisible ? 'in' : ''} d2`}>
            Who I Am
          </h2>
          <p className={`section-desc rev ${isVisible ? 'in' : ''} d3`}>
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
        </div>
      </div>
    </section>
  )
}
