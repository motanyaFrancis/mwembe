"use client";

import { useState } from "react";

export default function VolunteerForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "Community Outreach",
        reason: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/volunteer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    interest: "Community Outreach",
                    reason: "",
                });
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-xl p-10 space-y-6 border-t-4 border-gold-600">
            <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full border border-primary-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-800"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full border border-primary-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-800"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    className="w-full border border-primary-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-800"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-2">Area of Interest</label>
                <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full border border-primary-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-800"
                >
                    <option>Community Outreach</option>
                    <option>Event Coordination</option>
                    <option>Social Media Advocacy</option>
                    <option>Fundraising Support</option>
                    <option>Policy Research</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold mb-2">Why do you want to volunteer?</label>
                <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-primary-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-800"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-primary-800 text-white font-bold tracking-widest py-4 hover:bg-primary-900 transition"
            >
                {status === "sending" ? "Submitting..." : "SUBMIT APPLICATION"}
            </button>

            {status === "success" && <p className="text-green-600 mt-2">Application submitted successfully!</p>}
            {status === "error" && <p className="text-red-600 mt-2">Failed to submit. Please try again.</p>}
        </form>
    );
}