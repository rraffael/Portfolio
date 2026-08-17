import { useEffect } from 'react'

// `_document.jsx` bakes `data-world` into the exported HTML for the *first*
// load of a route (no flash on a cold visit). But `next/link` navigation
// between `/` and `/pixel` is client-side and never re-runs `_document`, so
// without this the attribute stays stuck on whatever world was first loaded
// until a manual refresh. Each page calls this on mount to keep <html
// data-world> in sync with whichever page is actually active.
export function useWorld(world: 'pixel' | 'pro') {
  useEffect(() => {
    document.documentElement.dataset.world = world
  }, [world])
}
