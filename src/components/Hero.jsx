import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero({ theme = 'dark' }) {
  const canvasRef = useRef(null)
  const profileSrc = `${import.meta.env.BASE_URL}media/profile.jpeg`

  useEffect(() => {
    if (!canvasRef.current) return

    let rafId = 0
    let disposed = false

    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    camera.position.z = 5

    // Particles
    const particleCount = 3000
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const angles = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40

      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

      angles[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))
    geometry.setAttribute('angle', new THREE.BufferAttribute(angles, 1))

    const material = new THREE.PointsMaterial({
      color: theme === 'dark' ? 0xf0ede8 : 0x0c0c0c,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse parallax
    let mouseX = 0,
      mouseY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      if (disposed) return
      rafId = requestAnimationFrame(animate)

      const pos = geometry.attributes.position.array
      const vel = geometry.attributes.velocity.array
      const ang = geometry.attributes.angle.array

      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += vel[i * 3]
        pos[i * 3 + 1] += vel[i * 3 + 1] + Math.sin(ang[i]) * 0.002
        pos[i * 3 + 2] += vel[i * 3 + 2]

        ang[i] += 0.01

        // Wrap around
        if (pos[i * 3] > 20) pos[i * 3] = -20
        if (pos[i * 3] < -20) pos[i * 3] = 20
        if (pos[i * 3 + 1] > 20) pos[i * 3 + 1] = -20
        if (pos[i * 3 + 1] < -20) pos[i * 3 + 1] = 20
        if (pos[i * 3 + 2] > 20) pos[i * 3 + 2] = -20
        if (pos[i * 3 + 2] < -20) pos[i * 3 + 2] = 20
      }

      geometry.attributes.position.needsUpdate = true

      // Mouse parallax on camera
      camera.rotation.x = mouseY * 0.3
      camera.rotation.y = mouseX * 0.3

      if (disposed) return
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (disposed) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      disposed = true
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [theme])

  return (
    <section id="hero">
      <canvas ref={canvasRef} id="hero-canvas"></canvas>

      <div className="hero-body">
        <div className="hero-text">
          <div className="hero-title-wrap">
            <h1 className="hero-h">
              <em>Krushna</em>
              <br />
              Nirmalkar
            </h1>
          </div>

          <div className="hero-caption">
            Building <em>meaningful</em> digital experiences through code & design.
          </div>
        </div>

        <div className="hero-image">
          <img
            src={profileSrc}
            alt="Krushna Nirmalkar"
            loading="eager"
            decoding="async"
            onError={() => {
              // Helps diagnose Vercel/production-only issues (404 path, base path, caching)
              // without changing the UI/UX.
              // eslint-disable-next-line no-console
              console.error('[Hero] profile image failed to load:', profileSrc)
            }}
          />
        </div>
      </div>
    </section>
  )
}
