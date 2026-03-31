import { useEffect, useState } from 'react'
import PillNav from './PillNav'

export default function Navigation() {
  const [activeHref, setActiveHref] = useState('#about')
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'STACK', href: '#stack' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CREDENTIALS', href: '#credentials' },
    { label: 'CONTACT', href: '#contact' }
  ]

  return (
    <nav className={isStuck ? 'stuck' : ''}>
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
      
      <div className="nav-status">
        <span className="s-dot"></span>
        <span>Available • Pune</span>
      </div>
    </nav>
  )
}
