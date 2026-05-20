'use client'
import React from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { 
  PlusCircle, 
  ListOrdered, 
  GitPullRequest, 
  LayoutDashboard, 
  Home, 
  LogOut 
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/log-in";
        }
      }
    });
  };

  const menuItems = [
    {
      name: 'Add Pet',
      path: '/dashboard/add-pet',
      icon: <PlusCircle size={20} />,
    },
    {
      name: 'My Listing',
      path: '/dashboard/my-listing',
      icon: <ListOrdered size={20} />,
    },
    {
      name: 'My Requests',
      path: '/dashboard/my-requests',
      icon: <GitPullRequest size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5faf8]">
      
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between fixed h-full z-20">
        <div>
          <div className="p-6 border-b border-gray-50 flex items-center gap-2">
            <div className="h-8 w-8 bg-[#00685f] rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-wide">
              Pet<span className="text-[#00685f]">Adopt</span>
            </span>
          </div>

          <nav className="p-4 space-y-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">
              Dashboard Menu
            </p>
            
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-[#eef7f5] hover:text-[#00685f] transition-all duration-200 group"
              >
                <div className="text-gray-400 group-hover:text-[#00685f] transition-colors">
                  {item.icon}
                </div>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-50 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-all"
          >
            <Home size={20} className="text-gray-400" />
            Back to Home
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} className="text-red-400" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 pl-64 flex flex-col">
        
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <LayoutDashboard size={18} className="text-[#00685f]" />
            <span>Dashboard Panel</span>
          </div>
          
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="skeleton w-32 h-10 rounded-lg"></div>
            ) : session ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 capitalize">{session.user.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{session.user.email}</p>
                </div>
                {session.user.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name} 
                    className="w-9 h-9 rounded-full object-cover border border-[#00685f]/20" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${session.user.name}&background=007A78&color=fff`;
                    }} 
                  />
                ) : (
                  <div className="h-9 w-9 bg-[#00685f]/10 text-[#00685f] font-bold rounded-full flex items-center justify-center border border-[#00685f]/20 uppercase">
                    {session.user.name.charAt(0)}
                  </div>
                )}
              </>
            ) : (
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-800">Not Logged In</p>
               </div>
            )}
          </div>
        </header>

        <main className="p-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;