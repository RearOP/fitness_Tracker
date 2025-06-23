import React from 'react'
import ctaimage from "../../assets/images/cta-box-image.png"
const Cta = () => {
  return (
    <>
      <div className="cta-box parallaxie">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-8 col-md-6 order-lg-1 order-md-1 order-2">
                  
                    <div className="cta-box-image">
                        <img src={ctaimage} alt=""/>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 order-lg-2 order-md-2 order-1">
                   
                    <div className="cta-box-content">
                        <div className="section-title">
                            <h2 className="text-anime-style-2" data-cursor="-opaque">Get 30% off in <span>logoipsum</span></h2>
                        </div>
                        <div className="cta-box-body wow fadeInUp">
                            <ul>
                                <li>Unlimited Access to All Gym Facilities</li>
                                <li>Book a Personal Training Session</li>
                                <li>Experience the Best in Fitness</li>
                            </ul>
                        </div>
                        <div className="cta-btn wow fadeInUp" data-wow-delay="0.2s">
                            <a href="contact.html" className="btn-default">Get Membership</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Cta
