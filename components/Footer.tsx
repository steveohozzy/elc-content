import Link from "next/link";

export default async function Footer() {

  return (
    <footer className="pt-4 pb-4 text-center text-sm text-gray-800 bg-gray-100 border-t border-gray-200">
      &copy; Copyright {new Date().getFullYear()} ELC. All rights reserved.
    </footer>
  );
}