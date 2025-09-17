// // src/components/ProductGrid.tsx
// import Masonry from 'react-masonry-css'
// import ProductCard from './ProductCard'
// import type { Product } from '@/types' // Adjust this path if necessary

// const breakpointColumnsObj = {
//   default: 4,
//   1024: 3,
//   768: 2,
//   500: 1,
// }

// interface ProductGridProps {
//   products: Product[]
// }

// export default function ProductGrid({ products }: ProductGridProps) {
//   return (
//     <Masonry
//       breakpointCols={breakpointColumnsObj}
//       className="flex gap-4"
//       columnClassName="masonry-column"
//     >
//       {products.map((product) => (
//         <div key={product.id} className="mb-4">
//           <ProductCard product={product} />
//         </div>
//       ))}
//     </Masonry>
//   )
// }
