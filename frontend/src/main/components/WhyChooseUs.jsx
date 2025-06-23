import React from 'react'
import whyChooseImage1 from "../../assets/images/why-choose-image-1.jpg"
import whyChooseImage2 from "../../assets/images/why-choose-image-2.jpg"
import whyChooseImage3 from "../../assets/images/why-choose-image-3.jpg"
import whyChooseImage4 from "../../assets/images/why-choose-image-4.jpg"


const WhyChooseUs = () => {
  return (
    <>
      <div className="why-choose-us">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="why-choose-content">
                        <div className="section-title section-title-center">
                            <div className="section-bg-title wow fadeInUp">
                                <span>why us</span>
                            </div>
                            <h3 className="wow fadeInUp" data-wow-delay="0.2s">why choose us</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">Elevate fitness with the <span>best way</span> possible</h2>
                            <p className="wow fadeInUp" data-wow-delay="0.4s">We offer a fitness journey that's tailored to your goals, supported by professional trainers and a welcoming community. Whether it's weight loss, strength building, or overall wellness, our proven methods.</p>
                        </div>
                        <div className="why-choose-steps">
                            <div className="why-choose-step-item wow fadeInUp">
                                <div className="why-choose-step-no">
                                    <h2>01</h2>
                                </div>
                                <div className="why-choose-step-content">
                                    <h3>personalized fitness plans</h3>
                                    <p>We tailor every workout to fit your unique goals and fitness level ensuring that you make the most progress.</p>
                                </div>
                            </div>
                            <div className="why-choose-step-item wow fadeInUp" data-wow-delay="0.2s">
                                <div className="why-choose-step-no">
                                    <h2>02</h2>
                                </div>
                                <div className="why-choose-step-content">
                                    <h3>results-driven focus</h3>
                                    <p>Everything we do is designed to help you achieve measurable results, whether you're aiming for weight loss.</p>
                                </div>
                            </div>
                            <div className="why-choose-step-item wow fadeInUp" data-wow-delay="0.4s">
                                <div className="why-choose-step-no">
                                    <h2>03</h2>
                                </div>
                                <div className="why-choose-step-content">
                                    <h3>state-of-the-art equipment</h3>
                                    <p>We provide the latest in gym equipment, from cardio machines to free weights, designed to support every type.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="why-choose-image">
                        <div className="why-choose-img-box-1">
                            <div className="why-choose-img-1">
                                <figure className="image-anime reveal" style={{transform: "translate(0px, 0px)" ,  opacity: 1, visibility: "inherit"}}>
                                    <img src={whyChooseImage1} alt=""/>
                                </figure>
                            </div>

                            <div className="why-choose-img-2">
                                <figure className="image-anime reveal" style={{transform: "translate(0px, 0px)" ,  opacity: 1, visibility: "inherit"}}>
                                    <img src={whyChooseImage2} alt=""/>
                                </figure>
                            </div>
                        </div>
                        <div className="why-choose-img-box-2">
                            <div className="why-choose-img-3">
                                <figure className="image-anime reveal" style={{transform: "translate(0px, 0px)" ,  opacity: 1, visibility: "inherit"}}>
                                    <img src={whyChooseImage3} alt=""/>
                                </figure>
                            </div>

                            <div className="why-choose-img-4">
                                <figure className="image-anime reveal" style={{transform: "translate(0px, 0px)" ,  opacity: 1, visibility: "inherit"}}>
                                    <img src={whyChooseImage4} alt=""/>
                                </figure>
                            </div>
                        </div>
                        <div className="contact-now-circle">
                            <a href="contact.html"><img src="images/contact-us-circle.svg" alt=""/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default WhyChooseUs
