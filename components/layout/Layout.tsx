import { ReactNode } from "react"
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer'

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-[#0D1B2A] text-white">
            <Navbar />
            <main className="flex-grow container mx-auto"
            // className="flex-grow container mx-auto px-4 py-6"
            >
                {children}
            </main>
            <Footer />
        </div>
    )
}