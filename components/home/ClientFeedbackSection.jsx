"use client";

import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Rahim Ahmed",
    business: "Local Restaurant Owner",
    feedback:
      "Adlume Media helped us improve our social media presence and reach more local customers. The designs were clean, professional, and result-focused.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    business: "Fashion Boutique",
    feedback:
      "Their Facebook and Instagram ad strategy helped us get more messages and sales. Communication was smooth and the team understood our brand very well.",
    rating: 5,
  },
  {
    name: "Tanvir Hasan",
    business: "Startup Founder",
    feedback:
      "We needed a professional online presence, and Adlume Media delivered exactly that. Their content planning and design support were very helpful.",
    rating: 5,
  },
  {
    name: "Sadia Islam",
    business: "Beauty Salon",
    feedback:
      "The team created beautiful promotional content for our salon. We started getting more inquiries from Facebook after working with them.",
    rating: 5,
  },
  {
    name: "Mahmudul Karim",
    business: "E-commerce Business",
    feedback:
      "Their lead generation and ad management service helped us reach the right audience. The reports were clear and easy to understand.",
    rating: 5,
  },
  {
    name: "Farhana Akter",
    business: "Training Center",
    feedback:
      "Adlume Media designed our campaign materials and managed our page professionally. We loved their creative ideas and fast support.",
    rating: 5,
  },
  {
    name: "Imran Hossain",
    business: "Real Estate Consultant",
    feedback:
      "They helped us create a strong digital presence with better branding and content. The overall experience was professional and reliable.",
    rating: 5,
  },
];

export default function ClientFeedbackSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
            Client Feedback
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            What Our Clients Say About Us
          </h2>

          <p
            className="mt-5 text-base leading-8 md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Real feedback from businesses that trusted Adlume Media for digital
            marketing, branding, content, and growth.
          </p>
        </div>

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1180: {
                slidesPerView: 3,
              },
            }}
            className="adlume-review-swiper pb-14"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.name} className="h-auto">
                <div
                  className="group relative flex h-full min-h-82.5 flex-col overflow-hidden rounded-4xl border p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                    boxShadow: "0 20px 60px rgba(0, 128, 224, 0)",
                  }}
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#00B0F0]/0 blur-3xl transition duration-300 group-hover:bg-[#00B0F0]/20" />
                  <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-[#F08000]/0 blur-3xl transition duration-300 group-hover:bg-[#F08000]/20" />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{
                          background:
                            "color-mix(in srgb, var(--background-secondary) 75%, transparent)",
                        }}
                      >
                        <Quote
                          size={28}
                          strokeWidth={2.4}
                          className="text-[#00B0F0]"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={17}
                            fill="#F0B000"
                            strokeWidth={2}
                            className="text-[#F0B000]"
                          />
                        ))}
                      </div>
                    </div>

                    <p
                      className="mt-7 text-base leading-8"
                      style={{ color: "var(--text-muted)" }}
                    >
                      “{review.feedback}”
                    </p>

                    <div
                      className="my-7 h-px w-full"
                      style={{ background: "var(--border)" }}
                    />

                    <div className="mt-auto flex items-center gap-4">
                      <div className="flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-br from-[#0080E0] to-[#00B0F0] text-base font-black text-white">
                        {review.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <h3 className="text-base font-black transition duration-300 group-hover:text-[#00B0F0]">
                          {review.name}
                        </h3>

                        <p
                          className="mt-1 text-sm"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {review.business}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}