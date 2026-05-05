"use client";

import Image from "next/image";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/hero/hero-1.png",
    alt: "Adlume Media Digital Marketing Hero",
  },
  {
    image: "/images/hero/hero-2.png",
    alt: "Adlume Media Branding Hero",
  },
  {
    image: "/images/hero/hero-3.png",
    alt: "Adlume Media Web Design Hero",
  },
  {
    image: "/images/hero/hero-4.png",
    alt: "Adlume Media Social Media Marketing Hero",
  },
  {
    image: "/images/hero/hero-5.png",
    alt: "Adlume Media Analytics Hero",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full overflow-hidden">
      <Swiper
        direction="horizontal"
        modules={[Autoplay, Pagination, Mousewheel]}
        loop={true}
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="adlume-static-hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.image}>
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.alt}
                width={1920}
                height={900}
                priority={index === 0}
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}