import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProtectedRouteSkeleton = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#f5faf8]">
    <div className="flex flex-col items-center gap-4">
      <Skeleton circle height={40} width={40} baseColor="#eef7f5" highlightColor="#d6f0ee" />
      <Skeleton width={200} height={20} baseColor="#eef7f5" highlightColor="#d6f0ee" />
    </div>
  </div>
);

export const PetCardSkeleton = () => (
  <SkeletonTheme baseColor="#eef7f5" highlightColor="#d6f0ee">
    <div className="bg-white rounded-2xl shadow-xs border border-slate-100 overflow-hidden">
      <Skeleton height={200} />
      <div className="p-4 space-y-3">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" />
        <Skeleton height={15} count={2} />
        <div className="flex gap-2 pt-2">
          <Skeleton height={30} width="50%" />
          <Skeleton height={30} width="50%" />
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

export const PetDetailSkeleton = () => (
  <SkeletonTheme baseColor="#eef7f5" highlightColor="#d6f0ee">
    <div className="bg-[#f5faf8] min-h-screen py-6 md:py-12">
      <div className="w-full max-w-[92%] sm:max-w-[85%] lg:max-w-[80%] mx-auto">
        <div className="mb-6">
          <Skeleton width={150} height={20} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7">
            <Skeleton height={400} className="rounded-3xl mb-6" />
            <Skeleton count={3} height={20} width="90%" className="mb-4" />
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={80} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Skeleton height={300} className="rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

export const AllPetsSkeleton = () => (
  <SkeletonTheme baseColor="#eef7f5" highlightColor="#d6f0ee">
    <div className="bg-[#f5faf8] min-h-screen py-8 md:py-12">
      <div className="w-full max-w-[94%] sm:max-w-[90%] lg:max-w-[85%] mx-auto">
        <div className="mb-8">
          <Skeleton height={32} width="40%" className="mb-2" />
          <Skeleton height={16} width="60%" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <PetCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </SkeletonTheme>
);
