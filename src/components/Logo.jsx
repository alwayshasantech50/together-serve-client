import Link from "next/link";
import { Sprout } from "lucide-react";


const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Sprout size={28} className="text-green-600" />

      <span className="text-xl font-bold">
        Together<span className="text-green-600">Serve</span>
      </span>
    </Link>
  );
};

export default Logo;