// // global.d.ts
// interface Window {
//   gtag?: (...args: (string | number | Record<string, unknown>)[]) => void
// }



// global.d.ts
interface Window {
  gtag?: (...args: (string | number | Record<string, unknown>)[]) => void;
  fbq?: (
    command: string,
    pixelId: string,
    event: string,
    params?: Record<string, unknown>
  ) => void;
}




