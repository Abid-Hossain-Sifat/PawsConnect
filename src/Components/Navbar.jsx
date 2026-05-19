"use client";
import Link from 'next/link';
import React from 'react';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { PawPrint, LogOut, LayoutDashboard } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  if (pathname?.startsWith('/dashboard')) return null;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/log-in"; 
        }
      }
    });
  };

  return (
    <div className='shadow-sm'>
      <div className='flex justify-between max-w-[80%] mx-auto items-center p-3'>
        <div className='flex gap-2 items-center'>
          <div className='p-2 bg-[#00685f] rounded-xl'>
            <PawPrint className='text-white w-6 h-6' />
          </div>
          <h1 className='text-3xl font-bold text-[#00685f]'>PawsConnect</h1>
        </div>
        
        <div className='flex gap-10 items-center font-medium text-slate-700'>
          <Link href='/' className='hover:text-[#00685f] transition-colors'>Home</Link>
          <Link href='/all-pets' className='hover:text-[#00685f] transition-colors'>All Pets</Link>
          <Link href='/request' className='hover:text-[#00685f] transition-colors'>My Request</Link>
          <Link href='/add-pets' className='hover:text-[#00685f] transition-colors'>Add Pet</Link>
        </div>
        
        <div>
          {isPending ? (
            <div className="skeleton w-24 h-10 rounded-lg"></div>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 btn btn-ghost p-1 rounded-full px-3 hover:bg-slate-100 border border-slate-200">
                {session.user.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name} 
                    className="w-8 h-8 rounded-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${session.user.name}&background=007A78&color=fff`;
                    }} 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#007A78] flex items-center justify-center text-white font-bold text-sm">
                    {session.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-semibold text-slate-700 capitalize">{session.user.name}</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-xl z-[1] w-52 p-2 shadow-lg border border-slate-100 mt-3">
                <li>
                  <Link href="/dashboard" className="flex items-center gap-3 font-medium text-slate-700 py-3">
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-rose-600 font-medium hover:bg-rose-50 hover:text-rose-700 py-3 mt-1">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href='/log-in'>
              <button className='flex gap-1 items-center btn bg-[#007A78] hover:bg-[#005A58] text-white px-6 py-2.5 text-sm font-medium transition-all duration-300'>
                Login <FaArrowRightToBracket />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar;
