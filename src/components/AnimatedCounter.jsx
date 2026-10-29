import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ targetNumber, suffix = '', duration = 1.8 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = targetNumber
    if (start === end) {
      setCount(end)
      return
    }

    const totalSteps = 60
    const stepTime = (duration * 1000) / totalSteps
    const increment = end / totalSteps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, targetNumber, duration])

  return (
    <span ref={ref} className="font-serif font-bold">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
