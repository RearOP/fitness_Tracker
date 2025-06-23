import React from 'react'
import img1 from '../../assets/images/about-img-1.jpg'
import img2 from '../../assets/images/about-img-2.jpg'
import img3 from '../../assets/images/about-img-3.jpg'

const AboutComp = () => {
  return (
    <>
      <div className="about-us">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="about-us-images">
                        <div className="about-img-1">
                            <figure className="image-anime reveal" style={{transform: "translate(0px, 0px)" ,  opacity: 1, visibility: "inherit"}}>
                                <img src={img1} alt=""/>
                            </figure>     
                        </div>
                        <div className="about-img-2">
                            <figure className="image-anime reveal" style={{transform: "translate(0px, 0px)" ,  opacity: 1, visibility: "inherit"}}>
                                <img src={img2} alt=""/>
                            </figure>
                        </div>
                        <div className="about-img-3">
                            <figure className="image-anime reveal"style={{transform: "translate(0px, 0px)" ,  opacity: 1, visibility: "inherit"}}>
                                <img src={img3} alt=""/>
                            </figure>     
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="about-us-content">
                        <div className="section-title">
                            <div className="section-bg-title wow fadeInUp">
                                <span>about us</span>
                            </div>
                            <h3 className="wow fadeInUp" data-wow-delay="0.2s">About us</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">Empowering you to achieve <span>your fitness</span> goals</h2>
                            <p className="wow fadeInUp" data-wow-delay="0.4s">We believe fitness is more than just a workout—it's a lifestyle. With top-of-the-line facilities, certified trainers, and a supportive community, we're here to inspire and guide you every step of the way.</p>
                        </div>
                        <div className="about-us-body wow fadeInUp" data-wow-delay="0.6s">
                            <div className="about-us-body-item">
                                <h3>Personal Trainer</h3>
                                <p>Achieve your fitness goals with the guidance of our certified trainers.</p>
                            </div>
                            <div className="about-us-body-item">
                                <h3>Cardio Programs</h3>
                                <p>From steady-state runs to interval sprints, our treadmill programs.</p>
                            </div>
                            <div className="about-us-body-item">
                                <h3>Quality Equipment</h3>
                                <p>Our gym is equipped with the latest cardio & strength machines.</p>
                            </div>
                            <div className="about-us-body-item">
                                <h3>Healthy Nutritions</h3>
                                <p>Fuel your fitness journey with customized meal plans for you.</p>
                            </div>
                        </div>
                        <div className="about-us-btn wow fadeInUp" data-wow-delay="0.8s">
                            <a href="about.html" className="btn-default">more about us</a>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}


export default AboutComp
