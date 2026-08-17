import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

// A dramatic "portal" transition between the pro and pixel worlds: a grid of
// pixel blocks assembles to fully cover the screen, then dissolves away once
// the destination page has mounted underneath. Lives in _app.jsx (not a
// page) so it survives the unmount/mount that happens on every world switch.
const COLS = 12
const ROWS = 7
const CELL_COUNT = COLS * ROWS
const COVER_MS = 380
const REVEAL_MS = 380

const PALETTE = ['#0a0b16', '#12142a', '#2a2f5c', '#4a52a8', '#6d93ff', '#9db3ff']

// Deterministic pseudo-random stagger per cell (no Math.random so the grid
// doesn't reshuffle every render) — makes the blocks "assemble" out of order
// instead of a plain left-to-right wipe.
const CELLS = Array.from({ length: CELL_COUNT }, (_, i) => {
  const seed = Math.sin(i * 12.9898) * 43758.5453
  const delay = Math.abs(seed - Math.floor(seed))
  return { delay, color: PALETTE[(i * 7 + Math.floor(delay * 13)) % PALETTE.length] }
})

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function WorldTransition() {
  const router = useRouter()
  const [phase, setPhase] = useState('idle')
  const flags = useRef({ active: false, coverDone: false, navDone: false })

  useEffect(() => {
    const tryReveal = () => {
      const f = flags.current
      if (f.active && f.coverDone && f.navDone) {
        f.active = false
        setPhase('revealing')
        setTimeout(() => setPhase('idle'), REVEAL_MS)
      }
    }

    const handleStart = (url) => {
      if (prefersReducedMotion()) return
      // `trailingSlash: true` (next.config.js) turns "/pixel" into "/pixel/"
      // for real navigations, so strip it before comparing (root "/" already
      // has one and must stay untouched).
      const path = url.split(/[?#]/)[0].replace(/\/$/, '') || '/'
      if (path !== '/' && path !== '/pixel') return
      flags.current = { active: true, coverDone: false, navDone: false }
      setPhase('covering')
      setTimeout(() => {
        flags.current.coverDone = true
        tryReveal()
      }, COVER_MS)
    }

    const handleComplete = () => {
      flags.current.navDone = true
      tryReveal()
    }

    const handleError = () => {
      flags.current.active = false
      setPhase('idle')
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleError)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleError)
    }
  }, [router])

  if (phase === 'idle') return null

  return (
    <div className={`world-transition world-transition--${phase}`} aria-hidden="true">
      <div className="world-transition-grid">
        {CELLS.map((cell, i) => (
          <span
            key={i}
            className="world-transition-cell"
            style={{ '--d': `${cell.delay * 0.22}s`, background: cell.color }}
          />
        ))}
      </div>
    </div>
  )
}
