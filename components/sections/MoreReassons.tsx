export default function MoreReasons() {
    const reasons = [
        {
            title: "Personalized Recommendations",
            desc: "Discover movies you'll love based on your taste.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.428 15.341A8 8 0 114.572 8.659a8 8 0 0114.856 6.682z"
                    />
                </svg>
            ),
        },
        {
            title: "Stay Updated",
            desc: "Get alerts for trending and upcoming movies.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
        {
            title: "Save Your Favorites",
            desc: "Easily keep track of movies you want to watch.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            ),
        },
        {
            title: "Secure & Reliable",
            desc: "Your data and preferences are safe with us.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m1-5.2a9 9 0 11-10 0v6a9 9 0 0010 0v-6z"
                    />
                </svg>
            ),
        }
    ];

    return (
        <section className="bg-[#1B263B] py-20 px-10 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white border-b border-[#FFC107] pb-1 w-fit">
                        More Reasons to Join
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-10 lg:gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {reasons.map((reason, idx) => (
                        <div
                            key={idx}
                            className="relative p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform
                         bg-gradient-to-br from-[#0d1b2a] via-[#0d1b2a] via-60% to-[#FF3D3D] text-white min-h-[280px]"
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-left">{reason.title}</h3>
                            <p className="text-gray-400  italic text-base text-left leading-relaxed mt-6">
                                {reason.desc}
                            </p>
                            <div className="absolute bottom-6 right-6 h-12 w-12">
                                {reason.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
