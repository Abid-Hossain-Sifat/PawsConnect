import React from 'react';
import { allPets } from '../../lib/data'; 

const AllPetsPage = async () => {
  const pets = await allPets();

  return (
    <div className="bg-[#f5faf8] py-10">
      <div className="max-w-[80%] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Find Your Perfect <span className="text-[#00685f]">Companion</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our complete list of beautiful pets waiting for a loving home and a family to belong to.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets && pets.map((pet, index) => (
            <div key={pet._id || index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#00685f]/10">
              
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img 
                  src={pet.image || "https://via.placeholder.com/400x300?text=No+Image"} 
                  alt={pet.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-3 right-3 px-4 py-2 rounded-full font-semibold text-xs uppercase ${
                  pet.status?.toLowerCase() === 'available' ? 'bg-[#00685f] text-white' : 'bg-[#fea619] text-white'
                }`}>
                  {pet.status || 'Available'}
                </span>
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">{pet.name || 'Pet'}</h2>
                  <p className="text-xs uppercase tracking-widest text-[#00685f] font-semibold">
                    {pet.species} • {pet.breed}
                  </p>
                </div>

                <div className="bg-[#f5faf8] border border-[#00685f]/20 rounded-xl p-3 mb-4 text-sm text-gray-700 space-y-2 flex-grow">
                  <p><strong className="text-slate-900">Age:</strong> {pet.age}</p>
                  <p><strong className="text-slate-900">Gender:</strong> {pet.gender}</p>
                  <p className="truncate"><strong className="text-slate-900">📍 Location:</strong> {pet.location}</p>
                  <p className="text-[#00685f] font-bold pt-2">Fee: ${pet.adoptionFee || '0'}</p>
                </div>

                <div className="mt-auto">
                  <button className="w-full bg-[#00685f] hover:bg-[#005049] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {pets?.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10 py-10">No pets found at this moment.</p>
        )}
      </div>
    </div>
  );
};

export default AllPetsPage;