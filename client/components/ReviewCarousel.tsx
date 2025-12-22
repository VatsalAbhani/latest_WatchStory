import React, { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Review = {
  name: string;
  text: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
       <span
       key={i}
       className={i < rating ? "!text-google-star text-xl" : "text-offwhite/30 text-xl"}
     >
       ★
     </span>
     
      ))}
    </div>
  );
}

export default function ReviewCarousel({
  reviews,
}: {
  reviews: Review[];
}) {
  const carouselApi = useRef<any>(null);

  useEffect(() => {
    if (!carouselApi.current) return;

    const interval = setInterval(() => {
      carouselApi.current.scrollNext();
    }, 2000); // ⏱️ every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="ws-container my-16">
      {/* Header */}
      <div className="text-center mb-8">
        {/* <p className="text-sm tracking-widest uppercase text-offwhite/60 mb-2">
          Google Reviews
        </p> */}
        <div className="flex items-center justify-center gap-2 mb-2 opacity-80">
  {/* Google G Icon */}
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path fill="#4285F4" d="M24 9.5c3.54 0 6.67 1.22 9.15 3.6l6.83-6.83C35.73 2.43 30.28 0 24 0 14.6 0 6.53 5.38 2.7 13.22l7.98 6.2C12.6 13.7 17.8 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 2.9-2.2 5.36-4.7 7.02l7.27 5.64c4.25-3.92 6.23-9.7 6.23-16.91z"/>
    <path fill="#FBBC05" d="M10.68 28.92c-.5-1.5-.78-3.1-.78-4.75s.28-3.25.78-4.75l-7.98-6.2C.99 16.7 0 20.23 0 24s.99 7.3 2.7 10.78l7.98-6.2z"/>
    <path fill="#EA4335" d="M24 48c6.28 0 11.56-2.08 15.42-5.64l-7.27-5.64c-2.02 1.36-4.6 2.16-8.15 2.16-6.2 0-11.4-4.2-13.32-9.92l-7.98 6.2C6.53 42.62 14.6 48 24 48z"/>
  </svg>

  <span className="text-sm tracking-widest uppercase text-offwhite/60">
    Google Reviews
  </span>
</div>

            5.0
        <div className="flex justify-center mb-2">
          <Stars rating={5} />
        </div>

        {/* <p className="font-sans text-base sm:text-lg font-semibold">
          5.0 rated on Google · 11 verified reviews
        </p> */}
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        setApi={(api) => (carouselApi.current = api)}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((r, idx) => (
            <CarouselItem
              key={idx}
              className="basis-full md:basis-1/2 lg:basis-1/3 px-2"
            >
              <div
  className={`rounded-2xl p-6 backdrop-blur-sm border ${
    idx % 2 === 0
    
        ? "bg-card/50 border-offwhite/5"
    //   ? "bg-card/50 border-offwhite/10"
      : "bg-primary/08 border-offwhite/10"
  }`}
>

                <Stars rating={r.rating ?? 5} />

                <p className="mt-4 font-sans text-offwhite/90 leading-relaxed">
                  “{r.text}”
                </p>

                <p className="mt-6 font-sans font-semibold text-offwhite">
                  - {r.name}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
