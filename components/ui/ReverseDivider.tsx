import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Divider() {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.2, once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    return (
        <motion.div
            ref={ref}
            className="relative w-full h-28 overflow-hidden"
            initial="hidden"
            animate={controls}
        >
            {/* Wavy gradient background with wave at top */}
            <svg
                className="absolute top-0 left-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <motion.path
                    fill="url(#gradient)"
                    fillOpacity="1"
                    variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                            pathLength: 1,
                            opacity: 1,
                            transition: {
                                pathLength: { duration: 1.5, ease: "easeInOut" },
                                opacity: { duration: 0.5 },
                            },
                        },
                    }}
                    d="M0,128L80,160C160,192,320,256,480,261.3C640,267,800,213,960,181.3C1120,149,1280,139,1360,133.3L1440,128V320H0Z"
                />

                {/* Wave animation effect */}
                <motion.path
                    fill="url(#gradient)"
                    fillOpacity="0.3"
                    animate={{
                        d: [
                            "M0,128L80,160C160,192,320,256,480,261.3C640,267,800,213,960,181.3C1120,149,1280,139,1360,133.3L1440,128V320H0Z",
                            "M0,120L90,140C180,160,360,200,540,195C720,190,900,140,1080,130C1260,120,1350,140,1440,150L1440,320H0Z",
                            "M0,128L80,160C160,192,320,256,480,261.3C640,267,800,213,960,181.3C1120,149,1280,139,1360,133.3L1440,128V320H0Z",
                        ],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut",
                    }}
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFC107" />
                        <stop offset="50%" stopColor="#FF3D3D" />
                        <stop offset="100%" stopColor="#E50914" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    );
}
