"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { useSubscription } from "@apollo/client/react";
import { MPESA_PAYMENT_SUBSCRIPTION } from "@/graphql/donations";
import { PostMpesa, FetchTransactionReceipt } from "@/data/mpesa";
import { ChevronDown } from "lucide-react";

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

const countries = [
    { name: "Kenya", code: "254", iso: "KE" },
    { name: "Tanzania", code: "255", iso: "TZ" },
    { name: "Ethiopia", code: "251", iso: "ET" },
    { name: "Rwanda", code: "250", iso: "RW" },
    { name: "Mozambique", code: "258", iso: "MZ" },
];

export default function DonateForm() {

    const donationsActive =
        process.env.NEXT_PUBLIC_DONATIONS_ENABLED === "true";

    const paybillNumber =
        process.env.NEXT_PUBLIC_PAYBILL_NUMBER || "000000";

    const paybillAccount =
        process.env.NEXT_PUBLIC_PAYBILL_ACCOUNT || "DONATION";


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    const [amount, setAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");

    const [phone, setPhone] = useState("");

    const [country, setCountry] = useState(countries[0]);
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

    const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(
        null
    );

    const [processing, setProcessing] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const [payload, setPayload] = useState<any>(null);

    const [errors, setErrors] = useState({
        phone: "",
        amount: "",
        name: "",
        email: "",
    });

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

        if (update.status === "SUCCESS" && update.receipt) {

            const verifyReceipt = async () => {

                setStatusMessage("🔎 Verifying payment receipt...");

                try {

                    const receiptResponse = await FetchTransactionReceipt(update.receipt!);

                    if (receiptResponse.result) {

                        setProcessing(false);

                        const paymentPayload = {
                            name,
                            email,
                            phone,
                            amount: update.amount,
                            receipt: update.receipt,
                        };

                        setPayload(paymentPayload);

                        setSuccessDetails({
                            amount: update.amount!,
                            receipt: update.receipt!,
                        });

                        setShowSuccessModal(true);

                        setCheckoutRequestId(null);

                        setStatusMessage("");

                    } else {

                        // If receipt not found, continue processing until backend updates
                        setStatusMessage("⏳ Waiting for transaction confirmation...");
                    }

                } catch (err) {

                    console.error("Receipt verification failed", err);
                    setStatusMessage("❌ Error verifying receipt.");
                    setProcessing(false);
                    setCheckoutRequestId(null);
                }

            };

            verifyReceipt();

        }

        if (update.status === "FAILED") {

            setProcessing(false);

            setCheckoutRequestId(null);

            setStatusMessage("❌ Payment failed or cancelled.");

        }

    }, [data]);


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


    const triggerSTKPush = async () => {

        if (!validate()) return;

        const finalAmount = amount || Number(customAmount);

        const formattedPhone = normalizePhone(phone);

        try {

            setProcessing(true);

            const response = await PostMpesa({

                name: anonymous ? "Anonymous Donor" : name,

                phone: formattedPhone,

                email: anonymous ? "anonymous@donor.com" : email,

                amount: finalAmount,

            });

            console.log(response);

            if (response.errors) {

                setProcessing(false);

                alert(response.errors[0]?.message || "Failed to initiate payment");

                return;

            }

            setCheckoutRequestId(response.result.id);

            setStatusMessage(
                "📲 STK Push sent. Check your phone to complete payment."
            );

        } catch (error) {

            console.error(error);

            setProcessing(false);

            alert("Error initiating STK Push");

        }

    };


    useEffect(() => {

        if (anonymous) {

            setName("Anonymous Donor");

            setEmail("anonymous@donor.com");

        }

    }, [anonymous]);


    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white shadow-xl border-t-4 border-gold-600 p-6 md:p-10">

                {/* LEFT SIDE FORM */}

                <div className="flex flex-col relative">

                    <h2 className="text-2xl font-bold mb-6 text-primary-800">
                        Online Donation
                    </h2>

                    {/* NAME */}

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        disabled={anonymous}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded px-4 py-3 mb-3"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mb-2">{errors.name}</p>
                    )}

                    {/* EMAIL */}

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        disabled={anonymous}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-4 py-3"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}

                    {/* ANONYMOUS */}

                    <label className="flex items-center gap-2 mt-3 text-sm">
                        <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={(e) => setAnonymous(e.target.checked)}
                        />
                        Donate anonymously
                    </label>


                    {/* AMOUNT */}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 mt-6">

                        {[500, 1000, 2500, 5000].map((preset) => (

                            <button
                                key={preset}
                                onClick={() => {
                                    setAmount(preset);
                                    setCustomAmount("");
                                }}
                                className={`py-3 font-semibold border rounded transition 
                    ${amount === preset
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
                        placeholder="Custom Amount"
                        value={customAmount}
                        onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setAmount(null);
                        }}
                        className="w-full border rounded px-4 py-3"
                    />


                    {/* PHONE */}

                    <div className="mt-6">

                        <label className="block text-sm font-semibold mb-2">
                            Phone Number
                        </label>

                        <div className="flex w-full gap-1">

                            <div
                                className="relative flex items-center border rounded-l px-3 bg-white cursor-pointer"
                                onClick={() =>
                                    setCountryDropdownOpen(!countryDropdownOpen)
                                }
                            >
                                <ReactCountryFlag
                                    svg
                                    countryCode={country.iso}
                                    style={{ width: "1.3em", height: "1.3em" }}
                                    className="mr-2"
                                />

                                +{country.code}

                                <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />

                                {countryDropdownOpen && (
                                    <div className="absolute top-full left-0 w-40 bg-white border rounded shadow max-h-40 overflow-auto z-20">

                                        {countries.map((c) => (

                                            <div
                                                key={c.code}
                                                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {
                                                    setCountry(c);
                                                    setCountryDropdownOpen(false);
                                                }}
                                            >
                                                <ReactCountryFlag
                                                    svg
                                                    countryCode={c.iso}
                                                    style={{
                                                        width: "1.3em",
                                                        height: "1.3em",
                                                    }}
                                                    className="mr-2"
                                                />

                                                (+{c.code})
                                            </div>

                                        ))}

                                    </div>
                                )}
                            </div>

                            <input
                                type="tel"
                                placeholder="07XXXXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="flex-1 border rounded-r px-4 py-3"
                            />

                        </div>

                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}

                    </div>


                    {/* MPESA LOGO */}

                    <div className="flex items-center gap-3 mt-6">

                        <Image
                            src="/payments/mpesa.png"
                            width={70}
                            height={35}
                            alt="M-Pesa"
                        />

                    </div>


                    <button
                        onClick={triggerSTKPush}
                        disabled={!donationsActive || processing || !!checkoutRequestId}
                        className="mt-6 w-full bg-gold-600 hover:bg-gold-700 text-white py-4 rounded font-semibold transition"
                    >
                        {processing
                            ? "Processing Payment..."
                            : checkoutRequestId
                                ? "Waiting for M-Pesa confirmation..."
                                : "Donate Now"}
                    </button>


                    {statusMessage && (
                        <p className="mt-3 text-center text-slate-500">{statusMessage}</p>
                    )}

                </div>
                {/* RIGHT SIDE PAYBILL */}
                <div className={`bg-slate-50 rounded-lg border p-6 md:p-8 transition 
                         ${!donationsActive ? "blur-sm opacity-40 pointer-events-none" : ""}`}>

                    <h3 className="text-xl font-bold mb-6 text-primary-800">
                        Donate via M-Pesa Paybill
                    </h3>

                    <div className="space-y-4 text-gray-700">
                        <p>1. Go to M-Pesa</p>
                        <p>2. Select Lipa na M-Pesa</p>
                        <p>3. Select Paybill</p>
                    </div>

                    <div className="bg-white border rounded p-4 mt-6 text-center">
                        <p className="text-sm text-gray-500">Business Number</p>
                        <p className="text-3xl font-bold text-green-700">{paybillNumber}</p>
                    </div>

                    <div className="bg-white border rounded p-4 mt-4 text-center">
                        <p className="text-sm text-gray-500">Account Number</p>
                        <p className="text-2xl font-bold">{paybillAccount}</p>
                    </div>
                    <div className="space-y-4 pt-4">
                        <p><b>4.</b> Enter the amount</p>
                        <p><b>5.</b> Enter your PIN and confirm</p>
                    </div>
                    {/* M-Pesa logo */}
                    <div className="flex justify-center mt-8">
                        <Image
                            src="/payments/mpesa.png"
                            width={120}
                            height={50}
                            alt="M-Pesa"
                        />
                    </div>
                </div>


                {/* PAYLOAD DISPLAY WHEN PAYMENT COMPLETES */}

                {payload && (

                    <div className="bg-green-50 border border-green-200 p-6 rounded-lg mt-10">

                        <h3 className="text-lg font-bold mb-4 text-green-700">
                            Payment Payload
                        </h3>

                        <pre className="text-sm bg-white p-4 rounded overflow-auto">
                            {JSON.stringify(payload, null, 2)}
                        </pre>

                    </div>

                )}

            </div>


            {/* SUCCESS MODAL */}

            {showSuccessModal && successDetails && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

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