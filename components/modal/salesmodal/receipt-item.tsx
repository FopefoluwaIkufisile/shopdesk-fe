import {
  removeFromCart,
  updateQuantity,
} from '@/redux/features/product/product.slice';
import { useAppDispatch } from '@/redux/hooks';
import { AppDispatch, RootState } from '@/redux/store';
import { Product } from '@/types/product';
import { Minus, Plus } from 'lucide-react';
import type React from 'react';
import { useSelector } from 'react-redux';

interface ReceiptItemProps {
  stockItem: Product;
}

const ReceiptItem: React.FC<ReceiptItemProps> = ({ stockItem }) => {
  const dispatch: AppDispatch = useAppDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === stockItem.id)
  );

  if (!cartItem) {
    return null;
  }

  const handleDecreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      dispatch(
        updateQuantity({
          id: cartItem.id,
          quantity: cartItem.quantity - 1,
        })
      );
    } else {
      dispatch(removeFromCart(cartItem.id));
    }
  };

  const handleIncreaseQuantity = () => {
    if (cartItem.quantity < cartItem.availableQuantity) {
      dispatch(
        updateQuantity({
          id: cartItem.id,
          quantity: cartItem.quantity + 1,
        })
      );
    }
  };

  return (
    <div className='flex items-center justify-between py-2'>
      <span className='font-sans text-sm  md:text-xl font-medium leading-5 md:leading-8 text-[#2A2A2A] tracking-normal'>
        {stockItem.name}
      </span>
      <div className='flex items-center gap-4'>
        <span className='font-sans text-xs md:text-lg font-medium leading-7 tracking-normal'>
          ₦ {stockItem.selling_price || stockItem.current_price[0]?.NGN[0]}
        </span>
        <div className='flex items-center gap-1.5'>
          <button
            type='button'
            onClick={handleDecreaseQuantity}
            className='w-7 h-7 md:w-10 md:h-10 rounded-lg cursor-pointer border border-[#0063CC] flex items-center justify-center md:p-[15px] hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Minus size={16} />
          </button>
          <span className='w-7 h-7 md:w-10 md:h-10 rounded-lg border border-gray-300 flex items-center justify-center p-[15px] font-sans md:text-lg font-medium leading-7 tracking-normal pointer-events-none text-sm '>
            {cartItem.quantity}
          </span>
          <button
            type='button'
            onClick={handleIncreaseQuantity}
            disabled={cartItem.quantity >= cartItem.availableQuantity}
            className='w-7 h-7 md:w-10 md:h-10 rounded-lg cursor-pointer border border-[#0063CC] flex items-center justify-center md:p-[15px] hover:bg-gray-100 transition-colors'
          >
            <Plus size={16} className='text-black w-2 md:w-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptItem;
