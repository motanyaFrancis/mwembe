import { privacyPolicy } from "@/data/privacyPolicyData";

function PrivacyOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white max-w-3xl w-[90%] max-h-[85vh] overflow-y-auto p-10 shadow-2xl z-10">
        <h2 className="text-2xl font-black mb-6">{privacyPolicy.title}</h2>
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          {privacyPolicy.sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-primary-800 mb-2">{section.heading}</h3>
              <p className="whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-8 bg-primary-800 text-white px-6 py-3 font-bold uppercase hover:bg-primary-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PrivacyOverlay;