import React from 'react'
import pricing1 from "../../assets/images/icon-pricing-benefit-1.svg"
import pricing2 from "../../assets/images/icon-pricing-benefit-2.svg"
import pricing3 from "../../assets/images/icon-pricing-benefit-3.svg"

const PricingComp = () => {
  return (
    <>
      <div className="our-pricing light-section">
        <div className="container">
            <div className="row section-row">
                <div className="col-lg-12">
                    <div className="section-title section-title-center">
                        <div className="section-bg-title wow fadeInUp">
                            <span>pricing</span>
                        </div>
                        <h3 className="wow fadeInUp" data-wow-delay="0.2s">pricing plan</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">Transform Your Body with Our <span>Dynamic Fitness</span> classNamees</h2>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="pricing-item highlighted-box wow fadeInUp">
                        <div className="pricing-header">
                            <h3>Weekly pass</h3>
                            <h2>$19/<sub>week</sub></h2>
                        </div>
                        <div className="pricing-body">
                            <ul>
                                <li>Fitness Floor & Cardio</li>
                                <li>30-Minute Consultation</li>
                                <li>Club 360 className</li>
                                <li>50% Off On Guest Passes</li>
                                <li>Staffed Hours Only</li>
                            </ul>
                        </div>
                        <div className="pricing-btn">
                            <a href="contact.html" className="btn-default">Get Membership</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="pricing-item wow fadeInUp" data-wow-delay="0.2s">
                        <div className="pricing-header">
                            <h3>Monthly pass</h3>
                            <h2>$39/<sub>month</sub></h2>
                        </div>
                        <div className="pricing-body">
                            <ul>
                                <li>Fitness Floor & Cardio</li>
                                <li>30-Minute Consultation</li>
                                <li>Club 360 className</li>
                                <li>50% Off On Guest Passes</li>
                                <li>Staffed Hours Only</li>
                            </ul>
                        </div>
                        <div className="pricing-btn">
                            <a href="contact.html" className="btn-default">Get Membership</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="pricing-item wow fadeInUp" data-wow-delay="0.4s">
                        <div className="pricing-header">
                            <h3>yearly pass</h3>
                            <h2>$199/<sub>year</sub></h2>
                        </div>
                        <div className="pricing-body">
                            <ul>
                                <li>Fitness Floor & Cardio</li>
                                <li>30-Minute Consultation</li>
                                <li>Club 360 className</li>
                                <li>50% Off On Guest Passes</li>
                                <li>Staffed Hours Only</li>
                            </ul>
                        </div>
                        <div className="pricing-btn">
                            <a href="contact.html" className="btn-default">Get Membership</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="pricing-benefit-list wow fadeInUp" data-wow-delay="0.6s">
                        <ul>
                            <li><img src={pricing1} alt=""/>Get 30 day free trial</li>
                            <li><img src={pricing2} alt=""/>No any hidden fees pay</li>
                            <li><img src={pricing3} alt=""/>You can  cancel anytime </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default PricingComp
