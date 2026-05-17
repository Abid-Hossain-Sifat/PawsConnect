import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import Navlogo from '../../public/Assets/NavLogo.png'

const Navbar = () => {
  return (
    <div className='shadow-sm'>
      <div className='flex justify-between max-w-[80%] mx-auto items-center p-3'>
        <div className='flex gap items-center'>
          <Image
            src={Navlogo}
            alt='NavbarLogo'
            height={40}
            className='mt-1'
            
          ></Image>
          <h1 className='text-3xl font-bold text-[#00685f]'>PawsConnect</h1>
        </div>
        <div className='flex gap-10'>
          <Link href='#'>
            Home
          </Link>
          <Link href='#'>
            All Pets
          </Link>
          <Link href='#'>
            My Request
          </Link>
          <Link href='#'>
            Add Pet
          </Link>
        </div>
        <div>
          <Link href='#'>
            <button className='flex gap-1 items-center btn bg-[#007A78] hover:bg-[#005A58] text-white px-6 py-2.5 text-sm font-medium transition-all duration-300'>
              Login <FaArrowRightToBracket></FaArrowRightToBracket>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
