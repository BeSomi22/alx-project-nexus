import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
    {
        question: "What is CinePick?",
        answer:
            "CinePick is your personalized movie recommendation platform that suggests films based on your unique tastes and preferences.",
    },
    {
        question: "How does CinePick personalize recommendations?",
        answer:
            "We analyze your viewing history, ratings, and preferences using smart algorithms to recommend movies you'll truly enjoy.",
    },
    {
        question: "Is my data safe with CinePick?",
        answer:
            "Absolutely. We prioritize your privacy and never share your data without consent. Your movie preferences stay private and secure.",
    },
    {
        question: "Can I save my favorite movies on CinePick?",
        answer:
            "Yes! You can easily save and manage a list of your favorite movies to watch anytime.",
    },
    {
        question: "Does CinePick update with new movie releases?",
        answer:
            "Yes, we continuously update our database with trending and upcoming movies so you never miss out.",
    },
    {
        question: "Can I access CinePick on multiple devices?",
        answer:
            "Definitely. Your account and preferences sync across all your devices for a seamless experience.",
    },
];

function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-10 text-white">
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white border-b border-[#FFC107] pb-1 w-fit ml-20">
                    Frequently Asked Questions
                </h2>
            </div>
            <div className="max-w-3xl  mx-auto px-10 pb-1 pt-6">
                <div className="space-y-6 ">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-[#1B263B] rounded-xl p-6 cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
                            onClick={() => toggle(index)}
                            aria-expanded={activeIndex === index}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") toggle(index);
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                                <span className="text-2xl font-bold select-none text-yellow-400">
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </div>

                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.div
                                        key="content"
                                        className="text-gray-300 mt-4 text-sm leading-relaxed"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
