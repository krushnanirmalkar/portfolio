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

  const TOTAL_TIME = 7000 // 7 seconds
  const timePerGreeting = TOTAL_TIME / GREETINGS.length // ~875ms per greeting

  useEffect(() => {
    if (done) return

    const greeting = GREETINGS[currentIdx].text
    let charIdx = 0

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (charIdx < greeting.length) {
          setDisplayText(greeting.slice(0, charIdx + 1))
          charIdx++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 20)

      return () => clearInterval(typingInterval)
    } else {
      const nextTimeout = setTimeout(() => {
        if (currentIdx < GREETINGS.length - 1) {
          setCurrentIdx(currentIdx + 1)
          setDisplayText('')
          setIsTyping(true)
        } else {
          setDone(true)
        }
      }, timePerGreeting / 2)

      return () => clearTimeout(nextTimeout)
    }
  }, [isTyping, currentIdx, done, timePerGreeting])

  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (done) {
      setIsExiting(true)
    }
  }, [done])

  return (
    <div className={`intro-container ${isExiting ? 'exit' : ''}`}>
      <div className="intro-content">
        <div className="greeting-text">
          <span className="greeting-word">{displayText}</span>
          <span className={`cursor ${isTyping ? 'active' : ''}`}>|</span>
        </div>
      </div>
    </div>
  )
}
