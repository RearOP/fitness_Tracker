import "../assets/css/Shownutritions.css";
import Scrollingsticker from "./components/Scrollingsticker";
import NutritionComp from "./components/NutritionComp";

const ShowNutritionLog = () => {
 

  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Nutrition <span>Log</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Nutrition <span>Log</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrollingsticker />
      <NutritionComp />
    </>
  );
};

export default ShowNutritionLog;
