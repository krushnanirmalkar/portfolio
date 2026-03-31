import { useEffect, useRef } from 'react'
import Intro from './components/Intro'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import './App.css'

function App() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px'
        cursorDotRef.current.style.top = e.clientY + 'px'
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + 'px'
        cursorRingRef.current.style.top = e.clientY + 'px'
      }
    }

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('pill')) {
        if (cursorRingRef.current) {
          cursorRingRef.current.classList.add('big')
        }
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('pill')) {
        if (cursorRingRef.current) {
          cursorRingRef.current.classList.remove('big')
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <div className="App">
      <div className="c-dot" ref={cursorDotRef}></div>
      <div className="c-ring" ref={cursorRingRef}></div>
      
      <Intro />
      <Navigation />
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <Credentials />
      <Contact />
      
      <footer style={{
        padding: '36px 52px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--mono)',
        fontSize: '9px',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--faint)',
        borderTop: '1px solid var(--line)'
      }}>
        <span>© 2024 Krushna Nirmalkar</span>
        <span>Full Stack Developer | Pune</span>
      </footer>
    </div>
  )
}

export default App
