import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'

// Initialize EmailJS (Public Key - safe to expose)
emailjs.init('4GjtKLpv53Cyz8EnT')

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1 })

    const element = document.querySelector('#contact')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'krushnanirmalkar@gmail.com'
      }

      // Send auto-reply to form filler
      await emailjs.send(
        'service_4unpg3p',
        'template_3f7ycff',
        emailData
      )

      // Send notification to you
      await emailjs.send(
        'service_4unpg3p',
        'template_jn2zigd',
        emailData
      )
      
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      const errorMsg = err.text || err.message || 'Failed to send message. Please try again.'
      setError(`Error: ${errorMsg}`)
      console.error('Email error:', err)
      console.error('Service:', 'service_4unpg3p')
      console.error('Template:', 'template_3f7ycff')
      console.error('Params:', { from_name: formData.name, from_email: formData.email, message: formData.message })
    } finally {
      setIsLoading(false)
    }
  }

  const actionLinks = [
    {
      label: 'Call',
      href: 'tel:88306321330',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7.2 10.4c1.6 3.2 3.9 5.5 7.1 7.1l2.4-2.4c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.1 22 2 13.9 2 4c0-.6.4-1 1-1h4.6c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.3 2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      label: 'GitHub',
      href: 'https://github.com/krushnanirmalkar',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2C6.48 2 2 6.7 2 12.5c0 4.63 2.87 8.56 6.84 9.95.5.1.68-.23.68-.5v-1.78c-2.78.62-3.37-1.4-3.37-1.4-.45-1.2-1.1-1.52-1.1-1.52-.9-.65.07-.64.07-.64 1 .08 1.53 1.1 1.53 1.1.9 1.6 2.36 1.14 2.94.87.1-.68.35-1.14.63-1.4-2.22-.26-4.56-1.17-4.56-5.22 0-1.15.38-2.1 1-2.84-.1-.26-.43-1.32.1-2.75 0 0 .82-.27 2.7 1.08a9 9 0 0 1 2.46-.35c.84 0 1.7.12 2.46.35 1.88-1.35 2.7-1.08 2.7-1.08.53 1.43.2 2.5.1 2.75.62.74 1 1.69 1 2.84 0 4.06-2.34 4.96-4.57 5.22.36.33.68.98.68 1.98v2.93c0 .27.18.6.69.5A10.4 10.4 0 0 0 22 12.5C22 6.7 17.52 2 12 2Z"
            fill="currentColor"
          />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/krushna-nirmalkar-b3a281327/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6.5 9.5H3.7V20.3h2.8V9.5Z" fill="currentColor" />
          <path
            d="M5.1 3.7c-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6 0-.9-.7-1.6-1.6-1.6Z"
            fill="currentColor"
          />
          <path
            d="M20.3 20.3h-2.8v-5.6c0-1.3 0-3-1.8-3s-2 1.4-2 2.9v5.7h-2.8V9.5h2.7v1.5h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.9v6.1Z"
            fill="currentColor"
          />
        </svg>
      )
    }
  ]

  return (
    <section className="s" id="contact">
      <div className="wrap">
        <div className={`s-label rev ${isVisible ? 'in' : ''} d1`}>
          CONTACT | REACH OUT
        </div>

        <div style={{ marginTop: '50px', marginBottom: '60px' }}>
          <h2 className={`s-h rev ${isVisible ? 'in' : ''} d2`}>
            Get In Touch
          </h2>
          <p className={`section-desc rev ${isVisible ? 'in' : ''} d3`} style={{
            fontFamily: 'var(--mono)',
            fontSize: '14px',
            letterSpacing: '.05em',
            color: 'var(--faint)',
            marginTop: '20px',
            lineHeight: '1.6'
          }}>
            Ready to collaborate on exciting projects or just want to say hello? Reach out through any of the channels below.
          </p>
        </div>

        <div className="contact-cols">
          {/* Form (shows first on mobile) */}
          <div className={`contact-form-wrap rev ${isVisible ? 'in' : ''} d4`}>
            <form onSubmit={handleSubmit} className="cform">
              <div className="cf-row">
                <label className="cf-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="cf-inp"
                  placeholder="Your name"
                />
              </div>

              <div className="cf-row">
                <label className="cf-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="cf-inp"
                  placeholder="your@email.com"
                />
              </div>

              <div className="cf-row cf-row-last">
                <label className="cf-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="cf-inp cf-textarea"
                  rows="7"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="cf-btn"
                style={{
                  marginTop: '28px',
                  background: submitted ? 'var(--faint)' : isLoading ? 'rgba(240, 237, 232, 0.5)' : error ? '#dc3545' : 'var(--white)',
                  color: submitted ? 'var(--white)' : isLoading ? 'var(--white)' : error ? '#ffffff' : 'var(--black)',
                  border: 'none',
                  padding: '16px 40px',
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  width: '100%',
                  transition: 'background .2s, color .2s',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {submitted ? '✓ Message Sent!' : isLoading ? 'Sending...' : error ? '✗ Failed' : 'Send Message'}
              </button>

              {error && (
                <div style={{
                  marginTop: '12px',
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  color: '#ff6b6b',
                  letterSpacing: '.05em'
                }}>
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Details + actions */}
          <div className="contact-left">
            <div className={`rev ${isVisible ? 'in' : ''} d2`}>
              <p className="contact-quote">
                Let's collaborate and create something extraordinary together.
              </p>
            </div>

            <div className={`contact-actions rev ${isVisible ? 'in' : ''} d3`}>
              {actionLinks.map((link) => {
                const isExternal = /^https?:\/\//.test(link.href)

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="contact-action"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    title={link.label}
                  >
                    <span className="contact-action-ico">{link.icon}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
