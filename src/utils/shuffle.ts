// src/utils/shuffle.ts

/**
 * Fisher-Yates shuffle algorithm for true randomization
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Smart shuffle that ensures product diversity by spreading similar items
 */
export function smartShuffle<T extends { categoryName?: string; vendorId?: string }>(
  products: T[], 
  diversityKey: 'categoryName' | 'vendorId' = 'categoryName'
): T[] {
  if (!products || products.length <= 1) return products;

  // Group products by diversity key
  const groups = new Map<string, T[]>();
  products.forEach(product => {
    const key = product[diversityKey] || 'unknown';
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(product);
  });

  // Shuffle each group internally
  groups.forEach((group, key) => {
    groups.set(key, shuffleArray(group));
  });

  // Distribute products evenly using round-robin
  const result: T[] = [];
  const groupArrays = Array.from(groups.values());
  const maxLength = Math.max(...groupArrays.map(arr => arr.length));

  for (let i = 0; i < maxLength; i++) {
    groupArrays.forEach(group => {
      if (group[i]) {
        result.push(group[i]);
      }
    });
  }

  // Final light shuffle to add randomness while maintaining diversity
  return lightShuffle(result);
}

/**
 * Light shuffle - only swaps items that are far apart to maintain diversity
 */
function lightShuffle<T>(array: T[], swapDistance: number = 5): T[] {
  const result = [...array];
  const swaps = Math.floor(array.length / 10); // 10% of items get swapped
  
  for (let i = 0; i < swaps; i++) {
    const index1 = Math.floor(Math.random() * result.length);
    const minDistance = Math.min(swapDistance, Math.floor(result.length / 4));
    const index2 = (index1 + minDistance + Math.floor(Math.random() * minDistance)) % result.length;
    
    [result[index1], result[index2]] = [result[index2], result[index1]];
  }
  
  return result;
}

/**
 * Redistribute to avoid too many products from same vendor in a row
 */
export function redistributeByVendor<T extends { vendorId?: string }>(products: T[]): T[] {
  const result: T[] = [];
  const remaining = [...products];
  let lastVendor: string | null = null;
  let consecutiveCount = 0;

  while (remaining.length > 0) {
    let nextIndex = 0;
    
    // If we've had too many consecutive items from same vendor, find different vendor
    if (consecutiveCount >= 2 && remaining.length > 1) {
      nextIndex = remaining.findIndex(product => product.vendorId !== lastVendor);
      if (nextIndex === -1) nextIndex = 0; // Fallback if all remaining are same vendor
    }

    const product = remaining.splice(nextIndex, 1)[0];
    result.push(product);

    if (product.vendorId === lastVendor) {
      consecutiveCount++;
    } else {
      consecutiveCount = 1;
      lastVendor = product.vendorId || null;
    }
  }

  return result;
}

/**
 * Time-based shuffle seed for consistent shuffling within a time window
 */
export function getShuffleSeed(timeWindowMinutes: number = 5): number {
  const now = Date.now();
  const timeWindow = timeWindowMinutes * 60 * 1000;
  return Math.floor(now / timeWindow);
}

/**
 * Seeded shuffle for consistent results within a time window
 */
export function seededShuffle<T>(array: T[], seed?: number): T[] {
  const actualSeed = seed ?? getShuffleSeed();
  const shuffled = [...array];
  
  // Simple linear congruential generator for seeded randomness
  let random = actualSeed;
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    random = (a * random + c) % m;
    const j = Math.floor((random / m) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}