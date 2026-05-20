"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Loader2, Heart, MapPin, Sparkles } from 'lucide-react';

const AllPetsPage = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [pets, setPets] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPetsAndRequests = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
        
        const res = await fetch(baseUrl);
        if (res.ok) {
          const petsData = await res.json();
          setPets(petsData);
        }

        if (session?.user?.email) {
          const reqUrl = `${baseUrl.replace(/\/pets$/, '')}/adoption-requests?requesterEmail=${session.user.email}`;
          const reqRes = await fetch(reqUrl);
          if (reqRes.ok) {
            const reqData = await reqRes.json();
            setUserRequests(reqData);
          }
        }
      } catch (error) {
        console.error("Error loading pets or requests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPetsAndRequests();
  }, [session, sessionPending]);

  if (loading || sessionPending) {
    return (
      <div className="min-h-screen bg-[#f5faf8] flex flex-col items-center justify-center p-4">
        <Loader2 size={40} className="animate-spin text-[#00685f] mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading pets list...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5faf8] py-6 md:py-12 min-h-screen">
      <div className="w-full max-w-[92%] sm:max-w-[85%] lg:max-w-[80%] mx-auto">
        <div className="text-center mb-8 md:mb-12 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">
            Find Your Perfect <span className="text-[#00685f]">Companion</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Browse through our complete list of beautiful pets waiting for a loving home and a family to belong to.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
          {pets && pets.map((pet, index) => {
            const userRequest = userRequests.find((req) => req.petId === pet._id);
            const isOwner = session?.user?.email && (session.user.email === pet.email || session.user.email === pet.ownerEmail);
            
            const displayStatus = isOwner ? (pet.status || 'Available') : (userRequest ? (userRequest.status === 'approved' ? 'Adopted' : (userRequest.status === 'rejected' ? 'Rejected' : 'Pending')) : (pet.status || 'Available'));
            const isPendingStatus = displayStatus.toLowerCase() === 'pending';
            const isAdoptedStatus = displayStatus.toLowerCase() === 'adopted';
            const isRejectedStatus = displayStatus.toLowerCase() === 'rejected';

            return (
              <div key={pet._id || index} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:border-teal-500/20 border border-[#00685f]/10 transition-all duration-300 flex flex-col justify-between group relative">
                
                <div className="relative h-44 sm:h-48 w-full bg-gray-100 overflow-hidden">
                  <img 
                    src={pet.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60"} 
                    alt={pet.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60";
                    }}
                  />
                  <span className={`absolute top-3 right-3 px-3.5 py-1.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider z-10 shadow-sm border border-white/20 ${
                    isAdoptedStatus ? 'bg-slate-500 text-white' : 
                    isPendingStatus ? 'bg-[#fea619] text-white' : 
                    isRejectedStatus ? 'bg-rose-500 text-white' : 
                    'bg-[#00685f] text-white'
                  }`}>
                    {displayStatus}
                  </span>
                </div>

                <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                  <div className="mb-3">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 truncate">{pet.name || 'Pet'}</h2>
                    <p className="text-[10px] uppercase tracking-widest text-[#00685f] font-bold truncate">
                      {pet.species} • {pet.breed}
                    </p>
                  </div>

                  <div className="bg-[#f5faf8] border border-[#00685f]/10 rounded-xl p-3 mb-4 text-xs text-slate-600 space-y-2 flex-grow">
                    <p className="truncate"><strong className="text-slate-800">Age:</strong> {pet.age}</p>
                    <p className="truncate"><strong className="text-slate-800">Gender:</strong> {pet.gender}</p>
                    <p className="truncate"><strong className="text-slate-800">📍 Location:</strong> {pet.location}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-gray-400 font-medium">Adoption Fee:</span>
                      <span className="text-[#00685f] font-extrabold text-sm truncate pl-1">৳{pet.adoptionFee || '0'}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link href={`/all-pets/${pet._id}`} className="block w-full">
                      <button className="w-full bg-[#00685f] hover:bg-[#005049] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 text-xs cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {pets?.length === 0 && (
          <p className="text-center text-gray-500 text-base sm:text-lg mt-10 py-10 px-4">No pets found at this moment.</p>
        )}
      </div>
    </div>
  );
};

export default AllPetsPage;