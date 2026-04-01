import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

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
      color: 0xf0ede8,
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
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    })

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

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

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section id="hero">
      <canvas ref={canvasRef} id="hero-canvas" style={{ position: 'absolute', inset: 0 }}></canvas>
      
      <div className="hero-body">
        <div style={{ animation: 'up 1s cubic-bezier(.16,1,.3,1) both', flexShrink: 0, marginTop: '40px', marginBottom: '60px' }}>
          <h1 className="hero-h">
            <em>Krushna</em><br />
            Nirmalkar
          </h1>
        </div>

        <div className="hero-foot">
          <div className="hero-caption">
            Building <em>meaningful</em> digital experiences through code & design.
          </div>

          <div className="hero-image">
            <img src="public/media/profile.jpeg" alt="Krushna Nirmalkar" />
          </div>
        </div>
      </div>
    </section>
  )
}
