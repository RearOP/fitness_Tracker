import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../assets/css/ServicesSlider.css";
import serv1 from "../../assets/images/service-1.jpg";
import serv2 from "../../assets/images/service-2.jpg";
import serv3 from "../../assets/images/service-3.jpg";
import serv4 from "../../assets/images/service-4.jpg";

const services = [
  {
    title: "Nutrition Plans",
    image: serv1,
    link: "#",
  },
  {
    title: "Group Workout",
    image: serv2,
    link: "#",
  },
  {
    title: "Personal Training",
    image: serv3,
    link: "#",
  },
  {
    title: "Muscile buliding",
    image: serv4,
    link: "#",
  },
];

const ServicesComp = () => {
  return (
    <div className="our-services light-section">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <div className="section-bg-title wow fadeInUp">
                <span>classes</span>
              </div>
              <h3 className="wow fadeInUp" data-wow-delay="0.2s">
                fitness class
              </h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Transform Your Body with Our <span>Dynamic Fitness</span>{" "}
                Classes
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="services-slider">
              <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                loop={true}
              >
                {services.map((service, i) => (
                  <SwiperSlide key={i}>
                    <div
                      className="service-card"
                      style={{ backgroundImage: `url(${service.image})` }}
                    >
                      <div className="service-overlay">
                        <h3>{service.title}</h3>
                        <div className="service-readmore-btn">
                          <a href="service-single.html" className="readmore-btn">
                            read more
                          </a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination">
                <span className="swiper-pagination-bullet"></span>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div
              className="section-footer-text wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <p>
                Expert guidance for your fitness journey.
                <a href="contact.html">Join us today and start transforming!</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesComp;
