'use client'
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import ProtectedRoute from "@/Components/ProtectedRoute";
import { PetDetailSkeleton } from "@/Components/SkeletonLoader";
import {
  Heart,
  MapPin,
  ShieldCheck,
  Activity,
  Mail,
  User,
  MessageSquare,
  MailCheck,
  Loader2,
  FolderHeart,
  ExternalLink,
  Sparkles,
  Calendar,
} from "lucide-react";
import Link from "next/link";

const PetDetailsPage = ({ params }) => {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [userRequest, setUserRequest] = useState(null);
  const [adoptSubmitting, setAdoptSubmitting] = useState(false);
  const [adoptSuccess, setAdoptSuccess] = useState(false);

  useEffect(() => {
    const loadPetAndRequest = async () => {
      try {
        const resolvedParams = await params;
        const petId = resolvedParams.id;

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
        const response = await fetch(baseUrl);
        if (response.ok) {
          const data = await response.json();
          const foundPet = data.find((p) => p._id === petId);
          setPet(foundPet);

          if (session?.user?.email && foundPet) {
            const reqUrl = `${baseUrl.replace(/\/pets$/, "")}/adoption-requests?petId=${petId}&requesterEmail=${session.user.email}`;
            const reqResponse = await fetch(reqUrl);
            if (reqResponse.ok) {
              const reqData = await reqResponse.json();
              if (reqData && reqData.length > 0) {
                setHasApplied(true);
                setUserRequest(reqData[0]);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error loading pet details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPetAndRequest();
  }, [params, session, sessionPending]);

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setAdoptSubmitting(true);

    const form = e.target;
    const requestData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.image,
      ownerEmail: pet.email || pet.ownerEmail,
      requesterEmail: session?.user?.email,
      requesterName: form.name.value,
      pickupDate: form.pickupDate.value,
      whyAdopt: form.whyAdopt.value,
      status: "pending",
    };

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
      const apiUrl = `${baseUrl.replace(/\/pets$/, "")}/adoption-requests`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setAdoptSuccess(true);
        setHasApplied(true);
        setUserRequest({ status: "pending" });
      } else {
        const errData = await response.json();
        alert(errData.message || "Failed to submit adoption request.");
      }
    } catch (error) {
      console.error("Error submitting adoption request:", error);
      alert("Error connecting to server.");
    } finally {
      setAdoptSubmitting(false);
    }
  };

  if (loading || sessionPending) {
    return <PetDetailSkeleton />;
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-[#f5faf8] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          Pet Not Found!
        </h2>
        <p className="text-sm text-gray-600 mb-6 max-w-sm">
          The pet you are looking for does not exist or has been adopted.
        </p>
        <Link
          href="/all-pets"
          className="bg-[#00685f] text-white px-6 py-2.5 rounded-xl font-semibold shadow-xs text-sm"
        >
          Back to All Pets
        </Link>
      </div>
    );
  }

  const isOwner =
    session?.user?.email &&
    (session.user.email === pet.email || session.user.email === pet.ownerEmail);

  const displayedStatus = isOwner
    ? pet.status || "Available"
    : hasApplied
      ? userRequest?.status === "approved"
        ? "Adopted"
        : userRequest?.status === "rejected"
          ? "Rejected"
          : "Pending"
      : pet.status || "Available";
  const isPending = displayedStatus.toLowerCase() === "pending";
  const isPendingStatus = isPending;
  const isAdoptedStatus = (pet.status || "").toLowerCase() === "adopted";
  const isApprovedWinner = userRequest && userRequest.status === "approved";

  return (
    <div className="bg-[#f5faf8] min-h-screen py-6 md:py-12">
      <div className="w-full max-w-[92%] sm:max-w-[85%] lg:max-w-[80%] mx-auto">
        <div className="mb-6">
          <Link
            href="/all-pets"
            className="text-sm font-semibold text-[#00685f] hover:underline"
          >
            &larr; Back to All Pets
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 shadow-xs border border-gray-100 space-y-6">

            <div className="relative h-[250px] sm:h-[350px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-xs">
              <img
                src={
                  pet.image ||
                  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=60"
                }
                alt={pet.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=60";
                }}
              />

              <span
                className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide capitalize ${
                  isAdoptedStatus
                    ? "bg-slate-500 text-white"
                    : isPendingStatus
                      ? "bg-[#fea619] text-white"
                      : "bg-[#00685f] text-white"
                }`}
              >
                {displayedStatus}
              </span>

              <button className="absolute top-4 right-4 p-2.5 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-xs transition-all">
                <Heart
                  size={20}
                  className="fill-none stroke-white stroke-[2.5]"
                />
              </button>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 break-words">
                  {pet.name}
                </h1>
                <span className="self-start sm:self-center bg-[#eef7f5] text-[#00685f] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#00685f]/10">
                  {pet.species}
                </span>
              </div>

              <p className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                <MapPin size={16} className="text-[#00685f] flex-shrink-0" />
                <span className="truncate">{pet.location}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#f5faf8] p-3 rounded-xl border border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">
                  Breed
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                  {pet.breed}
                </p>
              </div>
              <div className="bg-[#f5faf8] p-3 rounded-xl border border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">
                  Age
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{pet.age}</p>
              </div>
              <div className="bg-[#f5faf8] p-3 rounded-xl border border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">
                  Gender
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{pet.gender}</p>
              </div>
              <div className="bg-[#f5faf8] p-3 rounded-xl border border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">
                  Adoption Fee
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#00685f] truncate">
                  ৳{pet.adoptionFee}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-2 rounded-xl border border-emerald-100 text-xs sm:text-sm font-semibold">
                <Activity size={16} className="flex-shrink-0" />
                <span className="truncate">Health: {pet.healthStatus || "Healthy"}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-2 rounded-xl border border-blue-100 text-xs sm:text-sm font-semibold">
                <ShieldCheck size={16} className="flex-shrink-0" />
                <span className="truncate">Vaccination: {pet.vaccinationStatus || "Vaccinated"}</span>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
                About {pet.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify sm:text-left">{pet.description}</p>
            </div>

            <div className="border-t border-gray-100 pt-5 flex items-center gap-3 overflow-hidden">
              <div className="h-10 w-10 bg-[#00685f]/10 rounded-full flex items-center justify-center text-[#00685f] flex-shrink-0">
                <Mail size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">
                  Contact Shelter
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700 truncate">
                  {pet.email || pet.ownerEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-6 w-full">
            {!session ? (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                  Sign In to Adopt
                </h2>
                <p className="text-xs text-gray-500 mb-6">
                  You need to be logged in to send an adoption request for{" "}
                  {pet.name}.
                </p>
                <Link
                  href="/log-in"
                  className="w-full block py-3.5 bg-[#00685f] hover:bg-[#005049] text-white font-bold rounded-xl text-sm transition-all text-center"
                >
                  Log In Now
                </Link>
              </div>
            ) : isOwner ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center">
                <div className="h-16 w-16 sm:h-20 sm:w-20 bg-teal-50 text-[#00685f] rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-teal-100 shadow-inner">
                  <FolderHeart size={30} className="sm:size-[36px]" />
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 sm:mb-3">
                  Your Listed Pet
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed mb-6 sm:mb-8">
                  You are the owner of{" "}
                  <strong className="text-slate-700">"{pet.name}"</strong>.
                  Since you listed this pet for adoption, you cannot submit an
                  adoption request for it.
                </p>

                <div className="w-full space-y-3">
                  <Link
                    href="/dashboard/my-listing"
                    className="w-full py-3.5 bg-[#00685f] hover:bg-[#005049] text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    Manage Listing
                    <ExternalLink size={16} />
                  </Link>

                  <Link
                    href="/all-pets"
                    className="w-full py-3 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all block"
                  >
                    View Other Pets
                  </Link>
                </div>
              </div>
            ) : isAdoptedStatus ? (
              isApprovedWinner ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md text-center flex flex-col items-center animate-fadeIn bg-gradient-to-b from-white to-emerald-50/20">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-emerald-100 shadow-inner">
                    <Sparkles size={30} className="animate-pulse sm:size-[36px]" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-emerald-700 mb-2 sm:mb-3">
                    You Got This Pet! 🎉
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-800/80 max-w-xs leading-relaxed mb-6 font-medium">
                    Congratulations! Your adoption request for{" "}
                    <strong className="text-slate-800 font-bold">
                      "{pet.name}"
                    </strong>{" "}
                    has been approved. You are now the proud owner of this
                    lovely companion!
                  </p>

                  <div className="bg-emerald-50/80 border border-emerald-100/50 rounded-2xl p-4 text-left w-full mb-6 text-xs space-y-2 overflow-hidden">
                    <p className="font-extrabold text-emerald-900 uppercase tracking-wider text-[9px] sm:text-[10px]">
                      Shelter Contact Details:
                    </p>
                    <p className="truncate">
                      <strong className="text-emerald-800">Email:</strong>{" "}
                      {pet.email || pet.ownerEmail}
                    </p>
                    <p className="truncate">
                      <strong className="text-emerald-800">Location:</strong>{" "}
                      {pet.location}
                    </p>
                  </div>

                  <Link
                    href="/all-pets"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all block text-center shadow-xs"
                  >
                    Browse More Companions
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-slate-200">
                    <Heart
                      size={30}
                      className="fill-slate-300 stroke-slate-400 sm:size-[36px]"
                    />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 sm:mb-3">
                    Already Adopted
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed mb-6">
                    We are happy to let you know that{" "}
                    <strong className="text-slate-700">"{pet.name}"</strong> has
                    already found a loving home and is adopted.
                  </p>

                  <Link
                    href="/all-pets"
                    className="w-full py-3.5 bg-[#00685f] hover:bg-[#005049] text-white font-bold rounded-xl text-xs transition-all block text-center"
                  >
                    Find Other Companions
                  </Link>
                </div>
              )
            ) : adoptSuccess ||
              (hasApplied && userRequest?.status === "pending") ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center animate-fadeIn">
                <div className="h-16 w-16 sm:h-20 sm:w-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-emerald-100 shadow-inner">
                  <ShieldCheck size={30} className="sm:size-[36px]" />
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 sm:mb-3">
                  Request Submitted!
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed mb-6">
                  Your adoption request for{" "}
                  <strong className="text-slate-700">"{pet.name}"</strong> has
                  been recorded. The pet status will appear as{" "}
                  <strong className="text-amber-600">"Pending"</strong> for you
                  while the owner reviews your request.
                </p>

                <Link
                  href="/all-pets"
                  className="w-full py-3.5 bg-[#00685f] hover:bg-[#005049] text-white font-bold rounded-xl text-xs transition-all block text-center"
                >
                  Back to All Pets
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 animate-fadeIn">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
                  Adopt {pet.name}
                </h2>
                <p className="text-xs text-gray-500 mb-6">
                  Please fill out this quick form to send an adoption request to
                  the shelter.
                </p>

                <form onSubmit={handleAdoptSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-2">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        name="name"
                        defaultValue={session?.user?.name || ""}
                        placeholder="John Doe"
                        required
                        disabled={isPending}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all disabled:cursor-not-allowed text-slate-800 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-2">
                      Your Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <MailCheck size={18} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={session?.user?.email || ""}
                        readOnly
                        placeholder="johndoe@example.com"
                        required
                        disabled={isPending}
                        className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm outline-none cursor-not-allowed select-none text-slate-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-2">
                      Preferred Pickup Date
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <Calendar size={18} />
                      </span>
                      <input
                        type="date"
                        name="pickupDate"
                        required
                        disabled={isPending}
                        onClick={(e) =>
                          e.target.showPicker && e.target.showPicker()
                        }
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all disabled:cursor-not-allowed text-slate-800 font-medium cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-2">
                      Why do you want to adopt?
                    </label>
                    <div className="relative">
                      <span className="absolute top-3 left-3.5 text-gray-400">
                        <MessageSquare size={18} />
                      </span>
                      <textarea
                        rows="4"
                        name="whyAdopt"
                        placeholder={`Tell us a bit about yourself and your home environment for ${pet.name}...`}
                        required
                        disabled={isPending}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all resize-none disabled:cursor-not-allowed text-slate-800 font-medium"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending || adoptSubmitting}
                    className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-xs mt-2 flex items-center justify-center gap-2 cursor-pointer ${
                      isPending
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#00685f] hover:bg-[#005049] text-white hover:shadow-md"
                    }`}
                  >
                    {adoptSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : isPending ? (
                      "Adoption Pending"
                    ) : (
                      `Submit Adoption Request`
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PetDetailsPageWrapper(props) {
  return (
    <ProtectedRoute>
      <PetDetailsPage {...props} />
    </ProtectedRoute>
  );
}