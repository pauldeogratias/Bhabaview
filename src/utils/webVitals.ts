// src/utils/webVitals.ts
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'

const sendToAnalytics = (metric: Metric) => {
  const { name, value } = metric
  console.log(`${name}: ${value}`)
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'web_vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true
    })
  }
}

export const reportWebVitals = () => {
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics)  // Replaced onFID with onINP
  onFCP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}

// Usage in _app.tsx:
// import { reportWebVitals } from '../utils/webVitals'
// 
// useEffect(() => {
//   if (typeof window !== 'undefined') {
//     reportWebVitals()
//   }
// }, [])
