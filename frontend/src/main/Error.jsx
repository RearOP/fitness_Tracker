import React from "react";
import Scrollingsticker from "./components/Scrollingsticker";
import Errorimg from '../assets/images/404-error-img.png'
const Error = () => {
  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Page not <span>found</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      404 error page
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Scrollingsticker />
      <div className="error-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="error-page-image wow fadeInUp">
                <img src={Errorimg} alt="" />
              </div>
              <div className="error-page-content">
                <div className="section-title">
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    <span>Oops!</span> page not found
                  </h2>
                </div>
                <div className="error-page-content-body">
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    The page you are looking for does not exist.
                  </p>
                  <a
                    className="btn-default wow fadeInUp"
                    data-wow-delay="0.4s"
                    href="/"
                  >
                    back to home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
