"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSubscription } from "@apollo/client/react";
import { MPESA_PAYMENT_SUBSCRIPTION } from "@/graphql/donations";
import { PostMpesa } from "@/data/mpesa";

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

    const donationsActive =
        process.env.NEXT_PUBLIC_DONATIONS_ACTIVE === "true";

    const paybillNumber =
        process.env.NEXT_PUBLIC_PAYBILL_NUMBER || "000000";

    const paybillAccount =
        process.env.NEXT_PUBLIC_PAYBILL_ACCOUNT || "DONATION";

    const [amount, setAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);

    const [statusMessage, setStatusMessage] = useState("");
    const [processing, setProcessing] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successDetails, setSuccessDetails] = useState<{
        amount: number;
        receipt: string;
    } | null>(null);

    const { data } = useSubscription<
        MpesaPaymentUpdatesResponse,
        MpesaPaymentUpdatesVariables
    >(MPESA_PAYMENT_SUBSCRIPTION, {
        variables: { checkoutRequestId: checkoutRequestId! },
        skip: !checkoutRequestId,
    });

    useEffect(() => {
        if (!data) return;

        const update = data.mpesaPaymentUpdates;

        if (update.status === "SUCCESS") {
            setProcessing(false);

            setSuccessDetails({
                amount: update.amount!,
                receipt: update.receipt!,
            });

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

        if (!finalAmount) {
            alert("Enter donation amount");
            return;
        }

        if (!phoneNumber.match(/^2547\d{8}$/)) {
            alert("Enter valid Kenyan phone number");
            return;
        }

        try {

            setProcessing(true);

            const response = await PostMpesa({
                name: "Donor",
                phone: phoneNumber,
                email: "donor@mwembe.org",
                district: "",
                church: "",
                lines: [
                    {
                        code: "DONATION",
                        amount: finalAmount,
                    },
                ],
                errored: false,
                save: true,
            });

            if (response.errors) {
                setProcessing(false);
                alert(response.errors[0]?.message || "Failed to initiate payment");
                return;
            }

            const result = response.result;

            setCheckoutRequestId(result.id);

            setStatusMessage(
                "📲 STK Push sent. Check your phone to complete payment."
            );

        } catch (error) {

            console.error(error);
            setProcessing(false);
            alert("Error initiating STK Push");

        }
    };

    return (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-white shadow-xl border-t-4 border-gold-600 p-10">

            {/* LEFT — FORM */}

            <div className="relative">

                <h2 className="text-2xl font-extrabold mb-6 text-primary-800">
                    Online Donation
                </h2>

                {!donationsActive && (
                    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 mb-6 rounded">
                        🚧 Donations are not yet active. Please check back soon.
                    </div>
                )}

                <div className={`${!donationsActive ? "opacity-50 pointer-events-none" : ""}`}>

                    {/* Amount Buttons */}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[500, 1000, 2500, 5000].map((preset) => (
                            <button
                                key={preset}
                                onClick={() => {
                                    setAmount(preset);
                                    setCustomAmount("");
                                }}
                                className={`border py-3 font-bold ${amount === preset
                                        ? "bg-primary-800 text-white"
                                        : "border-primary-800 hover:bg-primary-800 hover:text-white"
                                    }`}
                            >
                                KES {preset}
                            </button>
                        ))}
                    </div>

                    <input
                        type="number"
                        placeholder="Custom Amount (KES)"
                        value={customAmount}
                        onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setAmount(null);
                        }}
                        className="w-full border px-4 py-3 mb-6"
                    />

                    <input
                        placeholder="M-Pesa Phone (2547XXXXXXXX)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full border px-4 py-3 mb-6"
                    />

                    <div className="flex items-center gap-4 mb-6">
                        <Image
                            src="/payments/mpesa.png"
                            width={50}
                            height={30}
                            alt="M-Pesa"
                        />
                    </div>

                    <button
                        disabled={processing || !!checkoutRequestId}
                        onClick={triggerSTKPush}
                        className="w-full py-4 font-bold text-white rounded bg-gold-600 hover:bg-gold-700"
                    >
                        {processing
                            ? "Processing Payment..."
                            : checkoutRequestId
                                ? "Waiting for M-Pesa confirmation..."
                                : "DONATE NOW"}
                    </button>

                </div>

            </div>

            {/* RIGHT — PAYBILL */}

            <div className="relative">

                {!donationsActive && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">

                        <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow text-center max-w-xs">

                            <p className="font-semibold text-primary-800">
                                Donations launching soon
                            </p>

                            <p className="text-sm text-slate-600 mt-2">
                                Paybill instructions will become available once donations are activated.
                            </p>

                        </div>

                    </div>
                )}

                <div className={`${!donationsActive ? "blur-md opacity-50 select-none" : ""} bg-slate-50 p-8 rounded-lg border`}>

                    <h3 className="text-xl font-bold mb-6 text-primary-800">
                        Donate via M-Pesa Paybill
                    </h3>

                    <div className="space-y-4 text-lg">

                        <p><b>1.</b> Go to M-Pesa on your phone</p>
                        <p><b>2.</b> Select Lipa na M-Pesa</p>
                        <p><b>3.</b> Select Paybill</p>

                        <div className="bg-white p-4 border rounded text-center">
                            <p className="text-sm text-slate-500">Business Number</p>
                            <p className="text-3xl font-bold text-green-700">
                                {paybillNumber}
                            </p>
                        </div>

                        <div className="bg-white p-4 border rounded text-center">
                            <p className="text-sm text-slate-500">Account Number</p>
                            <p className="text-2xl font-bold">
                                {paybillAccount}
                            </p>
                        </div>

                        <p><b>4.</b> Enter the amount</p>
                        <p><b>5.</b> Enter your PIN and confirm</p>

                    </div>

                    <div className="mt-8 flex justify-center">
                        <Image
                            src="/payments/mpesa.png"
                            width={100}
                            height={40}
                            alt="M-Pesa"
                        />
                    </div>

                </div>

            </div>

            {/* SUCCESS MODAL */}

            {showSuccessModal && successDetails && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                    <div className="bg-white p-8 rounded-lg text-center max-w-md w-full">

                        <h3 className="text-xl font-bold text-green-600 mb-4">
                            Payment Successful
                        </h3>

                        <p>Amount: <b>KES {successDetails.amount}</b></p>

                        <p className="mb-6">
                            Receipt: <b>{successDetails.receipt}</b>
                        </p>

                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="bg-primary-800 text-white px-6 py-2 rounded"
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}