"use client";

import React, { useState, useEffect } from "react";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export default function ScheduleMeetingModal({
  isOpen,
  onClose,
  initialData,
}: ScheduleMeetingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    meetingDate: "",
    meetingType: "virtual",
    notes: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any | null>(null);

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: initialData?.name || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        meetingDate: "",
        meetingType: "virtual",
        notes: "",
      });
      setFieldErrors({});
      setApiError(null);
      setShowConfirmation(false);
      setConfirmationData(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsSubmitting(false);
        setApiError(
          data.error || "Failed to schedule meeting. Please check entered details."
        );
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        return;
      }

      setIsSubmitting(false);
      setConfirmationData(data.data);
      setShowConfirmation(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setApiError(err.message || "Network error. Please try again.");
    }
  };

  const handleCloseAll = () => {
    setShowConfirmation(false);
    setConfirmationData(null);
    onClose();
  };

  return (
    <>
      {/* 1. Schedule Meeting Intake Form Modal */}
      {!showConfirmation && (
        <div className="fixed inset-0 z-[100] bg-[#1c1b19]/85 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="w-full max-w-lg bg-[#faf9f6] border border-[#cbc6bd] p-6 md:p-8 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto rounded-none text-[#1a1c1a]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#1a1c1a] hover:text-[#715a3e] transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#715a3e] uppercase tracking-wider block">
                Private Advisory Session
              </span>
              <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-wide text-[#1a1c1a]">
                Schedule Partner Consultation
              </h2>
              <p className="text-xs text-[#494740] font-medium">
                Enter your details to reserve a virtual dialogue, atelier visit, or on-site engineering audit.
              </p>
            </div>

            {apiError && (
              <div className="p-3 bg-red-100 border-l-4 border-red-600 text-red-800 text-xs font-semibold">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#1a1c1a] block">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (fieldErrors.name)
                      setFieldErrors({ ...fieldErrors, name: [] });
                  }}
                  placeholder="e.g. Eleanor Vance"
                  className={`w-full bg-[#f4f3f0] px-4 py-3 text-xs text-[#1a1c1a] border focus:outline-none transition-colors ${
                    fieldErrors.name?.length
                      ? "border-red-600 bg-red-50/20"
                      : "border-[#cbc6bd]/60 focus:border-[#715a3e]"
                  }`}
                />
                {fieldErrors.name?.length && (
                  <p className="text-[10px] text-red-600 font-bold mt-1">
                    ⚠ {fieldErrors.name[0]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#1a1c1a] block">
                    Mobile Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (fieldErrors.phone)
                        setFieldErrors({ ...fieldErrors, phone: [] });
                    }}
                    placeholder="+91 9876543210"
                    className={`w-full bg-[#f4f3f0] px-4 py-3 text-xs text-[#1a1c1a] border focus:outline-none transition-colors ${
                      fieldErrors.phone?.length
                        ? "border-red-600 bg-red-50/20"
                        : "border-[#cbc6bd]/60 focus:border-[#715a3e]"
                    }`}
                  />
                  {fieldErrors.phone?.length && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">
                      ⚠ {fieldErrors.phone[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#1a1c1a] block">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (fieldErrors.email)
                        setFieldErrors({ ...fieldErrors, email: [] });
                    }}
                    placeholder="eleanor@domain.com"
                    className={`w-full bg-[#f4f3f0] px-4 py-3 text-xs text-[#1a1c1a] border focus:outline-none transition-colors ${
                      fieldErrors.email?.length
                        ? "border-red-600 bg-red-50/20"
                        : "border-[#cbc6bd]/60 focus:border-[#715a3e]"
                    }`}
                  />
                  {fieldErrors.email?.length && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">
                      ⚠ {fieldErrors.email[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#1a1c1a] block mb-1">
                  Consultation Format *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, meetingType: "virtual" })}
                    className={`p-2.5 text-[10px] font-bold uppercase border text-center transition-colors ${
                      form.meetingType === "virtual"
                        ? "bg-[#000000] text-[#ffffff] border-[#000000]"
                        : "bg-[#f4f3f0] text-[#494740] border-[#cbc6bd]/60 hover:bg-[#e9e8e5]"
                    }`}
                  >
                    Virtual Dialogue
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, meetingType: "in-person" })}
                    className={`p-2.5 text-[10px] font-bold uppercase border text-center transition-colors ${
                      form.meetingType === "in-person"
                        ? "bg-[#000000] text-[#ffffff] border-[#000000]"
                        : "bg-[#f4f3f0] text-[#494740] border-[#cbc6bd]/60 hover:bg-[#e9e8e5]"
                    }`}
                  >
                    Atelier Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, meetingType: "site-audit" })}
                    className={`p-2.5 text-[10px] font-bold uppercase border text-center transition-colors ${
                      form.meetingType === "site-audit"
                        ? "bg-[#000000] text-[#ffffff] border-[#000000]"
                        : "bg-[#f4f3f0] text-[#494740] border-[#cbc6bd]/60 hover:bg-[#e9e8e5]"
                    }`}
                  >
                    On-Site Audit
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#1a1c1a] block">
                  Preferred Date & Time *
                </label>
                <input
                  required
                  type="datetime-local"
                  value={form.meetingDate}
                  onChange={(e) => {
                    setForm({ ...form, meetingDate: e.target.value });
                    if (fieldErrors.meetingDate)
                      setFieldErrors({ ...fieldErrors, meetingDate: [] });
                  }}
                  className={`w-full bg-[#f4f3f0] px-4 py-3 text-xs text-[#1a1c1a] border focus:outline-none transition-colors ${
                    fieldErrors.meetingDate?.length
                      ? "border-red-600 bg-red-50/20"
                      : "border-[#cbc6bd]/60 focus:border-[#715a3e]"
                  }`}
                />
                {fieldErrors.meetingDate?.length && (
                  <p className="text-[10px] text-red-600 font-bold mt-1">
                    ⚠ {fieldErrors.meetingDate[0]}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#1a1c1a] block">
                  Agenda Notes & Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Outline key structural objectives or project location..."
                  className="w-full bg-[#f4f3f0] px-4 py-2.5 text-xs text-[#1a1c1a] border border-[#cbc6bd]/60 focus:outline-none focus:border-[#715a3e] resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#cbc6bd]/40">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#f4f3f0] text-xs font-bold uppercase text-[#494740] hover:bg-[#e9e8e5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#000000] text-[#ffffff] text-[11px] sm:text-xs font-bold uppercase hover:bg-[#715a3e] transition-colors shadow-md tracking-wider shrink-0"
                >
                  {isSubmitting ? "Transmitting..." : "Confirm & Schedule Meeting"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Interactive Popup Confirmation Overlay */}
      {showConfirmation && confirmationData && (
        <div className="fixed inset-0 z-[101] bg-[#1c1b19]/85 backdrop-blur-md flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-[#faf9f6] border border-[#715a3e] p-8 shadow-2xl relative text-center text-[#1a1c1a] space-y-6">
            <button
              onClick={handleCloseAll}
              className="absolute top-4 right-4 text-[#494740] hover:text-[#000000] text-lg font-bold"
            >
              ✕
            </button>

            <div className="w-16 h-16 bg-[#715a3e] text-[#faf9f6] rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#715a3e] tracking-widest block">
                Booking Reference #{confirmationData._id?.slice(-6).toUpperCase() || "CONFIRMED"}
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-wide text-[#1a1c1a]">
                Consultation Confirmed!
              </h2>
              <p className="text-xs text-[#494740] font-medium">
                Your consultation meeting has been logged in our executive partner schedule.
              </p>
            </div>

            <div className="bg-[#ffffff] border border-[#cbc6bd]/60 p-4 rounded-xl text-left space-y-2 text-xs shadow-xs">
              <div className="flex justify-between border-b border-[#e5e2db] pb-1.5">
                <span className="text-[#715a3e] font-bold uppercase">Patron Name:</span>
                <span className="font-bold text-[#1a1c1a]">{confirmationData.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e2db] pb-1.5">
                <span className="text-[#715a3e] font-bold uppercase">Mobile Number:</span>
                <span className="font-mono font-bold text-[#1a1c1a]">{confirmationData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e2db] pb-1.5">
                <span className="text-[#715a3e] font-bold uppercase">Direct Email:</span>
                <span className="font-semibold text-[#1a1c1a]">{confirmationData.email}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e2db] pb-1.5">
                <span className="text-[#715a3e] font-bold uppercase">Requested Date:</span>
                <span className="font-mono font-bold text-[#1a1c1a]">
                  {confirmationData.meetingDate?.replace("T", " ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#715a3e] font-bold uppercase">Format:</span>
                <span className="font-bold uppercase text-[#715a3e]">
                  {confirmationData.meetingType}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#f4f3f0] border-l-4 border-[#715a3e] text-[11px] text-[#494740] text-left">
              <strong>Direct Partner SLA:</strong> A partner architect will contact you at <strong>{confirmationData.phone}</strong> and send your calendar invitation to <strong>{confirmationData.email}</strong>.
            </div>

            <button
              onClick={handleCloseAll}
              className="w-full bg-[#1c1b19] text-[#faf9f6] text-xs font-bold uppercase py-3.5 hover:bg-[#715a3e] transition-colors shadow-md"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
