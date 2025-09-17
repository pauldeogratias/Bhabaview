// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
// import { SearchParams } from '@/types/api';
import { SearchParams ,Product } from '@/utils/api';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://bhababackend.onrender.com';

const fetchProducts = async (
  params: SearchParams
): Promise<{ products: Product[]; total: number }> => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const response = await fetch(`${API_BASE}/search?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useProducts = (params: SearchParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000,   // v5 replacement for cacheTime
  });
};
