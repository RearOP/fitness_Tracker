import React from 'react'
import team1 from '../../assets/images/team-1.jpg'
import team2 from '../../assets/images/team-2.jpg'
import team3 from '../../assets/images/team-3.jpg'
import team4 from '../../assets/images/team-4.jpg'

const TeamComp = () => {
  return (
    <>
      <div className="our-team">
        <div className="container">
            <div className="row section-row">
                <div className="col-lg-12">
                    <div className="section-title section-title-center">
                        <div className="section-bg-title wow fadeInUp">
                            <span>Trainers</span>
                        </div>
                        <h3 className="wow fadeInUp" data-wow-delay="0.2s">Our Trainers</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">Your Fitness Journey Starts with <span>Our Expert</span> Trainers</h2>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <div className="team-item wow fadeInUp">
                        <div className="team-image">
                            <a href="team-single.html" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src={team1} alt=""/>
                                </figure>
                            </a>
                        </div>
                        <div className="team-body">
                            <div className="team-content">
                                <p>fitness coach</p>
                                <h3><a href="team-single.html">Darlene Robertson</a></h3>
                            </div>
                            <div className="team-social-list">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                </ul>
                            </div>
                        </div>                 
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="team-item wow fadeInUp" data-wow-delay="0.2s">
                        <div className="team-image">
                            <a href="team-single.html" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src={team2} alt=""/>
                                </figure>
                            </a>
                        </div>
                        <div className="team-body">
                            <div className="team-content">
                                <p>fitness coach</p>
                                <h3><a href="team-single.html">Savannah Nguyen</a></h3>
                            </div>
                            <div className="team-social-list">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                </ul>
                            </div>
                        </div>                      
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="team-item wow fadeInUp" data-wow-delay="0.4s">
                        <div className="team-image">
                            <a href="team-single.html" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src={team3} alt=""/>
                                </figure>
                            </a>
                        </div>
                        <div className="team-body">
                            <div className="team-content">
                                <p>fitness coach</p>
                                <h3><a href="team-single.html">Cameron Williamson</a></h3>
                            </div>
                            <div className="team-social-list">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                </ul>
                            </div>
                        </div>             
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="team-item wow fadeInUp" data-wow-delay="0.6s">
                        <div className="team-image">
                            <a href="team-single.html" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src={team4} alt=""/>
                                </figure>
                            </a>
                        </div>
                        <div className="team-body">
                            <div className="team-content">
                                <p>fitness coach</p>
                                <h3><a href="team-single.html">Leslie Alexander</a></h3>
                            </div>
                            <div className="team-social-list">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                </ul>
                            </div>
                        </div>              
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default TeamComp
