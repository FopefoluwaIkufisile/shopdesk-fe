'use client';
import { Button } from '@/components/ui/button';
import {
  setNewOrders,
  setOrderStatusUpdates,
  setNotificationMethod,
  setWeeklySalesReport,
  setMonthlyPerformance,
  setSuccessfulPayments,
  setFailedPayments,
  setPaymentNotificationMethod,
} from '@/redux/notificationlslice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    newOrders,
    orderStatusUpdates,
    notificationMethod,
    weeklySalesReport,
    monthlyPerformance,
    successfulPayments,
    failedPayments,
    paymentNotificationMethod,
  } = useAppSelector((state) => state.notification);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const ToggleSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        className='sr-only peer'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#009A49] mr-60 transition-colors' />
      <span className='absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-5 transition-transform' />
    </label>
  );

  const CustomDropdown = ({
    options,
    value,
    onChange,
    selectWidth = '352px',
  }: {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
    selectWidth?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedLabel =
      options.find((opt) => opt.value === value)?.label || '';

    return (
      <div
        className='relative w-full sm:w-[352px]'
        style={{ maxWidth: selectWidth }}
      >
        <div
          className='w-full h-[62px] border border-[#e9eaeb] rounded-[12px] p-2 font-circular-light text-[#535862] text-base leading-5 font-[400] bg-white cursor-pointer flex items-center justify-between'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedLabel}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
        {isOpen && (
          <div className='absolute right-0 w-[239px] bg-white border border-[#e9eaeb] rounded-[12px] mt-1 z-10 overflow-hidden'>
            {options.map((option) => (
              <div
                key={option.value}
                className={`w-[239px] h-[52px] px-4 py-4 border-b border-[#e9eaeb] last:border-b-0 font-circular-light text-[#535862] text-base leading-5 font-[400] cursor-pointer hover:bg-[#E9EEF3] ${value === option.value ? 'bg-[#E9EEF3]' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleSave = () => {
    setShowSuccessDialog(true);
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
  };

  return (
    <>
      <div className='flex flex-col gap-6 w-full max-w-[1307px]'>
        <div className='flex flex-row w-full justify-between items-center gap-4 md:border-b border-[#e9eaeb] pb-6'>
          <div className='w-full flex flex-col gap-1 text-[#181d27]'>
            <p className='text-xl font-circular-medium leading-7'>
              Notification Settings
            </p>
            <p className='text-[#535862] font-circular-light leading-5 text-base'>
              Choose how you receive alerts to manage your store efficiently.
            </p>
          </div>
          <div className='flex flex-row gap-3 mt-4 md:mt-0'>
            <Button
              variant='outline'
              className='px-6 py-3 text-base cursor-pointer'
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className='px-6 py-3 text-base cursor-pointer'
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-[64px] w-full'>
          <div className='left-side flex flex-col gap-8 w-full max-w-[620px]'>
            <NotificationSection title='Order Notifications'>
              <div className='flex flex-row items-center justify-between py-2'>
                <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                  New Orders
                </p>
                <ToggleSwitch
                  checked={newOrders}
                  onChange={(checked) => dispatch(setNewOrders(checked))}
                />
              </div>
              <div className='flex flex-row items-center justify-between py-2'>
                <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                  Order Status Updates
                </p>
                <ToggleSwitch
                  checked={orderStatusUpdates}
                  onChange={(checked) =>
                    dispatch(setOrderStatusUpdates(checked))
                  }
                />
              </div>
              <div className='flex flex-row items-center justify-between gap-3 py-2'>
                <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                  Notification Method
                </p>
                <CustomDropdown
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'push', label: 'Push Notifications' },
                    { value: 'sms', label: 'SMS' },
                  ]}
                  value={notificationMethod}
                  onChange={(value) => dispatch(setNotificationMethod(value))}
                  selectWidth='288px'
                />
              </div>
            </NotificationSection>

            <NotificationSection title='Sales Reports & Insights'>
              <div className='flex flex-row items-center justify-between py-2'>
                <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                  Weekly Sales Report
                </p>
                <ToggleSwitch
                  checked={weeklySalesReport}
                  onChange={(checked) =>
                    dispatch(setWeeklySalesReport(checked))
                  }
                />
              </div>
              <div className='flex flex-row items-center justify-between py-2'>
                <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                  Monthly Performance Summary
                </p>
                <ToggleSwitch
                  checked={monthlyPerformance}
                  onChange={(checked) =>
                    dispatch(setMonthlyPerformance(checked))
                  }
                />
              </div>
            </NotificationSection>
          </div>

          <div className='right-side flex flex-col gap-5 w-full max-w-[629px] mt-8 lg:mt-0'>
            <NotificationSection title='Payment Notifications'>
              <div className='flex flex-row items-center justify-between py-2'>
                <p className='font-circular-light text-[#414651] text-base leading-5 font-[400]'>
                  Successful Payments
                </p>
                <ToggleSwitch
                  checked={successfulPayments}
                  onChange={(checked) =>
                    dispatch(setSuccessfulPayments(checked))
                  }
                />
              </div>
              <div className='flex flex-row items-center justify-between py-2'>
                <p className='font-circular-light text-[#414651] text-base leading-5 font-[300]'>
                  Failed Payments & Chargebacks
                </p>
                <ToggleSwitch
                  checked={failedPayments}
                  onChange={(checked) => dispatch(setFailedPayments(checked))}
                />
              </div>
              <div className='flex flex-row items-center justify-between gap-3 py-2 border-t-2 border-[#e9eaeb]'>
                <p className='font-circular-light text-[#414651] text-base leading-5 font-[400]'>
                  Notification Method
                </p>
                <CustomDropdown
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'push', label: 'Push Notifications' },
                    { value: 'sms', label: 'SMS' },
                  ]}
                  value={paymentNotificationMethod}
                  onChange={(value) =>
                    dispatch(setPaymentNotificationMethod(value))
                  }
                  selectWidth='288px'
                />
              </div>
            </NotificationSection>
          </div>
        </div>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success</AlertDialogTitle>
            <AlertDialogDescription>
              Notification settings saved successfully
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to discard all changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCancelDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const NotificationSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className='flex flex-col gap-5 w-full max-w-[620px] pb-6 bg-white'>
      <p className='font-circular-medium text-[#A0A0A0] text-base leading-5 font-[400] border-b-2 border-[#e9eaeb] pb-6'>
        {title}
      </p>
      {children}
    </div>
  );
};

export default Notification;
