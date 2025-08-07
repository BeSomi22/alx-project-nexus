import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiUser, FiSearch, FiX, FiLogOut } from "react-icons/fi";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";

export default function Navbar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navLinks = [
        { href: "/dashboard", label: "Home" },
        { href: "/favorites", label: "Favorites" },
    ];

    // Check login status on mount
    useEffect(() => {
        const token = localStorage.getItem("cinepick_token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("cinepick_token");
        setIsLoggedIn(false);
        router.push("/auth/signin");
    };

    return (
        <div className="fixed sm:top-2.5 top-3 left-1/2 transform -translate-x-1/2 z-50 w-[98%] max-w-4xl bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-3xl flex justify-between items-center">

            {/* Logo */}
            <div className="flex items-center gap-2">
                <Logo />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 text-white flex-1 justify-center ml-6">
                {navLinks.map(({ href, label }) => (
                    <Link key={href} href={href} className="text-sm font-semibold hover:text-[#FFC107] transition">
                        {label}
                    </Link>
                ))}

                {/* Search */}
                <div className="relative ml-6 w-48 sm:w-60">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="search-input w-full pl-4 pr-12 py-2 rounded-full bg-black/40 text-white placeholder-gray-400 backdrop-blur-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFC107] shadow-sm transition-all duration-300"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const value = (e.target as HTMLInputElement).value.trim();
                                if (value) {
                                    router.push(`/search?q=${encodeURIComponent(value)}`);
                                    (e.target as HTMLInputElement).value = "";
                                }
                            }
                        }}
                    />

                    {/* Search Icon Button */}
                    <button
                        onClick={() => {
                            const input = document.querySelector<HTMLInputElement>(".search-input");
                            if (input && input.value.trim()) {
                                router.push(`/search?q=${encodeURIComponent(input.value.trim())}`);
                                input.value = "";
                            }
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFC107] hover:bg-yellow-500 p-1.5 rounded-full transition-colors duration-200"
                    >
                        <FiSearch size={18} className="text-black" />
                    </button>
                </div>
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center ml-6">
                {isLoggedIn ? (
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-yellow-400 hover:text-yellow-300">
                        <FiLogOut size={22} />
                    </Button>
                ) : (
                    <>
                        <Link href="/auth/signin">
                            <Button variant="primary" size="sm" className="mx-1">Sign In</Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button variant="outline" size="sm" className="mx-1">Sign Up</Button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Right Side */}
            <div className="flex lg:hidden items-center gap-3 mx-4">
                <Button variant="ghost" size="md" onClick={() => setSearchOpen(v => !v)} className="text-white p-1">
                    <FiSearch size={22} />
                </Button>

                {isLoggedIn ? (
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-yellow-400 p-1">
                        <FiLogOut size={22} />
                    </Button>
                ) : (
                    <Link href="/auth/signin">
                        <Button variant="ghost" size="sm" className="text-yellow-400 p-1">
                            <FiUser size={22} />
                        </Button>
                    </Link>
                )}

                {/* Hamburger */}
                <button onClick={() => setOpen(!open)} className="relative w-5 h-5 flex flex-col justify-between items-center group">
                    <span className={`h-1 w-8 bg-gray-200 rounded-lg transform transition duration-300 ${open ? "rotate-45 translate-y-3" : ""}`} />
                    <span className={`h-1 w-8 bg-gray-200 rounded-lg transition-all ${open ? "opacity-0" : ""}`} />
                    <span className={`h-1 w-8 bg-gray-200 rounded-lg transform transition duration-300 ${open ? "-rotate-45 -translate-y-3" : ""}`} />
                </button>
            </div>

            {/* Mobile Search */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-3xl p-2 flex items-center shadow-md z-50 lg:hidden ">
                        <FiSearch size={18} className="ml-2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="flex-grow pl-3 py-2 rounded-3xl text-black outline-none"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const value = (e.target as HTMLInputElement).value.trim();
                                    if (value) {
                                        router.push(`/search?q=${encodeURIComponent(value)}`);
                                        (e.target as HTMLInputElement).value = "";
                                        setSearchOpen(false);
                                    }
                                }
                            }}
                            autoFocus
                        />
                        <Button variant="ghost" size="md" onClick={() => setSearchOpen(false)} className="ml-2 text-gray-500">
                            <FiX size={24} />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="
                            absolute top-20 left-1/2 -translate-x-1/2 w-[90%]
                            rounded-3xl p-5 flex flex-col items-center gap-4 text-white lg:hidden
                            bg-black/40
                            backdrop-blur-md
                            border border-gray-700
                            shadow-sm
                            transition-all duration-300
                         "
                    >
                        {navLinks.map(({ href, label }) => (
                            <Link key={href} href={href} onClick={() => setOpen(false)} className="text-base font-semibold  hover:text-[#FFC107]">
                                {label}
                            </Link>
                        ))}
                        {isLoggedIn ? (
                            <Button variant="outline" size="md" onClick={handleLogout} className="w-[40%] rounded-3xl font-semibold">
                                Log Out
                            </Button>
                        ) : (
                            <>
                                <Link href="/auth/signin" onClick={() => setOpen(false)}>
                                    <Button variant="primary" size="md" className="w-full rounded-3xl font-semibold">Sign In</Button>
                                </Link>
                                <Link href="/auth/signup" onClick={() => setOpen(false)}>
                                    <Button variant="outline" size="md" className="w-full rounded-3xl font-semibold">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
