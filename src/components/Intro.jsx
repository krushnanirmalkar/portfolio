import { useEffect, useState } from 'react'
import './Intro.css'

const GREETINGS = [
  { text: 'Hello', lang: 'English' },
  { text: 'Namaste', lang: 'Hindi' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Konnichiwa', lang: 'Japanese' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Guten Tag', lang: 'German' },
  { text: 'Olá', lang: 'Portuguese' }
]

export default function Intro() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [done, setDone] = useState(false)

  // Requirements:
  // - Preloader should run for 5 seconds total
  // - All greetings should complete within those same 5 seconds
  const TOTAL_TIME_MS = 5000
  const MIN_CHAR_DELAY_MS = 15
  const MAX_CHAR_DELAY_MS = 80
  const MIN_HOLD_MS = 120

  useEffect(() => {
    let cancelled = false
    const timeouts = []
    const intervals = []

    const safe = (fn) => {
      if (!cancelled) fn()
    }

    const clearAll = () => {
      for (const id of timeouts) clearTimeout(id)
      for (const id of intervals) clearInterval(id)
    }

    const slotMs = TOTAL_TIME_MS / GREETINGS.length

    const startGreeting = (idx) => {
      const greeting = GREETINGS[idx]?.text ?? ''
      const greetingLength = Math.max(1, greeting.length)

      // Type within the slot, leaving a small hold period at the end.
      const typingMs = Math.max(200, slotMs - MIN_HOLD_MS)
      const charDelay = Math.min(
        MAX_CHAR_DELAY_MS,
        Math.max(MIN_CHAR_DELAY_MS, typingMs / greetingLength)
      )

      safe(() => {
        setCurrentIdx(idx)
        setDisplayText('')
        setIsTyping(true)
      })

      let charIdx = 0
      const typingInterval = setInterval(() => {
        charIdx += 1
        if (charIdx <= greeting.length) {
          safe(() => setDisplayText(greeting.slice(0, charIdx)))
        }
        if (charIdx >= greeting.length) {
          clearInterval(typingInterval)
          safe(() => setIsTyping(false))
        }
      }, charDelay)
      intervals.push(typingInterval)

      const nextTimeout = setTimeout(() => {
        clearInterval(typingInterval)
        safe(() => {
          setDisplayText(greeting)
          setIsTyping(false)
        })

        if (idx < GREETINGS.length - 1) {
          startGreeting(idx + 1)
        } else {
          safe(() => setDone(true))
        }
      }, slotMs)
      timeouts.push(nextTimeout)
    }

    startGreeting(0)

    // Hard stop to guarantee the intro never exceeds 5 seconds.
    const hardDone = setTimeout(() => {
      safe(() => setDone(true))
    }, TOTAL_TIME_MS)
    timeouts.push(hardDone)

    return () => {
      cancelled = true
      clearAll()
    }
  }, [])

  if (done) return null

  return (
    <div className="intro-container">
      <div className="intro-content">
        <div className="greeting-text">
          <span className="greeting-word">{displayText}</span>
          <span className={`cursor ${isTyping ? 'active' : ''}`}>|</span>
        </div>
      </div>
    </div>
  )
}
