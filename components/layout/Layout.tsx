import { ReactNode } from "react"
import Footer from '@/components/layout/Footer'

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen w-full bg-[#0F172A] text-white">
            {/* <Navbar /> */}
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}
