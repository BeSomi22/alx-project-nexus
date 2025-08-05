import Logo from '@/components/ui/logo'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

export default function SignUpPage() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirm: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Signup Failed");

            // Redirect to Signin with success query
            router.push("/auth/signin?success=signup");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleGoogleSignIn = () => {
        // Redirect to backend Google OAuth endpoint
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`;
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
            {/* Background image with overlay */}
            <div className="absolute inset-0">
                <img
                    src="/hero-bg.jpeg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            </div>

            {/* Motion applied ONLY to form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="relative z-10 bg-[#1E293B]/90 p-8 rounded-tl-2xl rounded-br-2xl w-full max-w-md  shadow-2xl shadow-white/20"
            >
                <div className="flex justify-center mb-6">
                    <Logo size="text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-3">Sign Up</h3>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="flex gap-1">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-[#0F172A] border border-gray-600 focus:border-[#FFC107] outline-none"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-[#0F172A] border border-gray-600 focus:border-[#FFC107] outline-none"
                        required
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-[#0F172A] border border-gray-600 focus:border-[#FFC107] outline-none"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-[#0F172A] border border-gray-600 focus:border-[#FFC107] outline-none"
                    required
                />
                <input
                    type="password"
                    name="password_confirm"
                    placeholder="Confirm Password"
                    value={form.password_confirm}
                    onChange={handleChange}
                    className="w-full p-3 mb-6 rounded bg-[#0F172A] border border-gray-600 focus:border-[#FFC107] outline-none"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#FFC107] text-black font-bold rounded hover:bg-yellow-400 transition"
                >
                    {loading ? "Signing Up..." : "Sign Up"}
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
                    <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </motion.button>

                {/* Already have account */}
                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-[#FFC107] hover:underline">
                        Sign In
                    </Link>
                </p>

            </motion.form>
        </div>
    );

}