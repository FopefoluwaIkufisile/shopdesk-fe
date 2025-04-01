'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import twitter from '../../public/newsletter/twitternews.svg';
import facebook from '../../public/newsletter/facebooknews.svg';
import instagram from '../../public/newsletter/instagramnews.svg';
import github from '../../public/newsletter/githubnews.svg';
import Logo from '@/components/functional/NewsLogo';
import Link from 'next/link';

const Newsletter = () => {
  const links = [
    {
      name: twitter,
      link: 'https://x.com/shopdeskhng',
    },
    {
      name: facebook,
      link: 'https://www.facebook.com/share/18weYAqtPe/',
    },
    {
      name: instagram,
      link: 'https://www.instagram.com/shopdesk_?igsh=MXIybG5sNXhvazI5dg==',
    },
    {
      name: github,
      link: 'https://github.com/hngprojects/shopdesk-fe',
    },
  ];

  return (
    <div className='bg-green-50 px-4 lg:px-5 py-5'>
      <div className='"bg-green-50  lg:pb-10  lg:px-5'>
        <div className='flex flex-col px-4 lg:px-[38px] pb-6 pt-[78px] rounded-xl justify-center items-center bg-white'>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-center'>
              <Logo />
            </div>
            <h1 className='text-2xl lg:text-5xl font-bold'>
              Introducing Sales Tracking
            </h1>
          </div>
          <div className='flex flex-col justify-start items-start w-full mt-10 lg:mt-20 mb-5'>
            <p className='text-[16px] lg:text-2xl font-normal'>
              Hi, Emeka & Sons
            </p>
            <p className='text-[16px] lg:text-2xl font-normal mt-6'>
              Monitor your sales in real-time and unlock actionable insights to
              boost your business performance
            </p>
            <p className='text-[16px] lg:text-2xl font-normal lg:w-[1200px]'>
              Our new Sales Tracking feature provides a complete view of your
              revenue streams, best-selling products, and performance trends.
              Stay ahead by making informed decisions based on real-time data.
            </p>
          </div>
          <div>
            <Image
              src='/newsletter/newsletterhero.svg'
              alt='Sales Table Icon'
              className='mx-auto size-full'
              width={1296}
              height={500}
            />
          </div>
          <div className='flex flex-col items-start justify-start mt-4 lg:mt-[65px] w-full'>
            <div className='flex flex-col items-start justify-start w-full'>
              <h2 className='text-[18px] lg:text-[32px] font-medium'>
                Key Benefits{' '}
              </h2>
              <div>
                <p className='text-[16px] lg:text-[24px] font-normal mt-6'>
                  🚀{' '}
                  <span className='font-black'>Instant Recording &ndash;</span>
                  Every transaction is captured in real time, ensuring accurate
                  data tracking.
                </p>
              </div>
              <div>
                <p className='text-[16px] lg:text-[24px] font-normal mt-6'>
                  📦{' '}
                  <span className='font-black'>
                    Dynamic View Toggle &ndash;
                  </span>{' '}
                  Easily switch between &lsquo;show sales&rsquo; and &lsquo;show
                  profits&rsquo; to view the metrics that matter most to you
                </p>
              </div>
              <div>
                <p className='text-[16px] lg:text-[24px] font-normal mt-6'>
                  💼{' '}
                  <span className='font-black'>
                    Seamless Sales Management &ndash;
                  </span>{' '}
                  Track and optimize your business.
                </p>
              </div>
              <div className='mt-10'>
                <Button>Learn More</Button>
              </div>
              <div>
                <p className='text-[16px] lg:text-[24px] font-normal mt-6'>
                  Try it now and boost your business insight.
                </p>
                <p className='text-[16px] lg:text-[24px] font-normal mt-6'>
                  Thank you for choosing Shopdesk.
                </p>
                <p className='text-[16px] lg:text-[24px] font-normal mt-6'>
                  Best regards,
                </p>
                <p className='text-[16px] lg:text-[24px] font-normal text-green-600'>
                  Shopdesk team.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='mt-[46.5px] flex flex-col items-center gap-4 justify-center'>
            <div className='flex items-center justify-center'>
              <Logo />
            </div>
            <div className='flex gap-4 md:flex'>
              {links.map((icon, index) => (
                <Link
                  href={icon.link}
                  key={index}
                  className=' flex items-center justify-center'
                >
                  <Image
                    width={28}
                    height={28}
                    src={icon.name}
                    alt={icon.name.toString()}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className='flex flex-col items-center gap-2.5 justify-center text-[10px] lg:text-[16px] text-[#706F6F]'>
            <p>Copyright ShopDesk © 2025 | Powered by Timbu Busines</p>
            <p className='text-center'>
              You&apos;re receiving this email because you are a subscriber of{' '}
              <Link href='/' className='text-green-500 font-light'>
                shopdesk.im
              </Link>
              , If you feel you received it by mistake or wish to unsubscribe,{' '}
              <span className='text-green-500 font-black cursor-pointer'>
                click here
              </span>{' '}
            </p>
          </div>
          <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4 text-[14px] text-[#71717A] text-center md:text-left'>
            <ul className='flex flex-wrap justify-center items-center gap-4'>
              {[
                'Cookies',
                'Terms of service',
                'Privacy Policy',
                'Manage Policy',
              ].map((item, index) => (
                <li key={index}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
