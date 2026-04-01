import { useEffect, useState, useRef } from 'react'
import PillNav from './PillNav'

export default function Navigation() {
  const [activeHref, setActiveHref] = useState('#about')
  const [isStuck, setIsStuck] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const nav = document.querySelector('nav')
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsStuck(true)
        nav?.classList.add('stuck')
      } else {
        setIsStuck(false)
        nav?.classList.remove('stuck')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Close menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'STACK', href: '#stack' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CREDENTIALS', href: '#credentials' },
    { label: 'CONTACT', href: '#contact' }
  ]

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={isStuck ? 'stuck' : ''} ref={navRef}>
      <div className="nav-desktop">
        <PillNav 
          items={navItems}
          activeHref={activeHref}
          baseColor="#0c0c0c"
          pillColor="#f0ede8"
          hoveredPillTextColor="#0c0c0c"
          pillTextColor="#0c0c0c"
          ease="power3.easeOut"
          initialLoadAnimation={true}
        />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="nav-mobile">
        <div className="nav-brand">KN</div>
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu active">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              className="mobile-menu-item"
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
      
      <div className="nav-status">
        <span className="s-dot"></span>
        <span>Available • Pune</span>
      </div>
    </nav>
  )
}
