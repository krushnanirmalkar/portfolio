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

  const contactLinks = [
    { label: 'Email', value: 'krushnanirmalkar@gmail.com', href: 'mailto:krushnanirmalkar@gmail.com' },
    { label: 'GitHub', value: 'github.com/krushnanirmalkar', href: 'https://github.com/krushnanirmalkar' },
    { label: 'LinkedIn', value: 'krushna-nirmalkar', href: 'https://www.linkedin.com/in/krushna-nirmalkar-b3a281327/' },
    { label: 'Phone', value: '88306321330', href: 'tel:+918830632130' }
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

        <div className="contact-cols" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          marginTop: '60px',
          alignItems: 'start'
        }}>
          {/* Left: Message & Links */}
          <div>
            <div className={`rev ${isVisible ? 'in' : ''} d2`}>
              <p className="contact-quote" style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontStyle: 'italic',
                fontWeight: '400',
                lineHeight: '1.4',
                color: 'rgba(240, 237, 232, .65)',
                marginTop: '0'
              }}>
                Let's collaborate and create something extraordinary together.
              </p>
            </div>

            <div className={`clinks rev ${isVisible ? 'in' : ''} d3`} style={{ marginTop: '44px' }}>
              {contactLinks.map((link, idx) => (
                <div 
                  key={idx}
                  className="cl-row"
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    padding: '17px 0',
                    borderTop: '1px solid var(--line)',
                    borderBottom: idx === contactLinks.length - 1 ? '1px solid var(--line)' : 'none'
                  }}
                >
                  <div className="cl-k" style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '9px',
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: 'var(--faint)'
                  }}>
                    {link.label}
                  </div>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cl-v"
                    style={{
                      fontSize: '13px',
                      color: 'var(--white)',
                      textDecoration: 'none',
                      transition: 'color .2s'
                    }}
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className={`rev ${isVisible ? 'in' : ''} d4`}>
            <form onSubmit={handleSubmit} className="cform" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="cf-row" style={{ borderTop: '1px solid var(--line)' }}>
                <label className="cf-label" style={{
                  display: 'block',
                  fontFamily: 'var(--mono)',
                  fontSize: '9px',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--faint)',
                  padding: '18px 0 5px'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="cf-inp"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--white)',
                    fontFamily: 'var(--sans)',
                    fontSize: '14px',
                    fontWeight: '300',
                    paddingBottom: '16px',
                    resize: 'none',
                    lineHeight: '1.6',
                    caretColor: 'var(--white)'
                  }}
                />
              </div>

              <div className="cf-row" style={{ borderTop: '1px solid var(--line)' }}>
                <label className="cf-label" style={{
                  display: 'block',
                  fontFamily: 'var(--mono)',
                  fontSize: '9px',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--faint)',
                  padding: '18px 0 5px'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="cf-inp"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--white)',
                    fontFamily: 'var(--sans)',
                    fontSize: '14px',
                    fontWeight: '300',
                    paddingBottom: '16px',
                    resize: 'none',
                    lineHeight: '1.6',
                    caretColor: 'var(--white)'
                  }}
                />
              </div>

              <div className="cf-row" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                <label className="cf-label" style={{
                  display: 'block',
                  fontFamily: 'var(--mono)',
                  fontSize: '9px',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--faint)',
                  padding: '18px 0 5px'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="cf-inp"
                  rows="5"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--white)',
                    fontFamily: 'var(--sans)',
                    fontSize: '14px',
                    fontWeight: '300',
                    paddingBottom: '16px',
                    resize: 'none',
                    lineHeight: '1.6',
                    caretColor: 'var(--white)'
                  }}
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
        </div>
      </div>
    </section>
  )
}
