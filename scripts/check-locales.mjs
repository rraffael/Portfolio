// Dependency-free i18n parity check.
//
// Every locale file in locales/ must share the exact key structure of the
// reference (en.json): same nested keys, same value shapes (object/array/
// primitive), and same array lengths. Run with `npm test`. Exits non-zero on
// any divergence so it can gate CI or a pre-commit hook.

import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const localesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'locales')
const REFERENCE = 'en.json'

const load = (file) => JSON.parse(readFileSync(join(localesDir, file), 'utf8'))

const shapeOf = (value) => {
  if (Array.isArray(value)) return 'array'
  if (value === null) return 'null'
  return typeof value
}

// Walk reference (a) and candidate (b) in parallel, collecting divergences.
function compare(a, b, path, problems) {
  const ta = shapeOf(a)
  const tb = shapeOf(b)
  if (ta !== tb) {
    problems.push(`shape mismatch at "${path || '<root>'}": reference=${ta}, locale=${tb}`)
    return
  }
  if (ta === 'object') {
    for (const key of Object.keys(a)) {
      const childPath = path ? `${path}.${key}` : key
      if (!(key in b)) problems.push(`missing key in locale: "${childPath}"`)
      else compare(a[key], b[key], childPath, problems)
    }
    for (const key of Object.keys(b)) {
      if (!(key in a)) problems.push(`extra key in locale: "${path ? `${path}.${key}` : key}"`)
    }
  } else if (ta === 'array') {
    if (a.length !== b.length) {
      problems.push(`array length mismatch at "${path}": reference=${a.length}, locale=${b.length}`)
    }
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      compare(a[i], b[i], `${path}[${i}]`, problems)
    }
  }
}

const reference = load(REFERENCE)
const others = readdirSync(localesDir).filter((f) => f.endsWith('.json') && f !== REFERENCE)

let failed = false
for (const file of others) {
  const problems = []
  compare(reference, load(file), '', problems)
  if (problems.length) {
    failed = true
    console.error(`✗ ${file} diverges from ${REFERENCE} (${problems.length} issue(s)):`)
    for (const p of problems) console.error(`  - ${p}`)
  } else {
    console.log(`✓ ${file} matches ${REFERENCE}`)
  }
}

if (failed) process.exit(1)
console.log(`\nLocale parity OK — ${others.length + 1} file(s) share an identical key structure.`)
