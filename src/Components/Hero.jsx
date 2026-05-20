import Image from "next/image";
import React from "react";
import HeroImg from "../../public/Assets/heroimg.png";
import { PawPrint } from "lucide-react";

const Hero = () => {
  return (
    <div className="py-12 md:py-20 bg-[#f5faf8]">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full lg:max-w-[80%] mx-auto px-6 lg:px-0 gap-12 lg:gap-6">
        <div className="flex flex-col space-y-4 md:space-y-6 max-w-xl text-center lg:text-left items-center lg:items-start">
          <h1 className="text-[32px] sm:text-[38px] md:text-[44px] font-extrabold text-slate-900 leading-[1.15] md:leading-[1.1] tracking-tight">
            Connecting <br className="hidden sm:inline" />
            <span className="text-[#00685f]">Compassionate Hearts</span> <br />
            with Paws
          </h1>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
            Find your perfect companion through our streamlined, ethical
            adoption platform. We bridge the gap between local shelters and
            loving forever homes with a modern, data-driven approach.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <button className="bg-[#00685f] hover:bg-[#005049] text-white px-6 py-3 font-semibold rounded-2xl shadow-sm transition-all duration-300 w-full sm:w-auto">
              Adopt Now
            </button>
            <button className="border-2 border-[#00685f]/30 text-[#00685f] hover:bg-[#00685f]/5 px-6 py-3 font-semibold rounded-2xl transition-all duration-300 w-full sm:w-auto">
              Our Process
            </button>
          </div>
        </div>

        <div className="relative inline-block group cursor-pointer perspective-1000 mt-6 lg:mt-0">
          <div className="overflow-hidden rounded-[24px] md:rounded-[32px] shadow-lg transition-all duration-500 ease-out transform group-hover:rotate-0 rotate-3 group-hover:scale-102 origin-bottom-right">
            <Image
              src={HeroImg}
              alt="Buddy Dog"
              className="w-full h-auto max-w-[320px] sm:max-w-[400px] md:max-w-[450px] object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border border-white/40 flex flex-col gap-3 min-w-[200px] sm:min-w-[240px] transition-all duration-500 ease-out transform group-hover:translate-x-1 group-hover:translate-y-1">
            <div className="flex items-center gap-3">
              <div className="bg-[#fea619] h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                <PawPrint className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-slate-800 font-extrabold text-[14px] sm:text-[16px] leading-tight">
                  Buddy
                </h3>
                <p className="text-slate-600 text-[11px] sm:text-xs font-semibold mt-0.5 whitespace-nowrap">
                  Golden Retriever - 2 years
                </p>
              </div>
            </div>
            <div className="pt-1">
              <button className="bg-[#00685f] text-white text-[13px] sm:text-[14px] font-semibold px-4 py-2 rounded-xl w-full text-center hover:bg-[#005049] transition-all duration-300 shadow-sm">
                Available
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
