import { useMemo } from 'react';

import { ProductItem } from './ProductItem';

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

//igualdade referencial
//

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return <ProductItem product={product} />;
      })}
    </div>
  );
}

/**
 * 1. Criar uma nova versão do component
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 *
 *
 * uso do memo
 * 1. Pure functional components
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size
 */

/**
 * useMemo / useCallBack
 *
 * 1. Calculos pesados
 * 2. Igualdade referencial ( quando a gente repassa aquela informação a um componente filho)
 *
 */
