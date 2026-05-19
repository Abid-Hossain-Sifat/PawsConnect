import React from "react";
import Link from "next/link";
import { ListOrdered, PlusCircle, FolderOpen } from "lucide-react";

const DashListPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#00685f]/10 text-[#00685f] rounded-xl flex items-center justify-center">
            <ListOrdered size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              My Listings
            </h1>
            <p className="text-xs text-gray-400">
              Manage and track all the pets you have posted for adoption.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/add-pet"
          className="bg-[#00685f] hover:bg-[#005049] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all flex items-center gap-2 shadow-xs self-start sm:self-auto"
        >
          <PlusCircle size={18} />
          Add New Pet
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-xs flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="h-20 w-20 bg-[#f5faf8] rounded-full flex items-center justify-center text-gray-400 mb-6 border border-dashed border-[#00685f]/20 animate-pulse">
          <FolderOpen size={36} className="text-[#00685f]/60" />
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
          No Pets Listed Yet
        </h3>
        <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
          It looks like you haven't published any pet listings yet. Start by
          adding a pet to find them a loving home!
        </p>

        <Link
          href="/dashboard/add-pet"
          className="border-2 border-[#00685f] text-[#00685f] hover:bg-[#00685f] hover:text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300"
        >
          Create Your First Listing
        </Link>
      </div>
    </div>
  );
};

export default DashListPage;
