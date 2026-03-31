import { useEffect, useState } from 'react'
import './Stack.css'

const TECH_ITEMS = [
  { name: 'Python', logo: 'python', color: 'black' },
  { name: 'JavaScript', logo: 'javascript', color: 'white' },
  { name: 'Java', logo: 'java', color: 'black' },
  { name: 'SQL', logo: 'database', color: 'white' },
  { name: 'HTML5', logo: 'html5', color: 'black' },
  { name: 'CSS3', logo: 'css3', color: 'white' },
  { name: 'Pandas', logo: 'pandas', color: 'black' },
  { name: 'NumPy', logo: 'numpy', color: 'white' },
  { name: 'Matplotlib', logo: 'matplotlib', color: 'black' },
  { name: 'Flask', logo: 'flask', color: 'white' },
  { name: 'Django', logo: 'django', color: 'black' },
  { name: 'Git', logo: 'git', color: 'white' },
  { name: 'GitHub', logo: 'github', color: 'black' },
  { name: 'Linux', logo: 'linux', color: 'white' },
  { name: 'VS Code', logo: 'vscode', color: 'black' },
  { name: 'Vercel', logo: 'vercel', color: 'white' },
  { name: 'Render', logo: 'render', color: 'black' }
]

const LOGO_SVGS = {
  python: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="py1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#3776ab;stop-opacity:1" /><stop offset="100%" style="stop-color:#ffd43b;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="40" fill="url(#py1)"/><text x="50" y="60" font-size="50" font-weight="bold" text-anchor="middle" fill="white">Py</text></svg>',
  javascript: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f7df1e"/><text x="50" y="65" font-size="50" font-weight="bold" text-anchor="middle" fill="black">JS</text></svg>',
  java: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#007396"/><text x="50" y="65" font-size="40" font-weight="bold" text-anchor="middle" fill="white">J</text></svg>',
  database: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="15" width="60" height="20" rx="10" fill="#336791"/><rect x="20" y="35" width="60" height="35" fill="#336791"/><ellipse cx="50" cy="15" rx="30" ry="10" fill="#4a9fd8"/><text x="50" y="60" font-size="20" font-weight="bold" text-anchor="middle" fill="white">SQL</text></svg>',
  html5: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 20 20 L 50 80 L 80 20 Z" fill="#e34c26"/><text x="50" y="50" font-size="20" font-weight="bold" text-anchor="middle" fill="white">HTML</text></svg>',
  css3: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 20 20 L 50 80 L 80 20 Z" fill="#1572b6"/><text x="50" y="50" font-size="18" font-weight="bold" text-anchor="middle" fill="white">CSS</text></svg>',
  pandas: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#150458"/><text x="50" y="65" font-size="45" font-weight="bold" text-anchor="middle" fill="white">Pd</text></svg>',
  numpy: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#013243"/><text x="50" y="65" font-size="40" font-weight="bold" text-anchor="middle" fill="#4BACC6">Np</text></svg>',
  matplotlib: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#ffffff" stroke="#000" stroke-width="2"/><polyline points="20,70 35,40 50,55 65,30 80,25" fill="none" stroke="#000" stroke-width="2"/><circle cx="35" cy="40" r="3" fill="#000"/><circle cx="80" cy="25" r="3" fill="#000"/></svg>',
  flask: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 35 15 L 65 15 L 60 45 Q 50 70 50 80 Q 50 70 40 45 Z" fill="#000"/><circle cx="50" cy="75" r="6" fill="#fff"/></svg>',
  django: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#092e20"/><text x="50" y="65" font-size="35" font-weight="bold" text-anchor="middle" fill="white">Dj</text></svg>',
  git: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#f34f29"/><text x="50" y="65" font-size="50" font-weight="bold" text-anchor="middle" fill="white">G</text></svg>',
  github: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#000"/><text x="50" y="65" font-size="50" font-weight="bold" text-anchor="middle" fill="white">⚙</text></svg>',
  linux: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#fcc624"/><text x="50" y="65" font-size="45" font-weight="bold" text-anchor="middle" fill="black">🐧</text></svg>',
  vscode: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#0078d4"/><text x="50" y="65" font-size="40" font-weight="bold" text-anchor="middle" fill="white">VS</text></svg>',
  vercel: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 90,90 10,90" fill="#000"/><text x="50" y="70" font-size="30" font-weight="bold" text-anchor="middle" fill="white">V</text></svg>',
  render: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#46E3B7"/><text x="50" y="65" font-size="35" font-weight="bold" text-anchor="middle" fill="black">R</text></svg>'
}

export default function Stack() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1 })

    const element = document.querySelector('#stack')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="s" id="stack">
      <div className="wrap">
        <div className={`stack-header ${isVisible ? 'visible' : ''}`}>
          <div className="stack-label">TOOLING | BUILD WITH</div>
          <h2 className={`stack-title rev ${isVisible ? 'in' : ''} d1`}>
            My Technical Stack
          </h2>
          <p className={`stack-desc rev ${isVisible ? 'in' : ''} d2`}>
            The tools I use across frontend, backend, cloud, and AI workflows to build polished, scalable products people actually enjoy using.
          </p>
        </div>

        <div className={`tech-pills-wrap rev ${isVisible ? 'in' : ''} d3`}>
          {TECH_ITEMS.map((tech, idx) => (
            <div
              key={tech.name}
              className={`tech-pill tech-pill-${tech.color}`}
              style={{ '--delay': `${idx * 0.03}s` }}
            >
              <span 
                className="pill-icon" 
                dangerouslySetInnerHTML={{ __html: LOGO_SVGS[tech.logo] }}
              ></span>
              <span className="pill-text">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
