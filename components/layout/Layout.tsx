import { ReactNode } from "react"
// import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer'

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen w-full bg-[#0F172A] text-white">
            {/* <Navbar /> */}
            <main className="flex-grow w-full container mx-auto"
            >
                {children}
            </main>
            <Footer />
        </div>
    )
}