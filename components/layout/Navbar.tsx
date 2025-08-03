import { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiUser, FiSearch, FiX } from "react-icons/fi";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";

export default function Navbar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/favorites", label: "Favorites" },
    ];

    return (
        <div className="fixed sm:top-2.5 md:top-5.5 top-3 left-1/2 transform -translate-x-1/2 z-50 w-[98%] max-w-4xl bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-3xl flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Logo />
            </div>

            {/* Desktop Nav + Search + Auth */}
            <div className="hidden lg:flex items-center gap-6 text-white flex-1 justify-center ml-6">
                {navLinks.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`cursor-pointer text-sm sm:text-base font-semibold tracking-wide text-white
                        transition-transform duration-300 transform
                        hover:scale-110
                        hover:bg-gradient-to-tl hover:from-[#E50914] hover:via-[#FF3D3D] hover:to-[#FFC107]
                        hover:bg-clip-text hover:text-transparent mt-1.5
                        `}
                    >
                        {label}
                    </Link>
                ))}

                {/* Search bar */}
                <div className="relative ml-6 w-48 sm:w-60">
                    {/* Search Icon */}
                    <FiSearch
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="
                            w-full
                            pl-10 pr-4 py-2
                            rounded-3xl
                            text-black
                            outline-none
                            bg-white/90
                            shadow-md
                            placeholder:text-gray-500
                            focus:bg-white
                            focus:ring-2 focus:ring-[#FFC107]
                            focus:ring-opacity-80
                            transition
                            duration-300
                            "
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const target = e.target as HTMLInputElement;
                                if (target.value.trim()) {
                                    router.push(`/search?query=${encodeURIComponent(target.value.trim())}`);
                                    target.value = "";
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {/* Desktop Auth Button */}
            <div className="hidden lg:flex items-center ml-6">
                {!isLoggedIn ? (
                    <>
                        <Link href="/signin" passHref>
                            <Button variant="primary" size="md" className="mx-2" >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/signup" passHref>
                            <Button variant="outline" size="md" className="mx-2" >
                                Sign Up
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={() => setIsLoggedIn(false)} // Dummy logout
                        aria-label="User Profile"
                        title="Logout"
                        className="text-yellow-400 hover:text-yellow-300"
                    >
                        <FiUser size={24} />
                    </Button>
                )}
            </div>

            {/* Mobile Right Section: Search Icon, Auth Button or User Icon, Hamburger */}
            <div className="flex lg:hidden items-center gap-3">
                {/* Search icon toggles input */}
                <Button
                    variant="ghost"
                    size="md"
                    aria-label="Toggle search"
                    onClick={() => setSearchOpen((v) => !v)}
                    className="text-white p-1"
                >

                    <FiSearch size={22} />
                </Button>

                {/* User or Sign In */}
                {!isLoggedIn ? (
                    <Link href="/signin" passHref>
                        <Button
                            variant="primary"
                            size="sm"
                            className="rounded-3xl font-semibold tracking-wide"
                        >
                            Sign In
                        </Button>
                    </Link>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLoggedIn(false)} // Dummy logout
                        aria-label="User Profile"
                        title="Logout"
                        className="text-yellow-400 hover:text-yellow-300 p-1"
                    >
                        <FiUser size={22} />
                    </Button>
                )}

                {/* Hamburger Menu */}
                <button
                    onClick={() => setOpen(!open)}
                    className="relative w-5 h-5 flex flex-col justify-between items-center group"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`h-1 w-8 bg-gray-200 rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3" : ""}`}
                    />
                    <span
                        className={`h-1 w-8 bg-gray-200 rounded-lg transition-all duration-300 ease-in-out ${open ? "opacity-0" : ""}`}
                    />
                    <span
                        className={`h-1 w-8 bg-gray-200 rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3" : ""}`}
                    />
                </button>
            </div>

            {/* Mobile Search Input */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-white rounded-3xl p-2 flex items-center shadow-md z-50 lg:hidden"
                    >
                        <FiSearch size={18} className="ml-2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="flex-grow pl-3 py-2 rounded-3xl text-black outline-none"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const target = e.target as HTMLInputElement;
                                    if (target.value.trim()) {
                                        router.push(`/search?query=${encodeURIComponent(target.value.trim())}`);
                                        target.value = "";
                                        setSearchOpen(false);
                                    }
                                }
                            }}
                            autoFocus
                        />
                        <Button
                            variant="ghost"
                            size="md"
                            onClick={() => setSearchOpen(false)}
                            aria-label="Close search"
                            className="ml-2 text-gray-500 hover:text-gray-700 p-1"
                        >
                            <FiX size={24} />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-white/10 backdrop-blur-md rounded-3xl p-5 flex flex-col items-center gap-4 text-white lg:hidden z-40"
                    >
                        {navLinks.map(({ href, label }, index) => (
                            <motion.div
                                key={href}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{
                                    delay: index * 0.15,
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                            >
                                <Link
                                    href={href}
                                    className="cursor-pointer text-base font-semibold tracking-wide text-white
                                    transition-transform duration-300 transform
                                    hover:scale-110
                                    hover:bg-gradient-to-bl hover:from-[#FFC107] hover:via-[#FF3D3D] hover:to-[#E50914]
                                    hover:bg-clip-text hover:text-transparent mt-1.5"
                                    onClick={() => setOpen(false)}
                                >
                                    {label}
                                </Link>
                            </motion.div>
                        ))}
                        <Link href="/signup" passHref>
                            <Button
                                variant="outline"
                                size="md"
                                className="w-full rounded-3xl font-semibold tracking-wide"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
