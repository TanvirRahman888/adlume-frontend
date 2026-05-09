"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Rahim Ahmed",
    business: "Local Restaurant Owner",
    time: "3 hours ago",
    feedback:
      "Adlume Media helped us improve our social media presence and reach more local customers. The designs were clean, professional, and result-focused. Their team was friendly, fast, and easy to communicate with throughout the whole campaign.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    business: "Fashion Boutique",
    time: "1 day ago",
    feedback:
      "Their Facebook and Instagram ad strategy helped us get more messages and sales. Communication was smooth and the team understood our brand very well.",
    rating: 5,
  },
  {
    name: "Tanvir Hasan",
    business: "Startup Founder",
    time: "2 days ago",
    feedback:
      "We needed a professional online presence, and Adlume Media delivered exactly that. Their content planning and design support were very helpful.",
    rating: 5,
  },
  {
    name: "Sadia Islam",
    business: "Beauty Salon",
    time: "4 days ago",
    feedback:
      "The team created beautiful promotional content for our salon. We started getting more inquiries from Facebook after working with them.",
    rating: 5,
  },
  {
    name: "Mahmudul Karim",
    business: "E-commerce Business",
    time: "1 week ago",
    feedback:
      "Their lead generation and ad management service helped us reach the right audience. The reports were clear and easy to understand.",
    rating: 5,
  },
  {
    name: "Farhana Akter",
    business: "Training Center",
    time: "1 week ago",
    feedback:
      "Adlume Media designed our campaign materials and managed our page professionally. We loved their creative ideas and fast support.",
    rating: 5,
  },
  {
    name: "Imran Hossain",
    business: "Real Estate Consultant",
    time: "2 weeks ago",
    feedback:
      "They helped us create a strong digital presence with better branding and content. The overall experience was professional and reliable.",
    rating: 5,
  },
];

function ReviewCard({ review, onReadMore }) {
  const isLongReview = review.feedback.length > 150;

  return (
    <div
      className="group flex h-full min-h-62.5 flex-col rounded-3xl border p-5 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        boxShadow: "0 20px 60px rgba(0, 128, 224, 0)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#0080E0] to-[#00B0F0] text-sm font-black text-white">
            {review.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black">{review.name}</h3>

          <p
            className="mt-0.5 text-xs font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            {review.time}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-[#F0B000]">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={16} fill="#F0B000" strokeWidth={2} />
        ))}
      </div>

      <p
        className={`mt-4 text-sm leading-7 ${
          isLongReview ? "line-clamp-3" : "line-clamp-5"
        }`}
        style={{ color: "var(--text-muted)" }}
      >
        {review.feedback}
      </p>

      {isLongReview && (
        <button
          type="button"
          onClick={() => onReadMore(review)}
          className="mt-2 w-fit text-sm font-black text-[#0080E0] transition duration-300 hover:text-[#F08000]"
        >
          Read more
        </button>
      )}
    </div>
  );
}

export default function ClientFeedbackSection() {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0080E0]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F08000]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex items-center justify-center rounded-full border px-5 py-2"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb, var(--card) 80%, transparent)",
            }}
          >
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00B0F0]">
              Client Feedback
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            What Our Clients Say{" "}
            <span className="bg-linear-to-r from-[#0080E0] via-[#00B0F0] to-[#F08000] bg-clip-text text-transparent">
              About Us
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg"
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
                <ReviewCard review={review} onReadMore={setSelectedReview} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close modal"
            onClick={() => setSelectedReview(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div
            className="relative z-10 w-full max-w-xl rounded-4xl border p-6 shadow-2xl md:p-8"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <button
              type="button"
              aria-label="Close review"
              onClick={() => setSelectedReview(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border transition duration-300 hover:bg-[#0080E0] hover:text-white"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 pr-12">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#0080E0] to-[#00B0F0] text-base font-black text-white">
                  {selectedReview.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black">{selectedReview.name}</h3>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {selectedReview.business} · {selectedReview.time}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1 text-[#F0B000]">
              {Array.from({ length: selectedReview.rating }).map((_, i) => (
                <Star key={i} size={20} fill="#F0B000" strokeWidth={2} />
              ))}
            </div>

            <p
              className="mt-5 text-base leading-8"
              style={{ color: "var(--text-muted)" }}
            >
              {selectedReview.feedback}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}