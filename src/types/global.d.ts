// global.d.ts
interface Window {
  gtag?: (...args: (string | number | Record<string, unknown>)[]) => void
}
