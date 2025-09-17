// export function sanitizeData<T>(data: any): T {
//   if (typeof data !== 'object' || data === null) {
//     return data;
//   }

//   // Handle arrays
//   if (Array.isArray(data)) {
//     return data.map(item => sanitizeData(item)) as unknown as T;
//   }

//   // Handle objects
//   const sanitized: Record<string, any> = {};
//   for (const key in data) {
//     if (Object.prototype.hasOwnProperty.call(data, key)) {
//       let value = data[key];
      
//       // Remove non-printable characters from strings
//       if (typeof value === 'string') {
//         value = value.replace(/[^\x20-\x7E]/g, '');
//       }
      
//       sanitized[key] = sanitizeData(value);
//     }
//   }

//   return sanitized as T;
// }

// export function safeJsonParse<T>(jsonString: string): T | null {
//   try {
//     const parsed = JSON.parse(jsonString);
//     return sanitizeData<T>(parsed);
//   } catch (error) {
//     console.error('JSON parse error:', error);
//     return null;
//   }
// }