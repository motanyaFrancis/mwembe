import Link from "next/link"
import { Wrench, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="max-w-lg text-center">

                {/* Suggested Graphic/Icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-black text-white shadow-lg">
                    <Wrench size={42} />
                </div>

                <h1 className="mt-8 text-3xl font-bold text-gray-900">
                    We’re Experiencing a Small Technical Issue
                </h1>

                <p className="mt-4 text-gray-600 leading-relaxed">
                    It looks like this page is temporarily unavailable or currently being
                    updated. Our team is already working to resolve the issue and restore
                    everything as soon as possible.
                </p>

                <p className="mt-3 text-gray-500">
                    In the meantime, you can return to the homepage and continue browsing.
                </p>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gold-600 text-primary-50 font-black px-6 py-3 hover:border-t-4  hover:bg-gold-700 hover:border-primary-500 transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                
                </div>
            </div>
        </div>
    )
}