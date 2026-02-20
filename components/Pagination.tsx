type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-3 mt-10">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border text-sm font-semibold transition cursor-pointer ${
              currentPage === page
                ? "bg-sky-900 text-white border-sky-900"
                : "border-sky-900 text-sky-900 hover:bg-sky-100"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
