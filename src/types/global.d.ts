// global.d.ts

export {};

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}
 
interface Window {
  gtag?: (...args: (string | number | Record<string, unknown>)[]) => void
}

