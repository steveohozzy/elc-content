import Link from "next/link";

type Props = {
  currentPage: number;
  hasNextPage: boolean;
};

export function Pagination({ currentPage, hasNextPage }: Props) {
  return (
    <div className="mt-12 mb-12 flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link
          href={
            currentPage - 1 === 1
              ? "/blog"
              : `/blog/page/${currentPage - 1}`
          }
          className="rounded border px-4 py-2"
        >
          Previous
        </Link>
      ) : (
        <span className="opacity-40">Previous</span>
      )}

      <span className="text-sm opacity-70">
        Page {currentPage}
      </span>

      {hasNextPage ? (
        <Link
          href={`/blog/page/${currentPage + 1}`}
          className="rounded border px-4 py-2"
        >
          Next
        </Link>
      ) : (
        <span className="opacity-40">Next</span>
      )}
    </div>
  );
}