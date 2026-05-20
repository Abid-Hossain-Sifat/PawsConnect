import React from "react";
import { Heart, ShieldPlus, BadgeCheck, PiggyBank } from "lucide-react";

const WhyAdopt = () => {
  return (
    <div className="bg-[#f5faf8] py-12 md:py-20 lg:py-24">
      <div className="w-full lg:max-w-[80%] mx-auto px-4 lg:px-0 flex flex-col gap-10 md:gap-16">
        
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2 md:gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Why Adopt a <span className="text-[#00685f]">Pet?</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
            Adoption isn't just about giving a pet a home—it's about the
            transformation of a life and the start of an unbreakable bond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch justify-center">
          
          <div className="bg-[#edf2f1] p-6 sm:p-8 rounded-[24px] flex flex-col items-center text-center shadow-sm border border-transparent hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,104,95,0.06)] hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <div className="text-[#00685f] mb-4 transition-transform duration-300 group-hover:scale-110">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-800 font-extrabold text-[16px] sm:text-[18px] mb-2 sm:mb-3 tracking-tight">
              Save a Life
            </h3>
            <p className="text-gray-600 text-xs sm:text-[14px] font-medium leading-relaxed">
              Every year, thousands of pets wait for a chance at a second life in
              a loving home.
            </p>
          </div>

          <div className="bg-[#edf2f1] p-6 sm:p-8 rounded-[24px] flex flex-col items-center text-center shadow-sm border border-transparent hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,104,95,0.06)] hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <div className="text-[#00685f] mb-4 transition-transform duration-300 group-hover:scale-110">
              <ShieldPlus className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-800 font-extrabold text-[16px] sm:text-[18px] mb-2 sm:mb-3 tracking-tight">
              Better Health
            </h3>
            <p className="text-gray-600 text-xs sm:text-[14px] font-medium leading-relaxed">
              Pets reduce stress, lower blood pressure, and keep you physically active and engaged.
            </p>
          </div>

          <div className="bg-[#edf2f1] p-6 sm:p-8 rounded-[24px] flex flex-col items-center text-center shadow-sm border border-transparent hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,104,95,0.06)] hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <div className="text-[#00685f] mb-4 transition-transform duration-300 group-hover:scale-110">
              <BadgeCheck className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-800 font-extrabold text-[16px] sm:text-[18px] mb-2 sm:mb-3 tracking-tight">
              Fully Vetted
            </h3>
            <p className="text-gray-600 text-xs sm:text-[14px] font-medium leading-relaxed">
              Our adoption partners ensure all pets are healthy, vaccinated, and microchipped.
            </p>
          </div>

          <div className="bg-[#edf2f1] p-6 sm:p-8 rounded-[24px] flex flex-col items-center text-center shadow-sm border border-transparent hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,104,95,0.06)] hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <div className="text-[#00685f] mb-4 transition-transform duration-300 group-hover:scale-110">
              <PiggyBank className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-800 font-extrabold text-[16px] sm:text-[18px] mb-2 sm:mb-3 tracking-tight">
              Cost Effective
            </h3>
            <p className="text-gray-600 text-xs sm:text-[14px] font-medium leading-relaxed">
              Adoption fees are significantly lower than purchasing from breeders or pet stores.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyAdopt;