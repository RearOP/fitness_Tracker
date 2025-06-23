import React from 'react'
import faq1 from '../../assets/images/faq-img-1.jpg'
import faq2 from '../../assets/images/faq-img-2.jpg'

const Faq = () => {
  return (
    <>
      <div className="our-faqs light-section">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="faq-image">
                        <div className="faq-img-1">
                            <figure className="image-anime reveal" style={{transform: "translate(0px, 0px)" ,  opacity: 1, visibility: "visible"}}>
                                <img src={faq1} alt=""/>
                            </figure>
                        </div>

                        <div className="faq-img-2">
                            <figure className="image-anime">
                                <img src={faq2} alt=""/>
                            </figure>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="faqs-content">
                        <div className="section-title section-title-center">
                            <div className="section-bg-title wow fadeInUp">
                                <span>faqs</span>
                            </div>
                            <h3 className="wow fadeInUp" data-wow-delay="0.2s">Frequently Asked Questions</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">Answers to your <span>most common</span> questions</h2>
                        </div>
                        <div className="faq-accordion" id="accordion">
                            <div className="accordion-item wow fadeInUp" data-wow-delay="0.4s">
                                <h2 className="accordion-header" id="heading1">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                        What types of fitness classNamees do you offer?
                                    </button>
                                </h2>
                                <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>We offer a wide variety of fitness classNamees including HIIT, yoga, spin, strength training, cardio, and more.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item wow fadeInUp" data-wow-delay="0.6s">
                                <h2 className="accordion-header" id="heading2">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                        Do I need to be a member to attend a className?
                                    </button>
                                </h2>
                                <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>We offer a wide variety of fitness classNamees including HIIT, yoga, spin, strength training, cardio, and more.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item wow fadeInUp" data-wow-delay="0.8s">
                                <h2 className="accordion-header" id="heading3">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                        What should I bring to my first workout?
                                    </button>
                                </h2>
                                <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>We offer a wide variety of fitness classNamees including HIIT, yoga, spin, strength training, cardio, and more.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item wow fadeInUp" data-wow-delay="1s">
                                <h2 className="accordion-header" id="heading4">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                        What is your cancellation policy for classNamees?
                                    </button>
                                </h2>
                                <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>We offer a wide variety of fitness classNamees including HIIT, yoga, spin, strength training, cardio, and more.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item wow fadeInUp" data-wow-delay="1s">
                                <h2 className="accordion-header" id="heading5">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                        Do you have any special offers for new members?
                                    </button>
                                </h2>
                                <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>We offer a wide variety of fitness classNamees including HIIT, yoga, spin, strength training, cardio, and more.</p>
                                    </div>
                                </div>
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

export default Faq
