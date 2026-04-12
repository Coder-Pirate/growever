import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
    images: string[];
    alt?: string;
};

export default function ImageSlider({ images, alt = '' }: Props) {
    const [current, setCurrent] = useState(0);

    const prev = useCallback(() => {
        setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    }, [images.length]);

    const next = useCallback(() => {
        setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, [images.length]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next]);

    if (images.length === 0) return null;

    if (images.length === 1) {
        return (
            <div className="overflow-hidden rounded-2xl">
                <img src={images[0]} alt={alt} className="w-full object-cover" />
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* Main image */}
            <div className="group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                <img
                    src={images[current]}
                    alt={`${alt} - ${current + 1}`}
                    className="w-full object-cover transition-opacity duration-300"
                />

                {/* Prev / Next buttons */}
                <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>

                {/* Counter badge */}
                <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {current + 1} / {images.length}
                </span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setCurrent(i)}
                        className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                            i === current
                                ? 'border-sky-500 ring-2 ring-sky-500/30'
                                : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                        <img src={img} alt="" className="h-16 w-20 object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
