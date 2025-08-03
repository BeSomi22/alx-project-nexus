import Link from "next/link";
import Logo from "@/components/ui/logo";
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white py-10 mt-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <Logo />
          <p className="text-sm mt-3 text-gray-400">
            Your trusted movie recommendation platform. Discover, rate, and
            share your favorite films with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-[#FFC107]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="hover:text-[#FFC107]">
                Favorites
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#FFC107]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#FFC107]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/blog" className="hover:text-[#FFC107]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-[#FFC107]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#FFC107]">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-300">
            <a href="#" aria-label="Facebook" className="hover:text-[#FFC107]">
              <FiFacebook size={22} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#FFC107]">
              <FiTwitter size={22} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#FFC107]">
              <FiInstagram size={22} />
            </a>
            <a href="#" aria-label="Github" className="hover:text-[#FFC107]">
              <FiGithub size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-10 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CinePick. All Rights Reserved.
      </div>
    </footer>
  );
}
