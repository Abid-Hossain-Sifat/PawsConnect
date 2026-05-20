import React from "react";
import { Star } from "lucide-react";

const Review = () => {
  return (
    <div className="bg-[#f5faf8] py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="w-full lg:max-w-[80%] mx-auto flex flex-col gap-10 md:gap-20 lg:gap-24 px-4 lg:px-0">
        
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2 md:gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-slate-900 tracking-tight">
            Happy Tails
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
            Real stories from real families who found their perfect match on
            PawsConnect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start justify-center pt-2 md:pt-6 pb-0 md:pb-12">
          
          <div className="relative bg-[#edf2f1] p-6 md:p-8 rounded-[24px] flex flex-col justify-between shadow-sm border border-transparent hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_25px_50px_-12px_rgba(0,104,95,0.08)] hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-500 ease-out cursor-pointer group min-h-[260px] md:min-h-[300px]">
            <span className="absolute top-2 md:top-4 right-6 md:right-8 text-[60px] md:text-[80px] font-serif font-black text-emerald-950/5 group-hover:text-[#00685f]/10 transition-colors duration-500 select-none leading-none">
              ”
            </span>

            <div className="flex flex-col gap-3 md:gap-4 relative z-10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#fea619]"
                    fill="#fea619"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-slate-700 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed italic pr-2 md:pr-4">
                "PawsConnect made finding Cooper so easy. The application
                process was transparent, and the support we received was
                incredible."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-6 mt-4 md:mt-6 border-t border-slate-200/50 relative z-10">
              <div className="h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center font-bold text-sm md:text-base shadow-sm shrink-0 uppercase tracking-wider bg-teal-100 text-teal-800">
                S
              </div>
              <div className="flex flex-col">
                <h3 className="text-slate-800 font-extrabold text-sm md:text-[15px] leading-tight">
                  Sarah Jenkins
                </h3>
                <p className="text-gray-500 text-[11px] md:text-xs font-semibold mt-0.5 md:mt-1">
                  Adopted Cooper (Beagle)
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-[#edf2f1] p-6 md:p-8 rounded-[24px] flex flex-col justify-between shadow-sm border border-transparent hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_25px_50px_-12px_rgba(0,104,95,0.08)] translate-y-0 md:translate-y-8 hover:translate-y-0 md:hover:translate-y-5 transition-all duration-500 ease-out cursor-pointer group min-h-[260px] md:min-h-[300px]">
            <span className="absolute top-2 md:top-4 right-6 md:right-8 text-[60px] md:text-[80px] font-serif font-black text-emerald-950/5 group-hover:text-[#00685f]/10 transition-colors duration-500 select-none leading-none">
              ”
            </span>

            <div className="flex flex-col gap-3 md:gap-4 relative z-10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#fea619]"
                    fill="#fea619"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-slate-700 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed italic pr-2 md:pr-4">
                "Luna has completely changed our lives. The platform's vetting
                process gave us peace of mind knowing she was healthy and ready
                for her home."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-6 mt-4 md:mt-6 border-t border-slate-200/50 relative z-10">
              <div className="h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center font-bold text-sm md:text-base shadow-sm shrink-0 uppercase tracking-wider bg-amber-100 text-amber-800">
                D
              </div>
              <div className="flex flex-col">
                <h3 className="text-slate-800 font-extrabold text-sm md:text-[15px] leading-tight">
                  David Chen
                </h3>
                <p className="text-gray-500 text-[11px] md:text-xs font-semibold mt-0.5 md:mt-1">
                  Adopted Luna (Cat)
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-[#edf2f1] p-6 md:p-8 rounded-[24px] flex flex-col justify-between shadow-sm border border-transparent hover:border-[#00685f]/20 hover:bg-white hover:shadow-[0_25px_50px_-12px_rgba(0,104,95,0.08)] hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-500 ease-out cursor-pointer group min-h-[260px] md:min-h-[300px]">
            <span className="absolute top-2 md:top-4 right-6 md:right-8 text-[60px] md:text-[80px] font-serif font-black text-emerald-950/5 group-hover:text-[#00685f]/10 transition-colors duration-500 select-none leading-none">
              ”
            </span>

            <div className="flex flex-col gap-3 md:gap-4 relative z-10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#fea619]"
                    fill="#fea619"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-slate-700 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed italic pr-2 md:pr-4">
                "The best decision we've ever made. PawsConnect is modern,
                professional, and truly cares about the animals they place."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-6 mt-4 md:mt-6 border-t border-slate-200/50 relative z-10">
              <div className="h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center font-bold text-sm md:text-base shadow-sm shrink-0 uppercase tracking-wider bg-indigo-100 text-indigo-800">
                E
              </div>
              <div className="flex flex-col">
                <h3 className="text-slate-800 font-extrabold text-sm md:text-[15px] leading-tight">
                  Emily Watson
                </h3>
                <p className="text-gray-500 text-[11px] md:text-xs font-semibold mt-0.5 md:mt-1">
                  Adopted Daisy (Greyhound)
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Review;