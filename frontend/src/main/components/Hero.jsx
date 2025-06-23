import React from 'react'
import HeroVideo from '../../assets/video/fitwell-video.mp4'

const Hero = () => {
  return (
    <>
      <div  className="hero hero-bg-image hero-video">
        <div  className="hero-bg-video">
            {/* <!-- <video autoplay muted loop id="myvideo"><source src="images/hero-bg-video.mp4" type="video/mp4"></video> --> */}
            <video autoPlay muted loop id="myvideo"><source src={HeroVideo} type="video/mp4"/></video>
            {/* <div id="herovideo"  className="player" data-property={{videoURL:'74DWwSxsVSs', containment:'.hero-video', showControls:false, autoPlay:true, loop:true, vol:0, mute:false, startAt:0, stopAt:296, opacity:1, addRaster:true, quality:'large', optimizeDisplay:true}}></div> */}
            
        </div>
        <div  className="container">
            <div  className="row align-items-center">
                <div  className="col-lg-6">
                    <div  className="hero-content">
                        <div  className="section-title dark-section">
                            <h1  className="text-anime-style-2" data-cursor="-opaque">Your body can <span>stand almost</span> anything.</h1>
                            <p  className="wow fadeInUp">It's your mind that needs convincing. Push past your limits, stay committed, and watch as your body transform into powerhouse of strength and resilience. Start your journey today & truly capable of!</p>
                        </div>
                        <div  className="hero-counter-box">
                            <div  className="hero-counter-item">
                                <h3><span  className="counter">1200</span>+</h3>
                                <p>Active Members</p>
                            </div>
                            <div  className="hero-counter-item">
                                <h3><span  className="counter">12</span>+</h3>
                                <p>Certified Trainers</p>
                            </div>
                            <div  className="hero-counter-item">
                                <h3><span  className="counter">20</span>+</h3>
                                <p>Year Of Experience</p>
                            </div>
                        </div>
                        <div  className="hero-btn wow fadeInUp" data-wow-delay="0.2s">
                            <a href="/contact" className="btn-default">Get Started</a>
                            <a href="/about"  className="btn-default btn-highlighted">Explore More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Hero
