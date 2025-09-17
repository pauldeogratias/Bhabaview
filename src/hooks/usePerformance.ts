import { useEffect, useRef, useCallback } from 'react'

export const usePerformance = (componentName: string) => {
  const renderStart = useRef<number>(0)
  const mounted = useRef<boolean>(false)

  useEffect(() => {
    if (!mounted.current) {
      renderStart.current = performance.now()
      mounted.current = true
    }
  }, [])

  useEffect(() => {
    return () => {
      if (renderStart.current > 0) {
        const renderTime = performance.now() - renderStart.current
        if (renderTime > 16) {
          console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`)
        }
      }
    }
  }, [componentName])

  const recordRenderStart = useCallback(() => {
    renderStart.current = performance.now()
  }, [])

  const recordRenderEnd = useCallback(() => {
    if (renderStart.current > 0) {
      const renderTime = performance.now() - renderStart.current
      if (renderTime > 16) {
        console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`)
      }
      return renderTime
    }
    return 0
  }, [componentName])

  return { recordRenderStart, recordRenderEnd }
}