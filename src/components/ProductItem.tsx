import { memo, useState } from 'react';
import { AddProductToWishlistProps } from './AddProductToWishlist';
import dynamic from 'next/dynamic';
import lodash from 'lodash';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import('./AddProductToWishlist').then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    loading: () => <span>Carregando</span>,
  }
);
interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

// shallow compare => comparação rasa
// {} === {} // false
// igualdade referencial

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
