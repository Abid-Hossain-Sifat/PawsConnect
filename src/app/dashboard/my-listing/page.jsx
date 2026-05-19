"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { 
  ListOrdered, 
  PlusCircle, 
  FolderOpen, 
  Trash2, 
  MapPin, 
  HeartPulse, 
  Activity, 
  ShieldCheck, 
  Loader2,
  Pencil,
  X,
  AlertTriangle,
  HelpCircle,
  Tag,
  Dog,
  Layers,
  Calendar,
  UserCheck,
  Image,
  ShieldAlert,
  Mail,
  CircleDollarSign,
  FileText,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

const DashListPage = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [petToEdit, setPetToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);

  // Adoption Requests Modal States
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [selectedPetForRequests, setSelectedPetForRequests] = useState(null);
  const [petRequests, setPetRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Approve & Reject Confirm Modals
  const [showApproveConfirmModal, setShowApproveConfirmModal] = useState(false);
  const [requestToApprove, setRequestToApprove] = useState(null);
  
  const [showRejectConfirmModal, setShowRejectConfirmModal] = useState(false);
  const [requestToReject, setRequestToReject] = useState(null);

  // Delete Request Confirm Modals
  const [showRequestDeleteConfirm, setShowRequestDeleteConfirm] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  const fetchMyListings = async (email) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
      const apiUrl = `${baseUrl}?email=${email}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setPets(data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchMyListings(session.user.email);
    } else if (!sessionPending && !session) {
      setIsLoading(false);
    }
  }, [session, sessionPending]);

  // Open delete confirmation modal
  const triggerDelete = (pet) => {
    setPetToDelete(pet);
    setShowDeleteModal(true);
  };

  // Perform delete in MongoDB
  const confirmDelete = async () => {
    if (!petToDelete) return;
    
    const id = petToDelete._id;
    setDeletingId(id);
    setShowDeleteModal(false);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
      const apiUrl = `${baseUrl}/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        setPets(pets.filter((pet) => pet._id !== id));
      } else {
        alert("Failed to delete the listing.");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Error connecting to server.");
    } finally {
      setDeletingId(null);
      setPetToDelete(null);
    }
  };

  // Open edit modal and load form data
  const triggerEdit = (pet) => {
    setPetToEdit(pet);
    setEditFormData({ ...pet });
    setShowEditModal(true);
  };

  // Handle edit form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === "adoptionFee" ? parseFloat(value) || 0 : value
    });
  };

  // Trigger update confirmation modal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowUpdateConfirmModal(true);
  };

  // Perform update in MongoDB
  const confirmUpdate = async () => {
    if (!petToEdit || !editFormData) return;
    
    const id = petToEdit._id;
    setUpdatingId(id);
    setShowUpdateConfirmModal(false);
    setShowEditModal(false);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
      const apiUrl = `${baseUrl}/${id}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        // Update client state instantly
        setPets(pets.map((pet) => (pet._id === id ? { ...pet, ...editFormData } : pet)));
      } else {
        alert("Failed to update the listing.");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      alert("Error connecting to server.");
    } finally {
      setUpdatingId(null);
      setPetToEdit(null);
    }
  };

  // Trigger Adoption Requests Modal for clicked Card
  const triggerRequestsModal = async (pet) => {
    setSelectedPetForRequests(pet);
    setShowRequestsModal(true);
    setLoadingRequests(true);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
      const apiUrl = `${baseUrl.replace(/\/pets$/, '')}/adoption-requests?petId=${pet._id}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setPetRequests(data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoadingRequests(false);
    }
  };

  // Trigger Approve Request Confirm Modal
  const triggerApproveRequest = (request) => {
    setRequestToApprove(request);
    setShowApproveConfirmModal(true);
  };

  // Perform Request Approval in MongoDB
  const confirmApproveRequest = async () => {
    if (!requestToApprove) return;
    
    const id = requestToApprove._id;
    setShowApproveConfirmModal(false);
    setLoadingRequests(true);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
      const apiUrl = `${baseUrl.replace(/\/pets$/, '')}/adoption-requests/${id}/approve`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (response.ok) {
        // Local UI State updates:
        // 1. Mark this request as approved, others for this pet as rejected
        setPetRequests(petRequests.map((req) => {
          if (req._id === id) return { ...req, status: 'approved' };
          return { ...req, status: 'rejected' };
        }));
        
        // 2. Mark this pet as 'Adopted' in local listings state
        setPets(pets.map((pet) => {
          if (pet._id === selectedPetForRequests._id) return { ...pet, status: 'Adopted' };
          return pet;
        }));
        
        // 3. Update currently selected pet's status representation
        setSelectedPetForRequests({ ...selectedPetForRequests, status: 'Adopted' });
      } else {
        alert("Failed to approve adoption request.");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Error connecting to server.");
    } finally {
      setLoadingRequests(false);
      setRequestToApprove(null);
    }
  };

  // Trigger Reject Request Confirm Modal
  const triggerRejectRequest = (request) => {
    setRequestToReject(request);
    setShowRejectConfirmModal(true);
  };

  // Perform Request Rejection in MongoDB
  const confirmRejectRequest = async () => {
    if (!requestToReject) return;
    
    const id = requestToReject._id;
    setShowRejectConfirmModal(false);
    setLoadingRequests(true);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
      const apiUrl = `${baseUrl.replace(/\/pets$/, '')}/adoption-requests/${id}/reject`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (response.ok) {
        // Mark request as rejected locally
        setPetRequests(petRequests.map((req) => (req._id === id ? { ...req, status: 'rejected' } : req)));
      } else {
        alert("Failed to reject request.");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Error connecting to server.");
    } finally {
      setLoadingRequests(false);
      setRequestToReject(null);
    }
  };

  // Trigger Delete Request Confirmation Modal
  const triggerDeleteRequest = (request) => {
    setRequestToDelete(request);
    setShowRequestDeleteConfirm(true);
  };

  // Perform Request Deletion in MongoDB
  const confirmDeleteRequest = async () => {
    if (!requestToDelete) return;
    
    const id = requestToDelete._id;
    setShowRequestDeleteConfirm(false);
    setLoadingRequests(true);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2006/pets";
      const apiUrl = `${baseUrl.replace(/\/pets$/, '')}/adoption-requests/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Filter out deleted request locally
        setPetRequests(petRequests.filter((req) => req._id !== id));
      } else {
        alert("Failed to delete adoption request.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Error connecting to server.");
    } finally {
      setLoadingRequests(false);
      setRequestToDelete(null);
    }
  };

  if (sessionPending || isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#00685f]/10 text-[#00685f] rounded-xl flex items-center justify-center">
              <ListOrdered size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800">My Listings</h1>
              <p className="text-xs text-gray-400">Loading your pet listings...</p>
            </div>
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs animate-pulse">
              <div className="h-48 w-full bg-slate-100"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-200 rounded-md w-1/3"></div>
                <div className="h-6 bg-slate-200 rounded-md w-2/3"></div>
                <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                <div className="h-8 bg-slate-200 rounded-md w-1/2 pt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-xs flex flex-col items-center justify-center text-center min-h-[400px]">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h3>
        <p className="text-sm text-gray-400 max-w-sm mb-6">Please log in to view your listings.</p>
        <Link href="/log-in" className="bg-[#00685f] hover:bg-[#005049] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-xs">
          Log In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#00685f]/10 text-[#00685f] rounded-xl flex items-center justify-center">
            <ListOrdered size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              My Listings
            </h1>
            <p className="text-xs text-gray-400">
              Manage and track all the pets you have posted for adoption. Click a card to view adoption requests!
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/add-pet"
          className="bg-[#00685f] hover:bg-[#005049] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all flex items-center gap-2 shadow-xs self-start sm:self-auto"
        >
          <PlusCircle size={18} />
          Add New Pet
        </Link>
      </div>

      {pets.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-xs flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="h-20 w-20 bg-[#f5faf8] rounded-full flex items-center justify-center text-gray-400 mb-6 border border-dashed border-[#00685f]/20">
            <FolderOpen size={36} className="text-[#00685f]/60" />
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">
            No Pets Listed Yet
          </h3>
          <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
            It looks like you haven't published any pet listings yet. Start by
            adding a pet to find them a loving home!
          </p>

          <Link
            href="/dashboard/add-pet"
            className="border-2 border-[#00685f] text-[#00685f] hover:bg-[#00685f] hover:text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300"
          >
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {pets.map((pet) => (
            <div 
              key={pet._id} 
              onClick={() => triggerRequestsModal(pet)}
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-teal-500/20 transition-all duration-300 flex flex-col group relative cursor-pointer"
              title="Click to view adoption requests"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60";
                  }}
                />
                
                {/* Status Badge */}
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm z-10 
                  ${pet.status === "Available" ? "bg-teal-50 text-teal-700 border border-teal-200/50" : 
                    pet.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200/50" : 
                    "bg-slate-50 text-slate-600 border border-slate-200/50"}`}
                >
                  {pet.status || "Available"}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block mb-1">
                    {pet.species} &bull; {pet.breed}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-800 mb-2 truncate">
                    {pet.name}
                  </h3>
                  
                  <div className="flex gap-4 text-xs text-slate-500 mb-4 font-medium">
                    <span>Age: <strong className="text-slate-700">{pet.age}</strong></span>
                    <span>Gender: <strong className="text-slate-700">{pet.gender}</strong></span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin size={14} className="text-teal-600" />
                      <span>{pet.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <HeartPulse size={14} className="text-teal-600" />
                      <span>Health: <strong className="text-slate-700 font-semibold">{pet.healthStatus}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Adoption Fee</span>
                    <span className="text-sm font-extrabold text-slate-800">
                      {pet.adoptionFee > 0 ? `৳ ${pet.adoptionFee}` : "Free"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerEdit(pet);
                      }}
                      disabled={updatingId === pet._id}
                      className="h-10 w-10 bg-teal-50 hover:bg-teal-100 text-[#00685f] border border-teal-100 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none"
                      title="Edit Details"
                    >
                      {updatingId === pet._id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Pencil size={16} />
                      )}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerDelete(pet);
                      }}
                      disabled={deletingId === pet._id}
                      className="h-10 w-10 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none"
                      title="Delete Listing"
                    >
                      {deletingId === pet._id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================== 🗑️ CUSTOM DELETE MODAL ==================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-gray-100 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={32} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Pet Listing</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-slate-700">"{petToDelete?.name}"</strong>? This action is permanent and cannot be undone.
            </p>
            
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPetToDelete(null);
                }}
                className="flex-1 py-3 px-4 border border-gray-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md hover:shadow-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 📝 CUSTOM EDIT MODAL ==================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl border border-gray-100 relative">
            
            <button 
              onClick={() => {
                setShowEditModal(false);
                setPetToEdit(null);
              }}
              className="absolute top-5 right-5 h-8 w-8 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
              <div className="h-10 w-10 bg-[#00685f]/10 text-[#00685f] rounded-xl flex items-center justify-center">
                <Pencil size={20} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-800">Edit Pet Details</h3>
                <p className="text-xs text-gray-400">Modify the fields below to update pet listings.</p>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Pet Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Tag size={16} /></span>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Species</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Dog size={16} /></span>
                    <select
                      name="species"
                      value={editFormData.species || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium appearance-none"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Breed</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Layers size={16} /></span>
                    <input
                      type="text"
                      name="breed"
                      value={editFormData.breed || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Age</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Calendar size={16} /></span>
                    <input
                      type="text"
                      name="age"
                      value={editFormData.age || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Gender</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><UserCheck size={16} /></span>
                    <select
                      name="gender"
                      value={editFormData.gender || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium appearance-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Image URL</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Image size={16} /></span>
                    <input
                      type="url"
                      name="image"
                      value={editFormData.image || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Health Status</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><HeartPulse size={16} /></span>
                    <input
                      type="text"
                      name="healthStatus"
                      value={editFormData.healthStatus || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Vaccination Status</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><ShieldAlert size={16} /></span>
                    <select
                      name="vaccinationStatus"
                      value={editFormData.vaccinationStatus || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium appearance-none"
                    >
                      <option value="Vaccinated">Vaccinated</option>
                      <option value="Not Vaccinated">Not Vaccinated</option>
                      <option value="Partially Vaccinated">Partially Vaccinated</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Location</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><MapPin size={16} /></span>
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Adoption Fee (৳)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 font-bold text-gray-400 text-sm">৳</span>
                    <input
                      type="number"
                      name="adoptionFee"
                      value={editFormData.adoptionFee || 0}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Owner Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Mail size={16} /></span>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email || ""}
                      readOnly
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none cursor-not-allowed select-none text-slate-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Status</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Activity size={16} /></span>
                    <select
                      name="status"
                      value={editFormData.status || "Available"}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all text-slate-800 font-medium appearance-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Pending">Pending</option>
                      <option value="Adopted">Adopted</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Description</label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-gray-400"><FileText size={16} /></span>
                  <textarea
                    rows="3"
                    name="description"
                    value={editFormData.description || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#00685f] focus:bg-white transition-all resize-none text-slate-800 font-medium"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setPetToEdit(null);
                  }}
                  className="py-2.5 px-6 border border-gray-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#00685f] hover:bg-[#005049] text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center gap-1.5"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== ❓ CUSTOM UPDATE CONFIRMATION MODAL ==================== */}
      {showUpdateConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn animate-scaleUp">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-gray-100 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-teal-50 text-[#00685f] rounded-full flex items-center justify-center mb-4">
              <HelpCircle size={32} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">Update Pet Details</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Are you sure you want to save the changes and update the details of <strong className="text-slate-700">"{petToEdit?.name}"</strong>?
            </p>
            
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowUpdateConfirmModal(false)}
                className="flex-1 py-3 px-4 border border-gray-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="flex-1 py-3 px-4 bg-[#00685f] hover:bg-[#005049] text-white font-bold rounded-xl text-sm transition-colors shadow-md hover:shadow-lg"
              >
                Yes, Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 📬 ADOPTION REQUESTS MODAL (CLICK ON CARD) ==================== */}
      {showRequestsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-40 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl border border-gray-100 relative">
            
            <button 
              onClick={() => {
                setShowRequestsModal(false);
                setSelectedPetForRequests(null);
                setPetRequests([]);
              }}
              className="absolute top-5 right-5 h-8 w-8 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
              <div className="h-10 w-10 bg-[#00685f]/10 text-[#00685f] rounded-xl flex items-center justify-center">
                <FolderOpen size={20} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-800">Adoption Requests</h3>
                <p className="text-xs text-gray-400">Review adoption requests for <strong className="text-slate-600">"{selectedPetForRequests?.name}"</strong></p>
              </div>
            </div>

            {loadingRequests ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="animate-spin text-[#00685f] mb-3" size={32} />
                <p className="text-sm text-slate-500 font-medium">Fetching requests...</p>
              </div>
            ) : petRequests.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="h-16 w-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">No Requests Yet</h4>
                <p className="text-xs text-gray-400 max-w-xs">There are no adoption requests submitted for this pet listing yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {petRequests.map((request) => (
                  <div 
                    key={request._id} 
                    className={`border rounded-2xl p-5 transition-all duration-300 relative ${
                      request.status === 'approved' ? 'border-emerald-200 bg-emerald-50/20' : 
                      request.status === 'rejected' ? 'border-slate-100 bg-slate-50/30 opacity-75' : 
                      'border-gray-100 bg-white hover:border-teal-500/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center font-bold text-sm">
                              {request.requesterName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-800">{request.requesterName}</h4>
                              <span className="text-[10px] text-slate-400 font-medium block sm:inline">{request.requesterEmail}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => triggerDeleteRequest(request)}
                            className="h-8 w-8 text-rose-500 hover:bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center transition-all focus:outline-none"
                            title="Delete Adoption Request"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600">
                          <p className="flex items-center gap-1.5">
                            <Phone size={14} className="text-[#00685f]" />
                            <span>Phone: <strong>{request.requesterPhone}</strong></span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Clock size={14} className="text-[#00685f]" />
                            <span>Request Status: 
                              <strong className={`ml-1 capitalize ${
                                request.status === 'approved' ? 'text-emerald-600' :
                                request.status === 'rejected' ? 'text-rose-600' : 'text-amber-600'
                              }`}>
                                {request.status}
                              </strong>
                            </span>
                          </p>
                        </div>

                        <div className="bg-slate-50/50 rounded-xl p-3.5 border border-slate-100 mt-2">
                          <span className="text-[9px] uppercase font-extrabold text-gray-400 tracking-wider flex items-center gap-1 mb-1">
                            <MessageSquare size={10} /> Why they want to adopt:
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed italic">
                            "{request.whyAdopt}"
                          </p>
                        </div>
                      </div>

                      {/* Request Action Buttons */}
                      {request.status === 'pending' && (
                        <div className="flex sm:flex-col gap-2 self-end sm:self-start w-full sm:w-auto">
                          <button
                            onClick={() => triggerApproveRequest(request)}
                            className="flex-1 sm:flex-none py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 size={14} /> Approve
                          </button>
                          <button
                            onClick={() => triggerRejectRequest(request)}
                            className="flex-1 sm:flex-none py-2 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      )}

                      {request.status === 'approved' && (
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 self-start">
                          <CheckCircle2 size={14} /> Approved & Adopted
                        </span>
                      )}

                      {request.status === 'rejected' && (
                        <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 self-start">
                          <XCircle size={14} /> Rejected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== ❓ CUSTOM APPROVE CONFIRMATION MODAL ==================== */}
      {showApproveConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn animate-scaleUp">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-gray-100 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">Approve Request</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Are you sure you want to approve the adoption request from <strong className="text-slate-700">"{requestToApprove?.requesterName}"</strong>? 
              <br />
              <span className="text-rose-600 text-xs font-bold block mt-2">
                ⚠️ All other requests for this pet will be rejected and this pet will be marked as Adopted!
              </span>
            </p>
            
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowApproveConfirmModal(false);
                  setRequestToApprove(null);
                }}
                className="flex-1 py-3 px-4 border border-gray-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmApproveRequest}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md hover:shadow-lg"
              >
                Yes, Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ❌ CUSTOM REJECT CONFIRMATION MODAL ==================== */}
      {showRejectConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn animate-scaleUp">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-gray-100 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
              <XCircle size={32} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">Reject Request</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Are you sure you want to reject the adoption request from <strong className="text-slate-700">"{requestToReject?.requesterName}"</strong>?
            </p>
            
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowRejectConfirmModal(false);
                  setRequestToReject(null);
                }}
                className="flex-1 py-3 px-4 border border-gray-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmRejectRequest}
                className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md hover:shadow-lg"
              >
                Yes, Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 🗑️ CUSTOM REQUEST DELETE CONFIRMATION MODAL ==================== */}
      {showRequestDeleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn animate-scaleUp">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-gray-100 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
              <Trash2 size={32} className="text-rose-600" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Adoption Request</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Are you sure you want to delete the adoption request from <strong className="text-slate-700">"{requestToDelete?.requesterName}"</strong>? This will permanently remove the request.
            </p>
            
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowRequestDeleteConfirm(false);
                  setRequestToDelete(null);
                }}
                className="flex-1 py-3 px-4 border border-gray-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmDeleteRequest}
                className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md hover:shadow-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashListPage;
