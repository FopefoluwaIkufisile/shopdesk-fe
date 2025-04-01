'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icons } from '../ui/icons';

const AuthButtons = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setSelectedOrganization(!!Cookies.get('selected_organization'));
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
      setSelectedOrganization(false);
    }
  };

  if (!isClient) return null;

  return selectedOrganization ? (
    <div className='flex items-center gap-4 max-[900px]:hidden'>
      <button
        onClick={handleLogout}
        className='btn-outline flex items-center gap-2'
      >
        {loading && <Icons.LoadingIcon />}
        <span>{loading ? 'Logging out...' : 'Logout'}</span>
      </button>

      <button
        onClick={() => router.push('/stock')}
        className='btn-primary hover:bg-gray-800 transition'
      >
        Go to Dashboard
      </button>
    </div>
  ) : (
    <div className='flex items-center gap-4 max-[900px]:hidden'>
      <button
        type='button'
        onClick={() => router.push('/sign-in')}
        className='btn-outline'
      >
        Sign in
      </button>
      <button
        type='button'
        onClick={() => router.push('/sign-up')}
        className='btn-primary hover:bg-gray-800 transition'
      >
        Start for free
      </button>
    </div>
  );
};

export default AuthButtons;
