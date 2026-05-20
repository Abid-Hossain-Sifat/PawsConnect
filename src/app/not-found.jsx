import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F4F6F6] flex flex-col items-center justify-center text-[#1E293B] px-4 relative overflow-hidden">
      
      {/* Background Soft Teal Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-gradient-to-tr from-[#00594C] to-[#0A8573] opacity-10 blur-[130px] rounded-full pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="text-center z-10 max-w-sm md:max-w-md lg:max-w-lg w-full px-2">
        
        {/* PawsConnect Inspired 404 Text */}
        <h1 className="text-8xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-[#00594C] via-[#0A8573] to-[#00594C] bg-clip-text text-transparent animate-pulse select-none">
          404
        </h1>

        {/* Brand Theme Paw/Line Divider */}
        <div className="h-1.5 w-16 bg-gradient-to-r from-[#00594C] to-[#0A8573] mx-auto my-5 rounded-full"></div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-[#00594C]">
          Looks Like a Lost Paw!
        </h2>
        
        <p className="text-[#475569] text-sm md:text-base mb-8 leading-relaxed max-w-xs md:max-w-none mx-auto">
          The companion page you are looking for has wandered off or is temporarily unavailable. Let's get you back to safety!
        </p>

        {/* PawsConnect Signature Teal Button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto text-center px-8 py-3.5 font-bold text-white rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,89,76,0.3)] bg-[#00594C] hover:bg-[#004238]"
          >
            Back to Home
          </Link>
          
          <Link
            href="/all-pets"
            className="w-full sm:w-auto text-center px-8 py-3.5 font-bold text-[#00594C] rounded-xl border-2 border-[#00594C] transition-all duration-300 hover:bg-[#00594C] hover:text-white"
          >
            See Pets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;