'use client'

import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const BackgroundCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.1;
  pointer-events: none;
`

interface MatrixDrop {
  x: number
  y: number
  speed: number
  length: number
  chars: string[]
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    
    // Create matrix drops
    const drops: MatrixDrop[] = []
    const numDrops = Math.floor(canvas.width / 20)

    for (let i = 0; i < numDrops; i++) {
      drops.push({
        x: i * 20,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        length: 10 + Math.floor(Math.random() * 20),
        chars: Array.from({ length: 20 }, () => 
          matrixChars[Math.floor(Math.random() * matrixChars.length)]
        )
      })
    }

    // Animation loop
    let animationId: number

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw matrix drops
      ctx.font = '14px monospace'
      ctx.fillStyle = '#00ff00'

      drops.forEach((drop, index) => {
        // Draw characters
        for (let i = 0; i < drop.length; i++) {
          const char = drop.chars[i]
          const y = drop.y - (i * 20)
          
          if (y >= 0 && y < canvas.height) {
            // Fade effect based on position
            const alpha = 1 - (i / drop.length)
            ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`
            ctx.fillText(char, drop.x, y)
          }
        }

        // Update position
        drop.y += drop.speed

        // Reset drop when it goes off screen
        if (drop.y > canvas.height + drop.length * 20) {
          drop.y = -drop.length * 20
          drop.x = Math.random() * canvas.width
          // Regenerate characters
          drop.chars = Array.from({ length: 20 }, () => 
            matrixChars[Math.floor(Math.random() * matrixChars.length)]
          )
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <BackgroundCanvas ref={canvasRef} />
}
