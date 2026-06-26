"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Their team translated a complex dispute into a calm, decisive path. Every move felt precise and deeply human.",
    name: "Clara Laurent",
    role: "Founder, Northstar Labs",
  },
  {
    quote:
      "We moved from panic to clarity within hours. The legal guidance felt premium, strategic, and immediate.",
    name: "Amine Rahal",
    role: "Managing Partner, Vertex Capital",
  },
  {
    quote:
      "An extraordinary experience: sharp counsel, immaculate documentation, and a comforting sense of control.",
    name: "Sofia Mendes",
    role: "COO, Meridian Studio",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="rounded-[36px] border border-white/10 bg-zinc-950/80 p-8 shadow-[0_0_90px_rgba(124,58,237,0.14)] backdrop-blur-xl">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">Trusted by founders</p>
          <h3 className="text-2xl font-light text-white">A premium experience under pressure</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-zinc-200 transition hover:bg-white/10"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="rounded-full border border-violet-400/30 bg-violet-500/10 p-3 text-violet-100 transition hover:bg-violet-500/20"
            aria-label="Next testimonial"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((item) => (
            <div key={item.name} className="min-w-full px-1 md:px-2">
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/8 to-violet-500/10 p-7">
                <Quote className="mb-4 text-violet-300" size={24} />
                <p className="text-xl font-light leading-8 text-zinc-100">“{item.quote}”</p>
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm text-zinc-400">{item.role}</p>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {testimonials.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2.5 rounded-full transition-all ${selectedIndex === index ? "w-8 bg-violet-400" : "w-2.5 bg-white/20"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
