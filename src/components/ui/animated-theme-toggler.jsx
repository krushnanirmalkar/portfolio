import './animated-theme-toggler.css'
import { flushSync } from 'react-dom'

function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  )
}

/**
 * AnimatedThemeToggler
 * - Visual behavior: animated sun/moon swap (MagicUI-style)
 * - Logic: delegates theme switching to the existing app handler
 */
export function AnimatedThemeToggler({ theme = 'dark', onToggle, className = '' }) {
  const isDark = theme === 'dark'
  const duration = 400

  const handleToggle = (e) => {
    const button = e.currentTarget
    if (!button) {
      onToggle?.()
      return
    }

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      const nextTheme = isDark ? 'light' : 'dark'
      document.documentElement.dataset.theme = nextTheme
      localStorage.setItem('theme', nextTheme)
      onToggle?.()
    }

    if (typeof document.startViewTransition !== 'function') {
      applyTheme()
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    transition?.ready?.then?.(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return (
    <button
      type="button"
      className={`animated-theme-toggler ${className}`.trim()}
      onClick={handleToggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <span className="att-icons" aria-hidden="true">
        <span className={`att-icon att-sun ${isDark ? 'att-show' : ''}`.trim()}>
          <SunIcon />
        </span>
        <span className={`att-icon att-moon ${!isDark ? 'att-show' : ''}`.trim()}>
          <MoonIcon />
        </span>
      </span>
    </button>
  )
}
