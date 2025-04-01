'use client';
import GreenBorder from '@/components/ui/green-border';
import { Icons } from '@/components/ui/icons';
import { selectTotalPrice } from '@/redux/features/product/product.slice';
import { RootState } from '@/redux/store';
import { Product } from '@/types/product';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReceiptItem from '../receipt-item';

interface ReceiptProps {
  onClose: () => void;
  cartItems: Product[];
  stockItems: Product[];

  totalQuantity: number;
  onCompleteSale: () => void;
  isLoading: boolean;
}

const Receipt = ({
  onClose,
  cartItems,
  stockItems,
  totalQuantity,
  onCompleteSale,
  isLoading,
}: ReceiptProps) => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  );

  const orderNumber = useSelector((state: RootState) => state.cart.salesCount);
  const totalPrice = useSelector(selectTotalPrice);
  // Add current date formatting
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className='relative flex flex-col bg-gray-50 w-full lg:w-1/2 h-full p-6 gap-5'>
      <div className='flex flex-col h-full bg-white rounded-lg w-full'>
        <div className='p-6'>
          <div className='flex flex-col w-full h-[62px] gap-1'>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold text-base md:text-2xl'>
                CUSTOMER RECEIPT
              </h1>
              <button
                type='button'
                onClick={onClose}
                className='w-[34px] h-[34px] rounded-lg cursor-pointer border border-[#1B1B1B] flex items-center justify-center p-[9px] hover:bg-gray-100 transition-colors md:flex'
              >
                <X size={16} className='text-gray-500' />
              </button>
            </div>
            <p className='text-sm text-gray-500'>
              Order #{orderNumber} | {currentDate}
            </p>
          </div>
          <div className='border-t border-dashed border-gray-300 my-2' />
          <div className='lg:h-46'>
            {cartItems.length > 0 && (
              <>
                <h2 className='font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
                  {cartItems.length > 1 ? 'ITEMS' : 'ITEM'}
                </h2>
                <div className='overflow-x-auto w-full h-[150px]'>
                  {cartItems.map((cartItem) => (
                    <ReceiptItem
                      key={cartItem.id}
                      stockItem={
                        stockItems.find((item) => item.id === cartItem.id)!
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className='border-t border-dashed border-gray-300 my-2' />
          <div className='flex items-center justify-between w-full gap-1'>
            <span className='font-sans text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
              Total
            </span>
            <div className='flex items-center md:px-10 gap-6'>
              <span className='font-sans text-base md:text-xl font-medium leading-[30px] text-[#2A2A2A] tracking-normal'>
                ₦ {totalPrice.toLocaleString()}
              </span>
              <span className='font-sans text-lg font-medium leading-7 px-6 tracking-normal'>
                {totalQuantity}
              </span>
            </div>
          </div>
          <div className='flex-grow' />
          <div className='text-center mt-2'>
            <p className='font-sans text-xl font-medium leading-8 text-[#2A2A2A] tracking-normal'>
              THANK YOU FOR YOUR PURCHASE!
            </p>
            <p className='font-sans text-sm text-gray-500'>{currentTime}</p>
          </div>
        </div>
        <GreenBorder className='w-full hidden lg:block' />
      </div>
      <button
        type='button'
        disabled={cartItems.length === 0 || isLoading}
        className={`w-full pt-3 pr-6 pb-3 pl-4 rounded-lg border cursor-pointer border-gray-300 flex items-center justify-center gap-2 font-medium text-white transition-colors ${
          cartItems.length === 0
            ? 'bg-gray-300 cursor-not-allowed opacity-50'
            : 'bg-black hover:bg-[#BDE0CE]'
        } ${isLoading ? 'cursor-not-allowed pointer-events-none' : ''}`}
        onClick={onCompleteSale}
      >
        {isLoading && <Icons.LoadingIcon />}
        <span>Complete Sale</span>
      </button>
    </div>
  );
};

export default Receipt;
