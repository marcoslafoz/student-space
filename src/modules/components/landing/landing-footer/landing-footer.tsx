import React from 'react'
import { InstagramIcon, TiktokIcon, XIcon } from '../../base'

export const LandingFooter: React.FC = () => {
  return (
    <>
      <div className='flex flex-col items-center custom-bg-color-primary w-full'>
        <div className='flex flex-col w-3/4 md:w-2/3 lg:w-2/3 gap-5 h-auto pb-10'>
          <hr className='border-[#545454] px-16 w-full' />
          <div className='flex flex-col md:flex-row flex-wrap w-full items-center justify-center md:justify-between text-[#545454] text-sm text-balance gap-4'>
            <a href='/'>
              <div className='hover:text-[#747474]'>StudentSpace</div>
            </a>
            <div className='flex flex-row gap-2 justify-between items-center hover:text-[#747474]'>
              <img src='assets/icons/ES.webp' alt='Spain flag' className='h-4 object-contain' />
              <span>Español</span>
            </div>
            <div className='hover:text-[#747474]'>Terminos del sitio web</div>
            <div className='hover:text-[#747474]'>Privacidad</div>
            <div className='hover:text-[#747474] flex flex-row justify-center items-center gap-4'>
              <a href='https://www.x.com'>
                <XIcon className='fill-[#545454] hover:fill-[#747474]' />
              </a>
              <a href='https://www.instagram.com'>
                <InstagramIcon className='fill-[#545454] hover:fill-[#747474]' />
              </a>
              <a href='https://www.tiktok.com'>
                <TiktokIcon className='fill-[#545454] hover:fill-[#747474]' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}