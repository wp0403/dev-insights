'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number>()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置 canvas 尺寸为容器大小
    const resizeCanvas = () => {
      if (!containerRef.current) return
      const container = containerRef.current
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    // 初始化容器引用
    const parentElement = canvas.parentElement as HTMLDivElement
    containerRef.current = parentElement
    resizeCanvas()

    const resizeObserver = new ResizeObserver(resizeCanvas)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // 初始化粒子
    const initParticles = () => {
      const particleCount = Math.min(Math.floor(canvas.width * 0.05), 120) // 增加粒子数量
      particles.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8, // 增加速度
        vy: (Math.random() - 0.5) * 0.8, // 增加速度
        radius: Math.random() * 1.5 + 0.5 // 调整粒子大小范围
      }))
    }
    initParticles()

    // 绘制粒子和连线
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 绘制粒子
      particles.current.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)' // 增加粒子不透明度
        ctx.fill()
      })

      // 绘制连线
      particles.current.forEach((p1, i) => {
        particles.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) { // 增加连线距离
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 150)})` // 调整连线透明度
            ctx.lineWidth = 0.5 // 减小线条宽度
            ctx.stroke()
          }
        })
      })
    }

    // 更新粒子位置
    const update = () => {
      particles.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // 边界碰撞检测
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
      })
    }

    // 动画循环
    const animate = () => {
      update()
      draw()
      animationFrameId.current = requestAnimationFrame(animate)
    }
    animate()

    // 清理函数
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  )
}