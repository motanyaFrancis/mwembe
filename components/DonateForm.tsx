"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSubscription } from "@apollo/client/react";
import { MPESA_PAYMENT_SUBSCRIPTION } from "@/graphql/donations";

// Subscription Types
interface MpesaPaymentUpdatesResponse {
    mpesaPaymentUpdates: {
        status: "SUCCESS" | "FAILED" | string;
        message: string;
        receipt?: string;
        amount?: number;
    };
}

interface MpesaPaymentUpdatesVariables {
    checkoutRequestId: string;
}

export default function DonateForm() {
    const [amount, setAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [processing, setProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successDetails, setSuccessDetails] = useState<{ amount: number; receipt: string } | null>(null);

    // Listen for payment updates
    const { data } = useSubscription<MpesaPaymentUpdatesResponse, MpesaPaymentUpdatesVariables>(
        MPESA_PAYMENT_SUBSCRIPTION,
        { variables: { checkoutRequestId: checkoutRequestId! }, skip: !checkoutRequestId }
    );

    useEffect(() => {
        if (!data) return;

        const update = data.mpesaPaymentUpdates;

        if (update.status === "SUCCESS") {
            setProcessing(false);
            setSuccessDetails({ amount: update.amount!, receipt: update.receipt! });
            setShowSuccessModal(true);
            setCheckoutRequestId(null);
            setStatusMessage("");
        }

        if (update.status === "FAILED") {
            setProcessing(false);
            setCheckoutRequestId(null);
            setStatusMessage("❌ Payment failed or cancelled.");
        }
    }, [data]);

    const triggerSTKPush = async () => {
        const finalAmount = amount || Number(customAmount);
        if (!finalAmount) return alert("Enter donation amount");
        if (!phoneNumber.match(/^2547\d{8}$/)) return alert("Enter valid Kenyan phone number");

        try {
            setProcessing(true);
            const res = await fetch("/api/donate", {
                method: "POST",
                body: JSON.stringify({ amount: finalAmount, phoneNumber }),
                headers: { "Content-Type": "application/json" },
            });

            const result = await res.json();

            if (!res.ok || result.error) {
                setProcessing(false);
                return alert(result.error || "Failed to initiate STK Push");
            }

            const checkoutId = result.data.initiateMpesaExpressPayment.checkoutRequestId;
            setCheckoutRequestId(checkoutId);
            setStatusMessage("📲 STK Push sent. Check your phone to complete payment.");
        } catch (err) {
            setProcessing(false);
            alert("Error initiating STK Push");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl p-10 border-t-4 border-gold-600 relative">
            <h2 className="text-2xl font-extrabold mb-8 text-center text-primary-800">Make a Contribution</h2>

            {/* Presets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[500, 1000, 2500, 5000].map((preset) => (
                    <button
                        key={preset}
                        onClick={() => { setAmount(preset); setCustomAmount(""); }}
                        className={`border py-3 font-bold ${amount === preset ? "bg-primary-800 text-white" : "border-primary-800 hover:bg-primary-800 hover:text-white"}`}
                    >
                        KES {preset}
                    </button>
                ))}
            </div>

            {/* Custom amount */}
            <input
                type="number"
                placeholder="Custom Amount (KES)"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(null); }}
                className="w-full border px-4 py-3 mb-6"
            />

            {/* Phone number */}
            <input
                placeholder="M-Pesa Phone (2547XXXXXXXX)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border px-4 py-3 mb-6"
            />

            {/* Payment Method Logos */}
            <div className="flex items-center gap-4 mb-6">
                <Image src="/payments/mpesa.png" width={50} height={30} alt="M-Pesa" />
            </div>

            {/* Trigger STK Push Button */}
            <button
                onClick={triggerSTKPush}
                disabled={processing || !!checkoutRequestId}
                className={`w-full py-4 font-bold text-white rounded ${processing ? "bg-dark-400" : "bg-gold-600 hover:bg-gold-700"} transition`}
            >
                {processing ? "Processing Payment..." : checkoutRequestId ? "Waiting for M-Pesa confirmation..." : "DONATE NOW"}
            </button>

            {/* Status Message */}
            {statusMessage && <p className="text-center text-slate-500 mt-4">{statusMessage}</p>}

            {/* Success Modal */}
            {showSuccessModal && successDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full text-center shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-green-600">Payment Successful!</h3>
                        <p className="mb-2">Amount: <strong>KES {successDetails.amount}</strong></p>
                        <p className="mb-6">Receipt: <strong>{successDetails.receipt}</strong></p>
                        <button
                            className="bg-primary-800 text-white py-2 px-6 rounded hover:bg-primary-900 transition"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}