import Link from "next/link";

export default function NotFound({ error }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <h2>{error?.message || "This page does not exist"}</h2>
      <Link
        href="/"
        className="rounded-lg bg-green-600 px-5 py-3 font-bold text-white transition-all duration-100 hover:bg-green-700 active:bg-green-800"
      >
        Go Back Home
      </Link>
    </div>
  );
}
