import React from "react";

const Loader = () => {
  return (
    <>
      <div  className="preloader">
        <div  className="loading-container">
          <div  className="loading"></div>
          <div id="loading-icon">
            <img src="/images/loader.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
