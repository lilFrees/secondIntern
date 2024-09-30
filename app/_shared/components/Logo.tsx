import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

function Logo({ type = "default" }: { type?: "default" | "image" }) {
  if (type === "image") {
    return (
      <Image src={logo} alt="logo" width={30} height={30} className="w-auto" />
    );
  }

  return (
    <Link href="/" className="hidden shrink-0 items-center gap-3 md:flex">
      <Image src={logo} alt="logo" width={40} height={40} className="w-auto" />
      <span className="font-bold">Green Haven</span>
    </Link>
  );
}

export default Logo;
