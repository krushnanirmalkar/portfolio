import { useEffect, useRef, useState } from 'react'
import Intro from './components/Intro'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import { AnimatedThemeToggler } from './components/ui/animated-theme-toggler'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark'
    setTheme(initialTheme)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

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

  useEffect(() => {
    const onContextMenu = (e) => {
      e.preventDefault()
    }

    const onKeyDown = (e) => {
      const target = e.target
      const isEditable =
        target &&
        (target.isContentEditable ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')

      if (isEditable) return

      const key = (e.key || '').toLowerCase()
      const isCtrlOrMeta = e.ctrlKey || e.metaKey

      const isDevtoolsCombo =
        e.key === 'F12' ||
        (isCtrlOrMeta && e.shiftKey && ['i', 'j', 'c', 'k'].includes(key)) ||
        (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key))

      const isViewSourceCombo = isCtrlOrMeta && ['u', 's'].includes(key)

      if (isDevtoolsCombo || isViewSourceCombo) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      document.removeEventListener('contextmenu', onContextMenu)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [])

  return (
    <div className="App">
      <div className="c-dot" ref={cursorDotRef}></div>
      <div className="c-ring" ref={cursorRingRef}></div>
      
      <Intro />
      <Navigation
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      <AnimatedThemeToggler
        theme={theme}
        onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        className="pill theme-fab app-theme-fab"
      />
      <Hero theme={theme} />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <Credentials />
      <Contact />
      
      <footer style={{
        padding: 'clamp(24px 20px, 36px 52px)',
        display: 'flex',
        flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: window.innerWidth <= 480 ? 'center' : 'center',
        gap: window.innerWidth <= 480 ? '12px' : '0',
        fontFamily: 'var(--mono)',
        fontSize: 'clamp(8px, 1vw, 9px)',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--faint)',
        borderTop: '1px solid var(--line)',
        textAlign: window.innerWidth <= 480 ? 'center' : 'left'
      }}>
        <span>© 2024 Krushna Nirmalkar</span>
        <span>CSE Student | Cloud Enthusiast | Pune</span>
      </footer>
    </div>
  )
}

export default App
