"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { PostMpesa, ConfirmStatus } from "@/data/mpesa";
import { ChevronDown } from "lucide-react";

const countries = [
  { name: "Kenya", code: "254", iso: "KE" },
  { name: "Tanzania", code: "255", iso: "TZ" },
  { name: "Ethiopia", code: "251", iso: "ET" },
  { name: "Rwanda", code: "250", iso: "RW" },
  { name: "Mozambique", code: "258", iso: "MZ" },
];

interface StatusModalProps {
  type: "loading" | "success" | "error";
  message: string;
  onClose?: () => void;
}

const StatusModal = ({ type, message, onClose }: StatusModalProps) => {
  const styles = {
    loading: {
      bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      title: "Processing...",
      text: "text-white",
      icon: "/icons/loading.gif",
    },
    success: {
      bg: "bg-gradient-to-br from-white to-dark-200",
      title: "Success!",
      text: "text-green-500",
      icon: "/icons/success.png",
    },
    error: {
      bg: "bg-gradient-to-br from-white to-dark-200",
      title: "Payment Failed",
      text: "text-red-500",
      icon: "/icons/error.png",
    },
  };

  const current = styles[type];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`max-w-3xl rounded-sm p-6 text-center shadow-xl ${current.bg}`}>
        <div className="flex justify-center mb-6">
          <img src={current.icon} alt="status" className="w-20 h-20 object-contain" />
        </div>

        <h3 className={`text-xl font-bold mb-2 ${current.text}`}>{current.title}</h3>
        <p className={`text-sm opacity-90 ${current.text}`}>{message}</p>

        {type !== "loading" && (
          <button
            onClick={onClose}
            className="mt-6 bg-white text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default function DonateForm() {
  const donationsActive = process.env.NEXT_PUBLIC_DONATIONS_ENABLED === "true";
  const paybillNumber = process.env.NEXT_PUBLIC_PAYBILL_NUMBER || "000000";
  const paybillAccount = process.env.NEXT_PUBLIC_PAYBILL_ACCOUNT || "DONATION";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState(countries[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const [modalType, setModalType] = useState<"loading" | "success" | "error" | null>(null);
  const [modalMessage, setModalMessage] = useState("");

  const [errors, setErrors] = useState({
    phone: "",
    amount: "",
    name: "",
    email: "",
  });

  // --------------------------
  // Utilities
  // --------------------------
  const normalizePhone = (phone: string) => {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = cleaned.slice(1);
    return `${country.code}${cleaned}`;
  };

  const validate = () => {
    let valid = true;
    const newErrors = { phone: "", amount: "", name: "", email: "" };
    const finalAmount = amount || Number(customAmount);

    if (!finalAmount) {
      newErrors.amount = "Please enter donation amount";
      valid = false;
    }

    if (!phone.match(/^0?\d{9}$/)) {
      newErrors.phone = "Enter valid phone e.g 0712345678";
      valid = false;
    }

    if (!anonymous) {
      if (!name) {
        newErrors.name = "Name required";
        valid = false;
      }
      if (!email.match(/^\S+@\S+\.\S+$/)) {
        newErrors.email = "Valid email required";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const resetState = () => {
    setProcessing(false);
    setCheckoutRequestId(null);
    setModalType(null);
    setModalMessage("");
  };

  // --------------------------
  // Polling
  // --------------------------
  const startPolling = (checkoutId: string) => {
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const res = await ConfirmStatus(checkoutId);

        if (res.result?.state === "COMPLETED") {
          clearInterval(interval);
          setModalType("success");
          setModalMessage("Your payment was completed successfully.");
          setTimeout(resetState, 2000);
        }

        if (res.result?.state === "FAILED") {
          clearInterval(interval);
          setModalType("error");
          setModalMessage("Payment failed or cancelled.");
          setTimeout(resetState, 2000);
        }

        if (attempts > 40) {
          clearInterval(interval);
          setModalType("error");
          setModalMessage("Request timed out. Please try again.");
          setTimeout(resetState, 2000);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);
  };

  // --------------------------
  // STK Push
  // --------------------------
  const triggerSTKPush = async () => {
    if (!validate()) return;

    const finalAmount = amount || Number(customAmount);
    const formattedPhone = normalizePhone(phone);

    try {
      setProcessing(true);
      setModalType("loading");
      setModalMessage("Sending STK Push. Check your phone...");

      const response = await PostMpesa({
        name: anonymous ? "Anonymous Donor" : name,
        phone: formattedPhone,
        email: anonymous ? "anonymous@donor.com" : email,
        amount: finalAmount,
      });

      if (response.errors) throw new Error(response.errors[0]?.message);

      const checkoutId = response.result.id;
      setCheckoutRequestId(checkoutId);
      setModalMessage("Check your phone and enter PIN");

      startPolling(checkoutId);
    } catch (error: any) {
      console.error(error);
      setModalType("error");
      setModalMessage(error.message || "Error initiating STK Push");
      setTimeout(resetState, 2000);
    }
  };

  useEffect(() => {
    if (anonymous) {
      setName("Anonymous Donor");
      setEmail("anonymous@donor.com");
    }
  }, [anonymous]);

  // --------------------------
  // UI
  // --------------------------
  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-4 py-0 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-xl border-t-4 border-gold-600 p-4 md:p-10">

        {/* LEFT SIDE FORM */}

        <div className="flex flex-col relative">
          {!donationsActive && (
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 mb-6 rounded">
              🚧 Donations are not yet active. Please check back soon.
            </div>
          )}

          {/* NAME */}
          <div className={`flex flex-col ${!donationsActive ? "opacity-50 blur-sm pointer-events-none" : ""}`}>
            <h2 className="text-2xl font-bold mb-6 text-primary-800">Online Donation</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              disabled={anonymous}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-4 py-3 mb-3"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              disabled={anonymous}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-4 py-3"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <label className="flex items-center gap-2 mt-3">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
              Donate anonymously
            </label>

            <input
              type="number"
              placeholder="Custom Amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount(null);
              }}
              className="w-full border rounded px-4 py-3 mt-4"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

            {/* PHONE INPUT WITH COUNTRY */}
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">Phone Number</label>

              <div className="flex gap-1">
                {/* COUNTRY SELECT */}
                <div
                  className="relative flex items-center border rounded-l px-3 bg-white cursor-pointer"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                >
                  <ReactCountryFlag svg countryCode={country.iso} className="mr-2" />
                  +{country.code}
                  <ChevronDown className="ml-2 w-4 h-4" />

                  {countryDropdownOpen && (
                    <div className="absolute top-full left-0 w-40 bg-white border shadow z-20">
                      {countries.map((c) => (
                        <div
                          key={c.code}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setCountry(c);
                            setCountryDropdownOpen(false);
                          }}
                        >
                          <ReactCountryFlag svg countryCode={c.iso} className="mr-2" />
                          (+{c.code})
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PHONE INPUT */}
                <input
                  type="tel"
                  placeholder="07XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 border rounded-r px-4 py-3"
                />
              </div>

              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Image src="/payments/mpesa.png" width={70} height={35} alt="M-Pesa" />
            </div>

            <button
              onClick={triggerSTKPush}
              disabled={!donationsActive || processing || !!checkoutRequestId}
              className="mt-6 w-full bg-gold-600 hover:bg-gold-700 text-white py-4 rounded font-semibold"
            >
              {processing
                ? "Processing Payment..."
                : checkoutRequestId
                  ? "Waiting for M-Pesa confirmation..."
                  : "Donate Now"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={`bg-dark-50 rounded-lg border p-3 md:p-8 transition    ${!donationsActive ? "blur-sm opacity-40 pointer-events-none" : ""}`}>
          <h3 className="text-xl font-bold mb-6 text-primary-800">Donate via M-Pesa Paybill</h3>

          <div className="space-y-4">
            <p>1. Go to M-Pesa</p>
            <p>2. Select Lipa na M-Pesa</p>
            <p>3. Select Paybill</p>
          </div>

          <div className="bg-white border rounded p-4 mt-6 text-center">
            <p className="text-sm">Business Number</p>
            <p className="text-3xl font-bold text-green-700">{paybillNumber}</p>
          </div>

          <div className="bg-white border rounded p-4 mt-4 text-center">
            <p className="text-sm">Account Number</p>
            <p className="text-2xl font-bold">{paybillAccount}</p>
          </div>

          <div className="space-y-4 pt-4">
            <p>4. Enter the amount</p>
            <p>5. Enter your PIN and confirm</p>
          </div>

          <div className="flex justify-center mt-8">
            <Image src="/payments/mpesa.png" width={120} height={50} alt="M-Pesa" />
          </div>
        </div>
      </div>

      {modalType && (
        <StatusModal type={modalType} message={modalMessage} onClose={resetState} />
      )}
    </div>
  );
}