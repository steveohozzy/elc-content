// components/pagination.tsx

import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({
  currentPage,
  totalPages,
}: Props) {
  return (
    <div className="mt-12 flex justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={
            currentPage - 1 === 1
              ? "/blog"
              : `/blog/page/${currentPage - 1}`
          }
        >
          Previous
        </Link>
      )}

      <span>
        {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={`/blog/page/${currentPage + 1}`}
        >
          Next
        </Link>
      )}
    </div>
  );
}