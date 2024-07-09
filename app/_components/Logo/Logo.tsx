import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3">
      <Image src={logo} alt="logo" width={40} height={40} />
      <span className="font-bold">Green Haven</span>
    </Link>
  );
}

export default Logo;
