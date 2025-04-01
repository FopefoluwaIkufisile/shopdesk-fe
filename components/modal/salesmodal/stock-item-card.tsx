import { addToCart } from '@/redux/features/product/product.slice';
import { useAppDispatch } from '@/redux/hooks';
import { Product } from '@/types/product';
import type React from 'react';
import { useMemo } from 'react';

interface ItemCardProps {
  item: Product;
  index: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, index }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addToCart(item));
  };

  const backgroundColor = useMemo(() => {
    const colors = [
      '#FCE4EC',
      '#F8BBD0',
      '#E1BEE7',
      '#D1C4E9',
      '#C5CAE9',
      '#BBDEFB',
      '#B3E5FC',
      '#B2EBF2',
      '#B2DFDB',
      '#C8E6C9',
      '#DCEDC8',
      '#F0F4C3',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleClick}
      style={{
        backgroundColor,
        color: '#212121',
      }}
      className='relative flex flex-col items-center justify-center h-[270px] rounded-md border cursor-pointer font-circular-std font-medium text-lg leading-7 tracking-normal transition-all duration-200 overflow-hidden'
    >
      <div
        className='absolute top-0 left-0 right-0 flex items-center justify-between p-3 border-b'
        style={{ borderColor: '#21212140' }}
      >
        <span className='text-sm font-medium'>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className='text-sm font-medium'>{`${item.available_quantity} left`}</span>
      </div>
      <div className='flex flex-col items-center justify-center h-full text-center px-4'>
        <p className='text-3xl font-medium mb-2'>{item.name}</p>
        <p className='text-3xl font-normal'>
          ₦ {item.selling_price || item.current_price[0]?.NGN[0]}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
