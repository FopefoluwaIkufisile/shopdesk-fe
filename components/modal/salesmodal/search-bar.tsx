import { setSearchText } from '@/redux/features/product/product.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { Search } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const dispatch: AppDispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.cart.searchText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type='text'
        placeholder='Search items by name'
        value={searchText || ''}
        onChange={handleChange}
        className='w-full h-12 rounded-lg pl-10 pr-4 border border-gray-300 focus:ring-2 focus:ring-[#CCEBDB] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800'
      />
      <Search className='absolute left-3 top-3 text-gray-400' size={20} />
    </div>
  );
};

export default SearchBar;
