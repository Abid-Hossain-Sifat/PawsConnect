import React from "react";
import { allPets } from "../lib/data";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const HomePets = async () => {
  const pets = await allPets();

  const featuredPets = pets ? pets.slice(0, 6) : [];

  return (
    <div className="bg-[#f5faf8] py-16">
      <div className="max-w-[80%] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Featured Companions
            </h2>
            <p className="text-sm text-gray-600">
              Meet the newest residents waiting for their forever family.
            </p>
          </div>
          <Link
            href="/all-pets"
            className="flex items-center gap-1 text-sm font-semibold text-[#00685f] hover:underline group"
          >
            View All Pets
            <ArrowRight
              size={16}
              className="transform transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPets.map((pet, index) => {
            const isPending = pet.status?.toLowerCase() === "pending";

            return (
              <div
                key={pet._id || index}
                className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
                  <img
                    src={
                      pet.image ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={pet.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide capitalize z-10 ${
                      isPending
                        ? "bg-[#fea619] text-white"
                        : "bg-[#00685f] text-white"
                    }`}
                  >
                    {pet.status || "Active"}
                  </span>

                  <button className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-xs transition-all z-10">
                    <Heart
                      size={18}
                      className="fill-none stroke-white stroke-[2.5]"
                    />
                  </button>
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-2xl font-bold text-slate-800">
                      {pet.name || "Pet"}
                    </h3>

                    <span className="bg-[#eef7f5] text-[#00685f] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#00685f]/10">
                      {pet.age || "Adult"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-5">
                    {pet.breed || pet.species} • {pet.location}
                  </p>

                  <button className="w-full bg-white hover:bg-[#00685f] hover:text-white hover:border-[#00685f] text-slate-800 font-semibold py-2.5 border border-gray-300 rounded-xl transition-all duration-300 text-sm shadow-xs">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {featuredPets.length === 0 && (
          <p className="text-center text-gray-500 text-lg py-10">
            No featured pets available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePets;
