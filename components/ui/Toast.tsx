import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
    message: string;
    onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4 }}
                    className="fixed bottom-5 right-5 bg-[#1E293B] text-white px-6 py-3 rounded-lg shadow-lg border border-[#FFC107]">
                    <div className="flex items-center gap-3">
                        <span>✅</span>
                        <p>{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-3 text-gray-400 hover:text-white"
                    >
                        ✖
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}