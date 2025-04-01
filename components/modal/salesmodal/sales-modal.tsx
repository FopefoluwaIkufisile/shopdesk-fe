'use client';
import type React from 'react';
import { useEffect, useMemo } from 'react';

import SearchBar from '@/components/modal/salesmodal/search-bar';
import {
  selectCartItems,
  selectSearchText,
  selectTotalQuantity,
} from '@/redux/features/product/product.slice';
import { useAppDispatch } from '@/redux/hooks';
import { updateCurrentTime } from '@/redux/slicer';
import { Product } from '@/types/product';
import { useSelector } from 'react-redux';
import ItemNotFound from './components/item-not-found';
import ModalHeader from './components/modal-header';
import ProductList from './components/product-list';
import Receipt from './components/receipt';

interface RecordSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockItems: Product[];
  onCompleteSale: (selectedItems: Product[]) => void;
  isCreatingSale: boolean;
  isCreatingCustomer: boolean;
  isFetchingCustomers: boolean;
  isFetchingProducts: boolean;
}

const SalesModal: React.FC<RecordSalesModalProps> = ({
  isOpen,
  onClose,
  stockItems,
  onCompleteSale,
  isCreatingSale,
  isCreatingCustomer,
  isFetchingCustomers,
  isFetchingProducts,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector(selectCartItems);
  const searchText = useSelector(selectSearchText);

  const totalQuantity = useSelector(selectTotalQuantity);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    if (!searchText) {
      return stockItems;
    }
    return stockItems.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [stockItems, searchText]);

  // const handleItemClick = (item: Product) => {
  //   dispatch(
  //     addToCart({
  //       ...item,
  //       selling_price: item.selling_price ? Number(item.selling_price) : 0,
  //     })
  //   );
  // };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardLimit = isMobile ? 8 : 6;

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-[#24242433] bg-opacity-80  flex items-center justify-center z-50 overflow-y-auto'>
      <div className='bg-white w-8/10  rounded-lg shadow-lg overflow-hidden max-w-[1228px] h-[90vh] max-h-[824px] flex flex-col lg:flex-row overflow-y-auto'>
        <div className='flex flex-col bg-white p-6 gap-7 flex-grow w-full lg:w-1/2'>
          <ModalHeader onClose={onClose} />
          <SearchBar className='w-full max-w-[563px]' />
          {filteredItems.length === 0 ? (
            <ItemNotFound />
          ) : (
            <ProductList
              filteredItems={filteredItems}
              cardLimit={cardLimit}
              cartItems={cartItems}
              isFetchingProducts={isFetchingProducts}
            />
          )}
        </div>

        <Receipt
          onClose={onClose}
          cartItems={cartItems}
          stockItems={stockItems}
          totalQuantity={totalQuantity}
          onCompleteSale={() => {
            onCompleteSale(cartItems);
          }}
          isLoading={
            isFetchingCustomers || isCreatingCustomer || isCreatingSale
          }
        />
      </div>
    </div>
  );
};

export default SalesModal;
