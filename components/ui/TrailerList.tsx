interface TrailerCarouselProps {
    trailerUrls: string[];
}

const TrailerList: React.FC<TrailerCarouselProps> = ({ trailerUrls }) => {
    return (
        <section className="w-full py-12 px-10">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 border-b border-[#FFC107] w-fit pb-1 flex items-center gap-2">
                    Watch Trailer
                </h2>

                <div className="space-y-8">
                    {trailerUrls.map((url, index) => (
                        <div key={index} className="w-full">
                            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                                <iframe
                                    src={url}
                                    title={`Trailer ${index + 1}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrailerList;
