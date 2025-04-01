import { Icons } from '@/components/ui/icons';
import { addToCart } from '@/redux/features/product/product.slice';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import ItemCard from '../stock-item-card';

interface ProductListProps {
  filteredItems: Product[];
  cardLimit: number;
  cartItems: Product[];
  isFetchingProducts: boolean;
}

const ProductList = ({
  filteredItems,
  cardLimit,
  cartItems,
  isFetchingProducts,
}: ProductListProps) => {
  const dispatch = useDispatch();

  return (
    <div className='flex-1 w-full overflow-y-auto pr-2 custom-scrollbar'>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-2'>
        {filteredItems.slice(0, cardLimit).map((item, index) => (
          <ItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
      {isFetchingProducts && <Icons.LoadingIcon />}
      {!isFetchingProducts && (
        <div className='mt-4 space-y-2'>
          {filteredItems.slice(cardLimit).map((item) => (
            <div
              key={item.id}
              onClick={() => dispatch(addToCart(item))}
              className={`flex items-center justify-between py-2 rounded-md cursor-pointer ${
                cartItems.some((i) => i.id === item.id)
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded border text-center flex items-center justify-center bg-gray-50'>
                  {item.photos?.[0] ? (
                    <div className='relative w-full h-full'>
                      <Image
                        src={item.photos[0] || '/default-image.png'}
                        alt={item.name}
                        fill
                        className='object-cover rounded'
                      />
                    </div>
                  ) : (
                    <span className='w-full h-full flex items-center justify-center uppercase'>
                      {item.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className='font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
                  {item.name}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='font-sans text-[#2A2A2A] text-lg font-medium leading-7 tracking-normal'>
                  {item.selling_price || 'N/A'}
                </span>
                <span className='text-[#E9EEF3]'>|</span>
                <span className='font-sans text-[#2A2A2A] px-2 text-lg font-medium leading-7 tracking-normal'>
                  {item.available_quantity} left
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
