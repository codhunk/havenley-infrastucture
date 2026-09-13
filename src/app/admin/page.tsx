"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "inquiries" | "bookings" | "subscribers">("inquiries");

  // Data States
  const [projects, setProjects] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters & Search
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  // Admin New Meeting Modal State
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState(false);
  const [adminMeetingForm, setAdminMeetingForm] = useState({
    name: "",
    email: "",
    phone: "",
    meetingDate: "",
    meetingType: "virtual",
    notes: "",
  });
  const [adminMeetingError, setAdminMeetingError] = useState("");

  // Admin New Subscriber Modal State
  const [isSubscriberModalOpen, setIsSubscriberModalOpen] = useState(false);
  const [newSubscriberEmail, setNewSubscriberEmail] = useState("");
  const [subscriberError, setSubscriberError] = useState("");

  // Project Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: "",
    subtitle: "",
    location: "",
    year: "2024",
    footprint: "",
    palette: "",
    scope: "",
    tag: "Civil Construction",
    image: "",
    description: "",
    detailsInput: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    const savedAuth = localStorage.getItem("havenley_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput.trim() === "havenley2025" || passkeyInput.trim() === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("havenley_admin_auth", "true");
      setAuthError("");
      fetchAllData();
    } else {
      setAuthError("Invalid administrative passkey. Access denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("havenley_admin_auth");
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await fetch("/api/seed");

      const [projRes, inqRes, bookRes, subRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/contact"),
        fetch("/api/booking"),
        fetch("/api/subscribers"),
      ]);

      const projData = await projRes.json();
      const inqData = await inqRes.json();
      const bookData = await bookRes.json();
      const subData = await subRes.json();

      if (projData.success) setProjects(projData.data);
      if (inqData.success) setInquiries(inqData.data);
      if (bookData.success) setBookings(bookData.data);
      if (subData.success) setSubscribers(subData.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cloudinary Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setFormError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setProjectForm((prev) => ({ ...prev, image: data.url }));
        setFormSuccess("Image uploaded successfully to Cloudinary!");
        setTimeout(() => setFormSuccess(""), 3000);
      } else {
        setFormError(data.error || "Failed to upload image to Cloudinary.");
      }
    } catch (err: any) {
      setFormError(err.message || "Image upload error.");
    } finally {
      setUploadingImage(false);
    }
  };

  const openProjectModal = (proj?: any) => {
    setFormError("");
    setFormSuccess("");
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title || "",
        subtitle: proj.subtitle || "",
        location: proj.location || "",
        year: proj.year || "2024",
        footprint: proj.footprint || "",
        palette: proj.palette || "",
        scope: proj.scope || "",
        tag: proj.tag || "Civil Construction",
        image: proj.image || "",
        description: proj.description || "",
        detailsInput: (proj.details || []).join("\n"),
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: "",
        subtitle: "",
        location: "",
        year: "2024",
        footprint: "",
        palette: "",
        scope: "",
        tag: "Civil Construction",
        image: "",
        description: "",
        detailsInput: "",
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const detailsArray = projectForm.detailsInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      title: projectForm.title,
      subtitle: projectForm.subtitle,
      location: projectForm.location,
      year: projectForm.year,
      footprint: projectForm.footprint,
      palette: projectForm.palette,
      scope: projectForm.scope,
      tag: projectForm.tag,
      image: projectForm.image,
      description: projectForm.description,
      details: detailsArray.length > 0 ? detailsArray : ["Standard project execution detail"],
    };

    try {
      let res;
      if (editingProject) {
        res = await fetch(`/api/projects/${editingProject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.error || "Save failed. Please check form data.");
        return;
      }

      setIsProjectModalOpen(false);
      fetchAllData();
    } catch (err: any) {
      setFormError(err.message || "Failed to save project.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project permanently?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchAllData();
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err: any) {
      alert(err.message || "Delete error");
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAllData();
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Delete this client inquiry permanently?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSelectedInquiry(null);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAllData();
        if (selectedBooking && selectedBooking._id === id) {
          setSelectedBooking({ ...selectedBooking, status });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Delete this consultation booking record permanently?")) return;
    try {
      const res = await fetch(`/api/booking/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSelectedBooking(null);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateAdminMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminMeetingError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminMeetingForm),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAdminMeetingError(data.error || "Failed to schedule consultation meeting.");
        return;
      }

      setIsNewMeetingModalOpen(false);
      setAdminMeetingForm({
        name: "",
        email: "",
        phone: "",
        meetingDate: "",
        meetingType: "virtual",
        notes: "",
      });
      fetchAllData();
    } catch (err: any) {
      setAdminMeetingError(err.message || "Network error. Failed to create meeting record.");
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Remove this subscriber from Havenley Journal permanently?")) return;
    try {
      const res = await fetch(`/api/subscribers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriberError("");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newSubscriberEmail }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubscriberError(data.error || "Failed to add subscriber.");
        return;
      }

      setIsSubscriberModalOpen(false);
      setNewSubscriberEmail("");
      fetchAllData();
    } catch (err: any) {
      setSubscriberError(err.message || "Network error. Failed to add subscriber.");
    }
  };

  const handleCopySubscribers = () => {
    if (subscribers.length === 0) {
      alert("No subscribers found.");
      return;
    }
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    alert(`Copied ${subscribers.length} subscriber emails to clipboard!`);
  };

  // Filtered Lists
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = inquiryStatusFilter === "all" || inq.status === inquiryStatusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      inq.name?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.phone?.toLowerCase().includes(q) ||
      inq.organization?.toLowerCase().includes(q) ||
      inq.typology?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const filteredBookings = bookings.filter((book) => {
    const matchesStatus = bookingStatusFilter === "all" || book.status === bookingStatusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      book.name?.toLowerCase().includes(q) ||
      book.email?.toLowerCase().includes(q) ||
      book.phone?.toLowerCase().includes(q) ||
      book.meetingDate?.toLowerCase().includes(q) ||
      book.meetingType?.toLowerCase().includes(q) ||
      book.notes?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const filteredSubscribers = subscribers.filter((sub) => {
    const q = searchQuery.toLowerCase();
    return !q || sub.email?.toLowerCase().includes(q);
  });

  // Passkey Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1c1b19] text-[#faf9f6] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-[#faf9f6] text-[#1a1c1a] p-8 rounded-2xl shadow-2xl border border-[#715a3e]/40 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#1c1b19] rounded-xl overflow-hidden flex items-center justify-center mx-auto mb-3 border border-[#715a3e]/40 shadow-sm relative">
              <Image
                src="/images/logo.png"
                alt="Havenley Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold  tracking-wide">Studio Management Portal</h1>
            <p className="text-xs text-[#494740] font-medium">Havenley Infrastructure Executive Control Center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            {authError && (
              <div className="p-3 bg-red-100 border-l-4 border-red-600 text-red-800 text-xs font-bold rounded-r">
                {authError}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[11px] font-bold  text-[#715a3e] block">
                Administrative Passkey
              </label>
              <input
                type="password"
                required
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter Passkey (e.g. Interior123@)"
                className="w-full bg-[#f4f3f0] border border-[#cbc6bd]/60 px-4 py-3 text-sm focus:outline-none focus:border-[#715a3e] font-sans"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1c1b19] text-[#faf9f6] py-3.5 text-xs font-bold  hover:bg-[#715a3e] transition-colors shadow-md"
            >
              Authenticate Executive Access
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs font-semibold text-[#715a3e] hover:underline">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] font-sans flex flex-col">
      {/* Top Navigation Header */}
      <header className="bg-[#1c1b19] text-[#faf9f6] border-b border-[#715a3e]/40 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-[#1c1b19] border border-[#715a3e]/40 shadow-sm relative">
              <Image
                src="/images/logo.png"
                alt="Havenley Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold  tracking-wider">Havenley Control Center</h1>
              <span className="text-[10px] text-[#cbb392] font-semibold  block">
                MongoDB Atlas • Cloudinary SDK Live System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold  text-[#cbb392] hover:text-[#ffffff] px-3.5 py-1.5 border border-[#715a3e]/40 transition-colors rounded"
            >
              Live Website ↗
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold  bg-red-950/60 hover:bg-red-800 text-red-200 px-4 py-1.5 border border-red-700/50 transition-colors rounded"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-[1600px] w-full mx-auto px-6 py-8 flex-1 space-y-8">
        {/* Executive Analytics Metrics Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => setActiveTab("inquiries")}
            className={`p-5 rounded-xl border transition-all cursor-pointer shadow-sm ${activeTab === "inquiries"
              ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
              : "bg-[#ffffff] text-[#1a1c1a] border-[#cbc6bd]/40 hover:border-[#715a3e]"
              }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold  tracking-wider opacity-80">
                Contact Details
              </span>
              <span className="material-symbols-outlined text-2xl text-[#cbb392]">contact_page</span>
            </div>
            <span className="text-2xl font-bold block">{inquiries.length}</span>
            <span className="text-[10px] opacity-70 block mt-1">Full Scope Inquiries</span>
          </div>

          <div
            onClick={() => setActiveTab("bookings")}
            className={`p-5 rounded-xl border transition-all cursor-pointer shadow-sm ${activeTab === "bookings"
              ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
              : "bg-[#ffffff] text-[#1a1c1a] border-[#cbc6bd]/40 hover:border-[#715a3e]"
              }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold  tracking-wider opacity-80">
                Consultations
              </span>
              <span className="material-symbols-outlined text-2xl text-[#cbb392]">calendar_month</span>
            </div>
            <span className="text-2xl font-bold block">{bookings.length}</span>
            <span className="text-[10px] opacity-70 block mt-1">Advisory Meetings</span>
          </div>

          <div
            onClick={() => setActiveTab("subscribers")}
            className={`p-5 rounded-xl border transition-all cursor-pointer shadow-sm ${activeTab === "subscribers"
              ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
              : "bg-[#ffffff] text-[#1a1c1a] border-[#cbc6bd]/40 hover:border-[#715a3e]"
              }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold  tracking-wider opacity-80">
                Journal Subscribers
              </span>
              <span className="material-symbols-outlined text-2xl text-[#cbb392]">mark_email_read</span>
            </div>
            <span className="text-2xl font-bold block">{subscribers.length}</span>
            <span className="text-[10px] opacity-70 block mt-1">Newsletter Audience</span>
          </div>

          <div
            onClick={() => setActiveTab("projects")}
            className={`p-5 rounded-xl border transition-all cursor-pointer shadow-sm ${activeTab === "projects"
              ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
              : "bg-[#ffffff] text-[#1a1c1a] border-[#cbc6bd]/40 hover:border-[#715a3e]"
              }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold  tracking-wider opacity-80">
                Projects
              </span>
              <span className="material-symbols-outlined text-2xl text-[#cbb392]">domain</span>
            </div>
            <span className="text-2xl font-bold block">{projects.length}</span>
            <span className="text-[10px] opacity-70 block mt-1">Cloudinary Catalog</span>
          </div>

          <div className="bg-[#ffffff] p-5 rounded-xl border border-[#cbc6bd]/40 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">cloud_done</span>
            </div>
            <div>
              <span className="text-[9px] font-bold text-emerald-700  block">
                Database Status
              </span>
              <span className="text-xs font-bold text-emerald-900 block mt-0.5">MongoDB Connected</span>
              <span className="text-[9px] text-[#494740]">cluster0.zv45mju</span>
            </div>
          </div>
        </div>

        {/* Tab & Search Bar Navigation */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#cbc6bd]/50 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2 text-xs font-bold  transition-colors rounded-lg border flex items-center gap-1.5 ${activeTab === "inquiries"
                ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
                : "bg-[#ffffff] text-[#1a1c1a] border-[#cbc6bd]/40 hover:bg-[#e9e8e5]"
                }`}
            >
              <span className="material-symbols-outlined text-base">badge</span>
              Contact Details ({inquiries.length})
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 text-xs font-bold  transition-colors rounded-lg border flex items-center gap-1.5 ${activeTab === "bookings"
                ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
                : "bg-[#ffffff] text-[#1a1c1a] border-[#cbc6bd]/40 hover:bg-[#e9e8e5]"
                }`}
            >
              <span className="material-symbols-outlined text-base">event_available</span>
              Meeting Data ({bookings.length})
            </button>

            <button
              onClick={() => setActiveTab("subscribers")}
              className={`px-4 py-2 text-xs font-bold  transition-colors rounded-lg border flex items-center gap-1.5 ${activeTab === "subscribers"
                ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
                : "bg-[#ffffff] text-[#1a1c1a] border-[#cbc6bd]/40 hover:bg-[#e9e8e5]"
                }`}
            >
              <span className="material-symbols-outlined text-base">mark_email_read</span>
              Journal Subscribers ({subscribers.length})
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 text-xs font-bold  transition-colors rounded-lg border flex items-center gap-1.5 ${activeTab === "projects"
                ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
                : "bg-[#ffffff] text-[#1a1c1a] border-[#cbc6bd]/40 hover:bg-[#e9e8e5]"
                }`}
            >
              <span className="material-symbols-outlined text-base">collections</span>
              Projects ({projects.length})
            </button>
          </div>

          {/* Search & Add Action */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {activeTab !== "projects" && (
              <div className="relative flex-1 lg:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, email, phone..."
                  className="w-full bg-[#ffffff] border border-[#cbc6bd] px-4 py-2 text-xs font-semibold focus:outline-none focus:border-[#715a3e] rounded-lg pl-9 shadow-sm"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-sm text-[#494740]">
                  search
                </span>
              </div>
            )}

            {activeTab === "subscribers" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySubscribers}
                  className="bg-[#1c1b19] hover:bg-[#715a3e] text-[#ffffff] px-4 py-2 text-xs font-bold  transition-colors rounded-lg flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <span className="material-symbols-outlined text-base">content_copy</span>
                  Copy Emails
                </button>
                <button
                  onClick={() => {
                    setSubscriberError("");
                    setIsSubscriberModalOpen(true);
                  }}
                  className="bg-[#715a3e] hover:bg-[#1c1b19] text-[#ffffff] px-4 py-2 text-xs font-bold  transition-colors rounded-lg flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <span className="material-symbols-outlined text-base">person_add</span>
                  Add Subscriber
                </button>
              </div>
            )}

            {activeTab === "bookings" && (
              <button
                onClick={() => {
                  setAdminMeetingError("");
                  setIsNewMeetingModalOpen(true);
                }}
                className="bg-[#715a3e] hover:bg-[#1c1b19] text-[#ffffff] px-5 py-2 text-xs font-bold  transition-colors rounded-lg flex items-center gap-1.5 shadow-md shrink-0"
              >
                <span className="material-symbols-outlined text-base">calendar_add_on</span>
                Log New Meeting
              </button>
            )}

            {activeTab === "projects" && (
              <button
                onClick={() => openProjectModal()}
                className="bg-[#715a3e] hover:bg-[#1c1b19] text-[#ffffff] px-6 py-2.5 text-xs font-bold  transition-colors rounded-lg flex items-center gap-2 shadow-md shrink-0"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add New Project
              </button>
            )}
          </div>
        </div>

        {/* SECTION 1: CLIENT CONTACT DETAILS PAGE */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#715a3e]  mr-2">Filter Status:</span>
                {["all", "pending", "reviewed", "contacted", "archived"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-3 py-1 text-[11px] font-bold  rounded-full border transition-colors ${inquiryStatusFilter === st
                      ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
                      : "bg-[#ffffff] text-[#494740] border-[#cbc6bd]/40 hover:bg-[#e9e8e5]"
                      }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <span className="text-xs text-[#494740] font-medium">
                Showing {filteredInquiries.length} of {inquiries.length} contact records
              </span>
            </div>

            {/* Table */}
            <div className="bg-[#ffffff] border border-[#cbc6bd]/40 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1c1b19] text-[#faf9f6] text-[11px] font-bold  tracking-wider">
                      <th className="p-4">Received Date</th>
                      <th className="p-4">Patron Full Name</th>
                      <th className="p-4">Email & Phone</th>
                      <th className="p-4">Typology & Location</th>
                      <th className="p-4">Investment Tier</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e2db] text-xs">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-[#494740] font-medium">
                          No matching contact inquiry records found.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq._id} className="hover:bg-[#faf9f6] transition-colors">
                          <td className="p-4 font-mono text-[11px] text-[#494740]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 font-bold text-[#1a1c1a]">
                            <div className="flex items-center gap-2">
                              <span>{inq.name}</span>
                              {inq.nda && (
                                <span className="bg-[#715a3e]/10 text-[#715a3e] px-1.5 py-0.5 rounded text-[9px] font-bold  border border-[#715a3e]/30">
                                  NDA
                                </span>
                              )}
                            </div>
                            {inq.organization && (
                              <span className="block text-[10px] font-normal text-[#715a3e]">
                                {inq.organization}
                              </span>
                            )}
                          </td>
                          <td className="p-4 space-y-0.5">
                            <span className="block font-semibold text-[#1a1c1a]">{inq.email}</span>
                            <span className="block text-[#494740] font-mono text-[11px]">{inq.phone}</span>
                          </td>
                          <td className="p-4">
                            <span className="block font-semibold  text-[#715a3e]">
                              {inq.typology}
                            </span>
                            <span className="block text-[10px] text-[#494740]">
                              {inq.location || "N/A"}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-[11px] font-bold text-[#1a1c1a]">
                            {inq.investment || "Tier-2"}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 text-[10px] font-bold  rounded-full border ${inq.status === "pending"
                                ? "bg-amber-50 text-amber-800 border-amber-300"
                                : inq.status === "reviewed"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-300"
                                }`}
                            >
                              {inq.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-3 py-1.5 bg-[#1c1b19] text-[#ffffff] text-[10px] font-bold  rounded hover:bg-[#715a3e] transition-colors"
                            >
                              View Dossier
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq._id)}
                              className="px-2.5 py-1.5 bg-red-100 text-red-800 hover:bg-red-800 hover:text-[#ffffff] text-[10px] font-bold  rounded transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: MEETING DATA PAGE */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#715a3e]  mr-2">Filter Status:</span>
                {["all", "confirmed", "completed", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingStatusFilter(st)}
                    className={`px-3 py-1 text-[11px] font-bold  rounded-full border transition-colors ${bookingStatusFilter === st
                      ? "bg-[#1c1b19] text-[#faf9f6] border-[#1c1b19]"
                      : "bg-[#ffffff] text-[#494740] border-[#cbc6bd]/40 hover:bg-[#e9e8e5]"
                      }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <span className="text-xs text-[#494740] font-medium">
                Showing {filteredBookings.length} of {bookings.length} meeting records
              </span>
            </div>

            {/* Table */}
            <div className="bg-[#ffffff] border border-[#cbc6bd]/40 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1c1b19] text-[#faf9f6] text-[11px] font-bold  tracking-wider">
                      <th className="p-4">Requested Date</th>
                      <th className="p-4">Patron Name</th>
                      <th className="p-4">Direct Contact</th>
                      <th className="p-4">Meeting Format</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e2db] text-xs">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-[#494740] font-medium">
                          No matching consultation meeting records found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((book) => (
                        <tr key={book._id} className="hover:bg-[#faf9f6] transition-colors">
                          <td className="p-4 font-mono font-bold text-xs text-[#1a1c1a]">
                            {book.meetingDate?.replace("T", " ")}
                          </td>
                          <td className="p-4 font-bold text-[#1a1c1a]">
                            <span>{book.name}</span>
                            {book.notes && (
                              <span className="block text-[11px] font-normal text-[#715a3e] truncate max-w-[200px] mt-0.5" title={book.notes}>
                                Note: {book.notes}
                              </span>
                            )}
                          </td>
                          <td className="p-4 space-y-0.5">
                            <span className="block font-semibold text-[#1a1c1a]">{book.email}</span>
                            <span className="block text-[#494740] font-mono text-[11px]">{book.phone}</span>
                          </td>
                          <td className="p-4  font-semibold text-[#715a3e]">
                            <span className="bg-[#715a3e]/10 text-[#715a3e] px-2.5 py-1 rounded text-[10px] font-bold border border-[#715a3e]/20">
                              {book.meetingType || "Virtual Consultation"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 text-[10px] font-bold  rounded-full border ${book.status === "confirmed"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : book.status === "completed"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : "bg-red-50 text-red-800 border-red-300"
                                }`}
                            >
                              {book.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedBooking(book)}
                              className="px-3 py-1.5 bg-[#1c1b19] text-[#ffffff] text-[10px] font-bold  rounded hover:bg-[#715a3e] transition-colors"
                            >
                              Details
                            </button>
                            <select
                              value={book.status}
                              onChange={(e) => handleUpdateBookingStatus(book._id, e.target.value)}
                              className="bg-[#f4f3f0] border border-[#cbc6bd] text-[10px] font-bold  p-1 rounded cursor-pointer"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleDeleteBooking(book._id)}
                              className="px-2 py-1 bg-red-100 text-red-800 hover:bg-red-800 hover:text-[#ffffff] text-[10px] font-bold  rounded transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: JOURNAL SUBSCRIBERS PAGE */}
        {activeTab === "subscribers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-[#715a3e] ">
                Active Journal Subscribers ({filteredSubscribers.length})
              </span>
              <span className="text-xs text-[#494740] font-medium">
                Showing {filteredSubscribers.length} of {subscribers.length} total subscribers
              </span>
            </div>

            <div className="bg-[#ffffff] border border-[#cbc6bd]/40 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1c1b19] text-[#faf9f6] text-[11px] font-bold  tracking-wider">
                      <th className="p-4">Subscribed Date</th>
                      <th className="p-4">Subscriber Email</th>
                      <th className="p-4">Subscription Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e2db] text-xs">
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-[#494740] font-medium">
                          No matching journal subscriber records found.
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((sub) => (
                        <tr key={sub._id} className="hover:bg-[#faf9f6] transition-colors">
                          <td className="p-4 font-mono text-[11px] text-[#494740]">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 font-bold text-[#1a1c1a]">{sub.email}</td>
                          <td className="p-4">
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-1 text-[10px] font-bold  rounded-full">
                              {sub.status || "active"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteSubscriber(sub._id)}
                              className="px-3 py-1.5 bg-red-100 text-red-800 hover:bg-red-800 hover:text-[#ffffff] text-[10px] font-bold  rounded transition-colors"
                            >
                              Remove Subscriber
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: PROJECT CONTENT MANAGER PAGE */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12 text-[#715a3e] font-semibold text-sm">
                Loading projects from MongoDB...
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12 bg-[#ffffff] border border-[#cbc6bd]/40 rounded-xl p-8">
                <p className="text-base text-[#494740] font-semibold">No projects found in database.</p>
                <button
                  onClick={() => openProjectModal()}
                  className="mt-4 px-6 py-2.5 bg-[#715a3e] text-[#ffffff] text-xs font-bold  rounded-lg"
                >
                  Create First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="bg-[#ffffff] border border-[#cbc6bd]/40 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-[#efeeeb] overflow-hidden">
                        <img
                          src={proj.image || "/images/villa_miramar.jpg"}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-[#1c1b19]/90 text-[#cbb392] text-[10px] font-bold  px-3 py-1 rounded">
                          {proj.tag}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-bold text-lg text-[#1a1c1a]">{proj.title}</h3>
                        <p className="text-xs text-[#715a3e] font-semibold ">{proj.subtitle}</p>
                        <p className="text-xs text-[#494740] line-clamp-2 mt-2">{proj.description}</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-[#494740] font-medium border-t border-[#e5e2db]">
                          <span>{proj.location}</span>
                          <span>{proj.footprint}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#f4f3f0] border-t border-[#cbc6bd]/30 flex items-center justify-end gap-2">
                      <button
                        onClick={() => openProjectModal(proj)}
                        className="px-4 py-2 bg-[#1c1b19] text-[#ffffff] text-xs font-bold  rounded hover:bg-[#715a3e] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj._id)}
                        className="px-4 py-2 bg-red-100 text-red-800 hover:bg-red-800 hover:text-[#ffffff] text-xs font-bold  rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* CREATE / EDIT PROJECT MODAL WITH CLOUDINARY UPLOAD */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1c1b19]/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-[#faf9f6] text-[#1a1c1a] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-2xl shadow-2xl border border-[#715a3e]/40 space-y-6">
            <div className="flex items-center justify-between border-b border-[#cbc6bd]/40 pb-4">
              <h2 className="text-xl font-bold ">
                {editingProject ? "Edit Project Details" : "Add New Showcase Project"}
              </h2>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-[#494740] hover:text-[#000000] text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-100 text-red-800 text-xs font-bold border-l-4 border-red-600">
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold border-l-4 border-emerald-600">
                  {formSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. Vasant Vihar Luxury Villa"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Subtitle / Architecture Scope *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.subtitle}
                    onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                    placeholder="e.g. Turnkey Civil Build & Marble Fitout"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. New Delhi, India"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    placeholder="2024"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Surface Footprint *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.footprint}
                    onChange={(e) => setProjectForm({ ...projectForm, footprint: e.target.value })}
                    placeholder="650 m² (7,000 sq ft)"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Material Palette *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.palette}
                    onChange={(e) => setProjectForm({ ...projectForm, palette: e.target.value })}
                    placeholder="Italian Marble & Teak Wood"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Engineering Scope *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.scope}
                    onChange={(e) => setProjectForm({ ...projectForm, scope: e.target.value })}
                    placeholder="Civil Construction & Interiors"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Category Tag *
                  </label>
                  <select
                    value={projectForm.tag}
                    onChange={(e) => setProjectForm({ ...projectForm, tag: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Civil Construction">Civil Construction</option>
                    <option value="Residential Villa">Residential Villa</option>
                    <option value="Luxury Penthouse">Luxury Penthouse</option>
                    <option value="Corporate Fitout">Corporate Fitout</option>
                    <option value="Turnkey Commercial">Turnkey Commercial</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary Image Picker Section */}
              <div className="space-y-2 pt-2 border-t border-[#cbc6bd]/40">
                <label className="text-[11px] font-bold  text-[#715a3e] block">
                  Project Feature Image (Upload to Cloudinary or Enter URL) *
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <input
                    type="url"
                    required
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="https://res.cloudinary.com/... or upload below"
                    className="flex-1 bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />

                  <label className="px-4 py-3 bg-[#1c1b19] text-[#ffffff] text-xs font-bold  rounded cursor-pointer hover:bg-[#715a3e] transition-colors shrink-0">
                    {uploadingImage ? "Uploading to Cloudinary..." : "📷 Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="sr-only"
                    />
                  </label>
                </div>

                {projectForm.image && (
                  <div className="mt-2 relative w-32 h-20 rounded border border-[#cbc6bd] overflow-hidden bg-[#efeeeb]">
                    <img src={projectForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Detailed spatial monograph description..."
                  className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                  Key Technical Specifications (One per line)
                </label>
                <textarea
                  rows={3}
                  value={projectForm.detailsInput}
                  onChange={(e) => setProjectForm({ ...projectForm, detailsInput: e.target.value })}
                  placeholder="Poured reinforced concrete foundation&#10;Imported Italian marble flooring&#10;Smart automation system"
                  className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none resize-none font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#cbc6bd]/40">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 bg-[#e9e8e5] text-[#1a1c1a] text-xs font-bold  rounded hover:bg-[#cbc6bd]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1c1b19] text-[#faf9f6] text-xs font-bold  rounded hover:bg-[#715a3e] transition-colors"
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL CLIENT INQUIRY DOSSIER MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-[#1c1b19]/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-[#faf9f6] text-[#1a1c1a] max-w-2xl w-full p-6 md:p-8 rounded-2xl shadow-2xl border border-[#715a3e]/40 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#cbc6bd]/40 pb-4">
              <div>
                <span className="text-[10px] font-bold  text-[#715a3e] block tracking-wide">
                  Client Contact Dossier • ID #{selectedInquiry._id?.slice(-6)}
                </span>
                <h2 className="text-2xl font-bold text-[#1a1c1a] mt-0.5">{selectedInquiry.name}</h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-[#494740] hover:text-[#000000] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-[#ffffff] p-5 border border-[#cbc6bd]/40 rounded-xl shadow-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Direct Email</span>
                  <p className="font-semibold text-sm text-[#1a1c1a] mt-0.5">{selectedInquiry.email}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Telephone</span>
                  <p className="font-semibold text-sm text-[#1a1c1a] font-mono mt-0.5">{selectedInquiry.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Family Office / Firm</span>
                  <p className="font-semibold text-xs text-[#1a1c1a] mt-0.5">{selectedInquiry.organization || "Private Patron"}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Typology</span>
                  <p className="font-semibold text-xs  text-[#715a3e] mt-0.5">{selectedInquiry.typology}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Location</span>
                  <p className="font-semibold text-xs text-[#1a1c1a] mt-0.5">{selectedInquiry.location || "Not specified"}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Investment Tier</span>
                  <p className="font-semibold text-xs font-mono text-[#1a1c1a] mt-0.5">{selectedInquiry.investment || "Tier-2"}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#715a3e]  block mb-1">
                  Spatial Vision & Site Narrative Context
                </span>
                <div className="bg-[#ffffff] p-4 border border-[#cbc6bd]/40 rounded-xl text-xs font-medium text-[#1a1c1a] whitespace-pre-wrap leading-relaxed shadow-xs">
                  {selectedInquiry.vision}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#cbc6bd]/40">
              <button
                onClick={() => handleDeleteInquiry(selectedInquiry._id)}
                className="px-4 py-2 bg-red-100 text-red-800 hover:bg-red-800 hover:text-[#ffffff] text-xs font-bold  rounded transition-colors"
              >
                Delete Dossier
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateInquiryStatus(selectedInquiry._id, "reviewed")}
                  className="px-3.5 py-2 bg-blue-50 text-blue-800 border border-blue-300 text-xs font-bold  rounded hover:bg-blue-100"
                >
                  Mark Reviewed
                </button>
                <button
                  onClick={() => handleUpdateInquiryStatus(selectedInquiry._id, "contacted")}
                  className="px-4 py-2 bg-[#715a3e] text-[#ffffff] text-xs font-bold  rounded hover:bg-[#1c1b19]"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 bg-[#1c1b19] text-[#ffffff] text-xs font-bold  rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL CONSULTATION MEETING DOSSIER MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-[#1c1b19]/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-[#faf9f6] text-[#1a1c1a] max-w-lg w-full p-6 md:p-8 rounded-2xl shadow-2xl border border-[#715a3e]/40 space-y-6">
            <div className="flex items-center justify-between border-b border-[#cbc6bd]/40 pb-4">
              <div>
                <span className="text-[10px] font-bold  text-[#715a3e] block tracking-wide">
                  Consultation Meeting Dossier • ID #{selectedBooking._id?.slice(-6)}
                </span>
                <h2 className="text-xl font-bold text-[#1a1c1a] mt-0.5">{selectedBooking.name}</h2>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-[#494740] hover:text-[#000000] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-[#ffffff] p-4 border border-[#cbc6bd]/40 rounded-xl shadow-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Requested Date</span>
                  <p className="font-mono text-sm font-bold text-[#1a1c1a] mt-0.5">{selectedBooking.meetingDate}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Meeting Format</span>
                  <p className="font-semibold text-xs  text-[#715a3e] mt-0.5">{selectedBooking.meetingType || "Virtual"}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Email</span>
                  <p className="font-semibold text-xs text-[#1a1c1a] mt-0.5">{selectedBooking.email}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Telephone</span>
                  <p className="font-semibold text-xs font-mono text-[#1a1c1a] mt-0.5">{selectedBooking.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Current Status</span>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 text-[10px] font-bold  rounded-full border ${selectedBooking.status === "confirmed" ? "bg-emerald-50 text-emerald-800 border-emerald-300" : selectedBooking.status === "completed" ? "bg-blue-50 text-blue-800 border-blue-300" : "bg-red-50 text-red-800 border-red-300"}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block">Created On</span>
                  <p className="font-mono text-[11px] text-[#494740] mt-0.5">
                    {selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div>
                  <span className="text-[10px] font-bold text-[#715a3e]  block mb-1">Agenda Notes & Context</span>
                  <div className="bg-[#ffffff] p-3 border border-[#cbc6bd]/40 rounded-lg text-xs font-medium text-[#1a1c1a] whitespace-pre-wrap">
                    {selectedBooking.notes}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#cbc6bd]/40">
              <button
                onClick={() => handleDeleteBooking(selectedBooking._id)}
                className="px-4 py-2 bg-red-100 text-red-800 hover:bg-red-800 hover:text-[#ffffff] text-xs font-bold  rounded transition-colors"
              >
                Delete Record
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateBookingStatus(selectedBooking._id, "completed")}
                  className="px-3.5 py-2 bg-blue-50 text-blue-800 border border-blue-300 text-xs font-bold  rounded hover:bg-blue-100"
                >
                  Mark Completed
                </button>
                <button
                  onClick={() => handleUpdateBookingStatus(selectedBooking._id, "confirmed")}
                  className="px-4 py-2 bg-[#715a3e] text-[#ffffff] text-xs font-bold  rounded hover:bg-[#1c1b19]"
                >
                  Confirm Meeting
                </button>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 bg-[#1c1b19] text-[#ffffff] text-xs font-bold  rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN CREATE NEW MEETING MODAL */}
      {isNewMeetingModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1c1b19]/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-[#faf9f6] text-[#1a1c1a] max-w-lg w-full p-6 md:p-8 rounded-2xl shadow-2xl border border-[#715a3e]/40 space-y-6">
            <div className="flex items-center justify-between border-b border-[#cbc6bd]/40 pb-4">
              <div>
                <span className="text-[10px] font-bold  text-[#715a3e] block tracking-wide">
                  Executive Administrative Action
                </span>
                <h2 className="text-xl font-bold  text-[#1a1c1a] mt-0.5">Log New Consultation Meeting</h2>
              </div>
              <button
                onClick={() => setIsNewMeetingModalOpen(false)}
                className="text-[#494740] hover:text-[#000000] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAdminMeeting} className="space-y-4">
              {adminMeetingError && (
                <div className="p-3 bg-red-100 border-l-4 border-red-600 text-red-800 text-xs font-bold">
                  {adminMeetingError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Patron Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={adminMeetingForm.name}
                    onChange={(e) => setAdminMeetingForm({ ...adminMeetingForm, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Direct Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={adminMeetingForm.email}
                    onChange={(e) => setAdminMeetingForm({ ...adminMeetingForm, email: e.target.value })}
                    placeholder="eleanor@domain.com"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={adminMeetingForm.phone}
                    onChange={(e) => setAdminMeetingForm({ ...adminMeetingForm, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                    Meeting Format *
                  </label>
                  <select
                    value={adminMeetingForm.meetingType}
                    onChange={(e) => setAdminMeetingForm({ ...adminMeetingForm, meetingType: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                  >
                    <option value="virtual">Virtual Dialogue (Zoom)</option>
                    <option value="in-person">Atelier Salon Visit</option>
                    <option value="site-audit">On-Site Civil Audit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                  Preferred Meeting Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={adminMeetingForm.meetingDate}
                  onChange={(e) => setAdminMeetingForm({ ...adminMeetingForm, meetingDate: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                  Meeting Agenda & Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={adminMeetingForm.notes}
                  onChange={(e) => setAdminMeetingForm({ ...adminMeetingForm, notes: e.target.value })}
                  placeholder="Notes from preliminary telephone intake..."
                  className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#cbc6bd]/40">
                <button
                  type="button"
                  onClick={() => setIsNewMeetingModalOpen(false)}
                  className="px-5 py-2.5 bg-[#e9e8e5] text-[#1a1c1a] text-xs font-bold  rounded hover:bg-[#cbc6bd]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1c1b19] text-[#faf9f6] text-xs font-bold  rounded hover:bg-[#715a3e] transition-colors"
                >
                  Save & Log Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN ADD NEW SUBSCRIBER MODAL */}
      {isSubscriberModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1c1b19]/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-[#faf9f6] text-[#1a1c1a] max-w-md w-full p-6 md:p-8 rounded-2xl shadow-2xl border border-[#715a3e]/40 space-y-6">
            <div className="flex items-center justify-between border-b border-[#cbc6bd]/40 pb-4">
              <div>
                <span className="text-[10px] font-bold  text-[#715a3e] block tracking-wide">
                  Havenley Journal Audience
                </span>
                <h2 className="text-xl font-bold  text-[#1a1c1a] mt-0.5">Add Journal Subscriber</h2>
              </div>
              <button
                onClick={() => setIsSubscriberModalOpen(false)}
                className="text-[#494740] hover:text-[#000000] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubscriber} className="space-y-4">
              {subscriberError && (
                <div className="p-3 bg-red-100 border-l-4 border-red-600 text-red-800 text-xs font-bold">
                  {subscriberError}
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold  text-[#715a3e] block mb-1">
                  Subscriber Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newSubscriberEmail}
                  onChange={(e) => setNewSubscriberEmail(e.target.value)}
                  placeholder="patron@estate-journal.org"
                  className="w-full bg-[#ffffff] border border-[#cbc6bd] p-3 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#cbc6bd]/40">
                <button
                  type="button"
                  onClick={() => setIsSubscriberModalOpen(false)}
                  className="px-5 py-2.5 bg-[#e9e8e5] text-[#1a1c1a] text-xs font-bold  rounded hover:bg-[#cbc6bd]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1c1b19] text-[#faf9f6] text-xs font-bold  rounded hover:bg-[#715a3e] transition-colors"
                >
                  Add Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
