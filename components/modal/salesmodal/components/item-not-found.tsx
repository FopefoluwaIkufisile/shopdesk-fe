'use client';
import { Icons } from '@/components/ui/icons';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const ItemNotFound = () => {
  const searchText = useSelector((state: RootState) => state.cart.searchText);
  return (
    <div className='flex flex-col items-center justify-center p-8 w-full max-w-xl mx-auto'>
      {/* Box icon placeholder */}
      <Icons.EmptyBasket />

      {/* Text content */}
      <h2 className='text-base lg:text-2xl text-gray-400 font-light mb-2'>
        Item not found.
      </h2>
      <p className='text-base lg:text-2xl text-gray-400 font-light mb-8 text-center'>
        Would you like to sell {searchText}?
      </p>

      {/* Sell Item button */}
      <Link
        href='/stock'
        className='flex items-center justify-center gap-2 border border-gray-300 rounded-full py-3 px-8 text-gray-500 font-medium'
      >
        <Icons.SaleIcon />
        <span>Sell Item</span>
      </Link>
    </div>
  );
};

export default ItemNotFound;
