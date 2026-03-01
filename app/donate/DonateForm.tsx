"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import Image from "next/image";

interface InitiateDonationResponse {
    initiateMpesaDonation: {
        success: boolean;
        message: string;
        checkoutRequestId: string;
    };
}

const INITIATE_DONATION = gql`
  mutation InitiateDonation(
    $amount: Float!
    $phoneNumber: String
    $name: String
    $email: String
    $anonymous: Boolean!
    $paymentMethod: String!
  ) {
    initiateMpesaDonation(
      amount: $amount
      phoneNumber: $phoneNumber
      name: $name
      email: $email
      anonymous: $anonymous
      paymentMethod: $paymentMethod
    ) {
      success
      message
      checkoutRequestId
    }
  }
`;

export default function DonateForm() {
    const [amount, setAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("MPESA");


    const [initiateDonation, { loading }] = useMutation<InitiateDonationResponse>(INITIATE_DONATION);

    const handleSubmit = async () => {
        const finalAmount = amount || Number(customAmount);
        if (!finalAmount) return alert("Enter donation amount");

        try {
            const res = await initiateDonation({
                variables: {
                    amount: finalAmount,
                    phoneNumber: paymentMethod === "MPESA" ? phoneNumber : null,
                    name: anonymous ? null : name,
                    email: anonymous ? null : email,
                    anonymous,
                    paymentMethod,
                },
            });

            const response = res.data?.initiateMpesaDonation;

            if (!response) {
                alert("Unexpected server response.");
                return;
            }

            alert(response.message);
        } catch (error) {
            alert("Payment failed.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl p-10 border-t-4 border-gold-600">

            <h2 className="text-2xl font-extrabold mb-8 text-center text-primary-800">
                Make a Contribution
            </h2>

            {/* Presets */}
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

            {/* Custom */}
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

            {/* Anonymous */}
            <div className="flex items-center gap-3 mb-6">
                <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={() => setAnonymous(!anonymous)}
                />
                <label>Donate Anonymously</label>
            </div>

            {!anonymous && (
                <>
                    <input
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-4 py-3 mb-4"
                    />
                    <input
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-4 py-3 mb-4"
                    />
                </>
            )}

            {/* Payment Method */}
            <div className="space-y-4 mb-6">
                {[
                    {
                        value: "MPESA",
                        label: "M-Pesa (Instant STK Push)",
                        logos: ["/payments/mpesa.png"],
                    },
                    {
                        value: "MANUAL_MPESA",
                        label: "Manual M-Pesa Paybill",
                        logos: ["/payments/mpesa.png"],
                    },
                    {
                        value: "BANK",
                        label: "Bank Transfer",
                        logos: ["/payments/visa.png", "/payments/mastercard.png"],
                    },
                ].map((method) => {
                    const isActive = paymentMethod === method.value;

                    return (
                        <button
                            type="button"
                            key={method.value}
                            onClick={() => setPaymentMethod(method.value)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200
                    ${isActive
                                    ? "border-primary-700 bg-primary-50 shadow-md scale-[1.01]"
                                    : "border-gray-300 hover:border-primary-600 hover:shadow-sm"
                                }
                `}
                        >
                            <div className="flex items-center gap-4">
                                {/* Custom circle indicator */}
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${isActive ? "border-primary-700" : "border-gray-400"}
                        `}
                                >
                                    {isActive && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary-700" />
                                    )}
                                </div>

                                <span className="font-medium text-left">
                                    {method.label}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {method.logos.map((logo, i) => (
                                    <Image
                                        key={i}
                                        src={logo}
                                        alt="payment-logo"
                                        width={40}
                                        height={25}
                                        className="object-contain"
                                    />
                                ))}
                            </div>
                        </button>
                    );
                })}
            </div>

            {paymentMethod === "MPESA" && (
                <input
                    placeholder="M-Pesa Phone (2547XXXXXXXX)"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border px-4 py-3 mb-6"
                />
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gold-600 text-white py-4 font-bold"
            >
                {loading ? "Processing..." : "DONATE NOW"}
            </button>

            <p className="text-xs text-slate-500 mt-6 text-center">
                Contributions are secure and used responsibly.
            </p>
        </div>
    );
}