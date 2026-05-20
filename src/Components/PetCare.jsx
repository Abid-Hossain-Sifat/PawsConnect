import React from "react";
import { Bone, Activity, Stethoscope, HeartHandshake } from "lucide-react";

const PetCare = () => {
  return (
    <div className="bg-[#dee4e1] py-12 md:py-20 lg:py-24">
      <div className="w-full max-w-[90%] md:max-w-[80%] mx-auto flex flex-col gap-10 md:gap-16 px-2 sm:px-4 md:px-0">
        <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-2.5 md:gap-3">
          <span className="bg-[#fea619]/10 text-amber-700 font-extrabold text-[10px] md:text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-amber-600/10">
            Expert Advice
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-slate-900 tracking-tight mt-1">
            Pet Care Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch justify-center">
          <div className="bg-[#f5faf8] p-6 md:p-7 rounded-[24px] flex flex-col gap-4 shadow-sm border border-slate-200/40 hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,104,95,0.05)] hover:-translate-y-1.5 md:hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <div className="text-red-500 bg-red-50 h-11 w-11 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Bone className="w-5 h-5" strokeWidth={2.5} />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <h3 className="text-slate-800 font-extrabold text-[16px] md:text-[17px] tracking-tight">
                Balanced Nutrition
              </h3>
              <p className="text-gray-600 text-[13px] md:text-[13.5px] font-medium leading-relaxed">
                Feed species-appropriate, vet-recommended food. Avoid table
                scraps and toxic human foods like onions, grapes, and chocolate.
              </p>
            </div>
          </div>

          <div className="bg-[#f5faf8] p-6 md:p-7 rounded-[24px] flex flex-col gap-4 shadow-sm border border-slate-200/40 hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,104,95,0.05)] hover:-translate-y-1.5 md:hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <div className="text-amber-500 bg-amber-50 h-11 w-11 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Activity className="w-5 h-5" strokeWidth={2.5} />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <h3 className="text-slate-800 font-extrabold text-[16px] md:text-[17px] tracking-tight">
                Daily Exercise
              </h3>
              <p className="text-gray-600 text-[13px] md:text-[13.5px] font-medium leading-relaxed">
                Dogs need at least 30–60 minutes of exercise daily. Cats benefit
                from interactive play sessions to stay mentally stimulated.
              </p>
            </div>
          </div>

          <div className="bg-[#f5faf8] p-6 md:p-7 rounded-[24px] flex flex-col gap-4 shadow-sm border border-slate-200/40 hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,104,95,0.05)] hover:-translate-y-1.5 md:hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <div className="text-blue-500 bg-blue-50 h-11 w-11 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Stethoscope className="w-5 h-5" strokeWidth={2.5} />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <h3 className="text-slate-800 font-extrabold text-[16px] md:text-[17px] tracking-tight">
                Regular Vet Visits
              </h3>
              <p className="text-gray-600 text-[13px] md:text-[13.5px] font-medium leading-relaxed">
                Schedule annual wellness checkups and stay current on all
                vaccinations and parasite prevention treatments.
              </p>
            </div>
          </div>

          <div className="bg-[#f5faf8] p-6 md:p-7 rounded-[24px] flex flex-col gap-4 shadow-sm border border-slate-200/40 hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,104,95,0.05)] hover:-translate-y-1.5 md:hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <div className="text-pink-500 bg-pink-50 h-11 w-11 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110">
              <HeartHandshake className="w-5 h-5" strokeWidth={2.5} />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <h3 className="text-slate-800 font-extrabold text-[16px] md:text-[17px] tracking-tight">
                Love & Socialization
              </h3>
              <p className="text-gray-600 text-[13px] md:text-[13.5px] font-medium leading-relaxed">
                Spend quality time daily. Expose pets to various people and
                environments early to build confidence and healthy behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCare;
