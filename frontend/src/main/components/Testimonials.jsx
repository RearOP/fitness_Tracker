import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation , Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import author1 from "../../assets/images/author-1.jpg";
import author2 from "../../assets/images/author-2.jpg";

const Testimonials = () => {
  return (
    <div className="our-testimonials">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <div className="section-bg-title wow fadeInUp">
                <span>reviews</span>
              </div>
              <h3 className="wow fadeInUp" data-wow-delay="0.2s">
                Client Testimonials
              </h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Inspiring Journeys: <span>Client Testimonials</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="testimonial-slider">
              <Swiper
                modules={[Navigation , Autoplay]}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                navigation={{
                  nextEl: ".testimonial-btn-next",
                  prevEl: ".testimonial-btn-prev",
                }}
              >
                <SwiperSlide>
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <p>
                        Joining this gym has been life-changing! The trainers
                        are incredibly knowledgeable, and the community is so
                        welcoming. I've lost 15 pounds and feel stronger than
                        ever.
                      </p>
                    </div>
                    <div className="author-info">
                      <div className="author-image">
                        <figure className="image-anime">
                          <img src={author1} alt="" />
                        </figure>
                      </div>
                      <div className="author-content">
                        <h3>jemmy D</h3>
                        <p>UKco - United Kingdom Co.</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <p>
                        Joining this gym has been life-changing! The trainers
                        are incredibly knowledgeable, and the community is so
                        welcoming. I've lost 15 pounds and feel stronger than
                        ever.
                      </p>
                    </div>
                    <div className="author-info">
                      <div className="author-image">
                        <figure className="image-anime">
                          <img src={author2} alt="" />
                        </figure>
                      </div>
                      <div className="author-content">
                        <h3>eleanor pena</h3>
                        <p>BritUnion - British Union</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              <div className="testimonial-btn">
                <div className="testimonial-btn-prev"></div>
                <div className="testimonial-btn-next"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
