import React, { HTMLAttributes, useMemo } from "react"

import { cn } from "@/lib/utils"
import "./warp-background.css"

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  beamsPerSide?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridSize?: number
}

type BeamDef = {
  x: number
  delay: number
  duration: number
  width: number
}

function generateBeams(
  beamsPerSide: number,
  beamDelayMin: number,
  beamDelayMax: number,
  beamDuration: number
): BeamDef[] {
  const beams: BeamDef[] = []
  const step = 100 / (beamsPerSide + 1)

  for (let i = 0; i < beamsPerSide; i++) {
    const x = (i + 1) * step
    const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
    const width = 3 + Math.random() * 4
    const duration = beamDuration + Math.random() * 1.2
    beams.push({ x, delay, duration, width })
  }

  return beams
}

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  className,
  beamsPerSide = 3,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3.6,
  gridSize = 48,
  ...props
}) => {
  const beams = useMemo(
    () =>
      generateBeams(beamsPerSide, beamDelayMin, beamDelayMax, beamDuration),
    [beamsPerSide, beamDelayMin, beamDelayMax, beamDuration]
  )

  return (
    <div className={cn("warp-background", className)} {...props}>
      <div
        className="warp-background__scene"
        style={{
          ["--warp-grid-size" as any]: `${gridSize}px`,
        }}
        aria-hidden="true"
      >
        <div className="warp-background__grid" />
        <div className="warp-background__beams">
          {beams.map((beam, idx) => (
            <div
              key={idx}
              className="warp-background__beam"
              style={{
                ["--warp-x" as any]: `${beam.x}%`,
                ["--warp-w" as any]: `${beam.width}%`,
                ["--warp-delay" as any]: `${beam.delay}s`,
                ["--warp-dur" as any]: `${beam.duration}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="warp-background__content">{children}</div>
    </div>
  )
}
