import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

interface CarouselProps {
    children: React.ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        dragFree: true,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">{children}</div>
            </div>

            {/* Prev Button */}
            <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full hover:bg-black/70"
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full hover:bg-black/70"
            >
                ›
            </button>
        </div>
    );
}
