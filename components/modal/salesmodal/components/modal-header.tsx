import Image from 'next/image';

interface ModalHeaderProps {
  onClose: () => void;
  isMobile?: boolean;
}

const ModalHeader = ({ onClose, isMobile = false }: ModalHeaderProps) => {
  return (
    <div className='flex items-center gap-4 w-full'>
      <div className='bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center'>
        <Image
          src='/modal-images/ui-check.svg'
          alt='Check Logo'
          width={24}
          height={24}
        />
      </div>
      <div className='flex-grow'>
        <h1 className='font-medium text-2xl'>Make a Sale</h1>
        <p className='font-normal text-sm text-gray-500'>
          Select from your stock to make sales easily.
        </p>
      </div>
    </div>
  );
};

export default ModalHeader;
