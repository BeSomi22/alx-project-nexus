import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Logo from '@/components/ui/logo';
import Link from "next/link"
import Image from 'next/image';
import Toast from '@/components/ui/Toast';

export default function SignInPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [toastMessage, setToastMessage] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            // Store token
            localStorage.setItem("cinepick_token", data.token);

            // Redirect to dashboard with success query
            router.push("/dashboard?success=login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success") === "signup") {
            alert(" SignUp successful! Please sign in.");
            setTimeout(() => setToastMessage(""), 4000)
        }
    }, []);

    const handleGoogleSignIn = () => {
        // Redirect to backend Google OAuth endpoint
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`;
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 min-h-screen w-full">
                <div className="relative w-full h-full">
                    <Image
                        src="/hero-bg.jpeg"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            </div>
            {/* Alert Message */}
            <Toast message={toastMessage} onClose={() => setToastMessage("")} />
            {/* Sign In Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}

                className="relative z-10 bg-[#1E293B]/90 p-8 rounded-tl-2xl rounded-br-2xl w-full max-w-md  shadow-2xl shadow-white/20 mx-3"
            >
                <div className="flex justify-center mb-6">
                    <Logo size="text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-3">Sign In</h3>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-[#0F172A] border border-gray-600 focus:border-[#FFC107] outline-none"
                    required
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-6 rounded bg-[#0F172A] border border-gray-600 focus:border-[#FFC107] outline-none"
                    required
                />
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#FFC107] text-black font-bold rounded hover:bg-yellow-400 transition"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                {/* OR Separator */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-600" />
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-600" />
                </div>

                {/* Google Sign In */}
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
                >
                    <Image
                        src="/google-icon.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                    Continue with Google
                </motion.button>

                {/* Link to SignUp */}
                <p className="mt-6 text-center text-gray-400">
                    Don’t have an account?{" "}
                    <Link href="/auth/signup" className="text-[#FFC107] hover:underline">
                        Sign Up
                    </Link>
                </p>
            </motion.form>
        </div>
    )
}