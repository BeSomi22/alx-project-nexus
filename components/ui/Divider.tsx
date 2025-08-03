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
            {/* Wavy gradient background - flipped upside-down */}
            <svg
                className="absolute top-0 left-0 w-full h-full rotate-180"
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
                    d="M0,192L60,170.7C120,149,240,107,360,96C480,85,600,107,720,138.7C840,171,960,213,1080,224C1200,235,1320,213,1380,202.7L1440,192V320H0Z"
                />

                {/* Wave animation effect */}
                <motion.path
                    fill="url(#gradient)"
                    fillOpacity="0.3"
                    animate={{
                        d: [
                            "M0,192L60,170.7C120,149,240,107,360,96C480,85,600,107,720,138.7C840,171,960,213,1080,224C1200,235,1320,213,1380,202.7L1440,192V320H0Z",
                            "M0,180L80,190C160,200,320,220,480,210C640,200,800,160,960,170C1120,180,1280,220,1360,230L1440,240V320H0Z",
                            "M0,192L60,170.7C120,149,240,107,360,96C480,85,600,107,720,138.7C840,171,960,213,1080,224C1200,235,1320,213,1380,202.7L1440,192V320H0Z",
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


