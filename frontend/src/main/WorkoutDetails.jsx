import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Scrollingsticker from "./components/Scrollingsticker";
import axios from "axios";
import { useParams } from "react-router-dom";
const WorkoutDetails = () => {
  const [result, setresult] = useState(null);
  const { id } = useParams();
  let API_URL = "http://localhost:3000/";
  async function DetailedWorkout() {
    try {
      const res = await axios.get(`${API_URL}workouts/detailedWorkout/${id}`, {
        withCredentials: true,
      });
      setresult(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error("Fetching Failed", error);
    }
  }

  useEffect(() => {
    DetailedWorkout();
  }, []);

  if (!result) {
    return <div className="text-center py-5">Loading workout details...</div>;
  }
  const formattedDate = new Date(result.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalDuration = result.exercises.reduce(
    (sum, ex) => sum + (ex.duration || 0)
  );

  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Workout <span>details</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Workout details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrollingsticker />
      <div className="page-project-single">
        <div className="container">
          <div className="row">
            {/* LEFT SIDEBAR */}
            <div className="col-lg-4">
              <div className="page-single-sidebar">
                <div className="project-detail-list wow fadeInUp">
                  <h3>Workout Information</h3>
                  <ul>
                    <li>
                      Title :<span>{result.title}</span>
                    </li>
                    <li>
                      Type :<span>{result.type}</span>
                    </li>
                    <li>
                      Tags :
                      <span>
                        {result.tags && result.tags.length > 0
                          ? result.tags.join(", ")
                          : "None"}
                      </span>
                    </li>
                    <li>
                      Date :<span>{formattedDate}</span>
                    </li>
                    <li>
                      Total Duration:<span>{totalDuration} min</span>
                    </li>
                    <li>
                      Exercises :<span>{result.exercises.length}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="col-lg-8">
              <div className="project-single-content">
                <div className="project-single-slider">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{
                      el: ".projects-pagination",
                      clickable: true,
                    }}
                    spaceBetween={30}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    slidesPerView={1}
                    // loop={true}
                  >
                    <SwiperSlide>
                      <figure className="image-anime">
                        <img src="/images/project-2.jpg" alt="Workout slide" />
                      </figure>
                    </SwiperSlide>
                    <SwiperSlide>
                      <figure className="image-anime">
                        <img src="/images/project-1.jpg" alt="Workout slide" />
                      </figure>
                    </SwiperSlide>
                    <SwiperSlide>
                      <figure className="image-anime">
                        <img src="/images/project-3.jpg" alt="Workout slide" />
                      </figure>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              {/* Entry Section */}
              {result.exercises?.map((ex, idx) => (
                <>
                  <div className="project-entry">
                    <h2 className="text-anime-style-2">
                      {ex.name}
                      <span> {result.type}</span>
                    </h2>
                    <h4 className="text-anime-style-2">Notes:</h4>
                    <div className="project-challenge-box">
                      <p className="wow fadeInUp" data-wow-delay="0.2s">
                        {ex.notes || "No notes"}
                      </p>
                      <div
                        className="project-solution-list wow fadeInUp"
                        data-wow-delay="0.4s"
                      >
                        <ul>
                          <li>{ex.sets} sets</li>
                          <li>{ex.reps} reps</li>
                          <li>{ex.weight} kg</li>
                          <li>{ex.duration} mins</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div className="page-single-faqs">
                <div className="section-title">
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Answers to your <span>most common</span> questions
                  </h2>
                </div>
                <div className="faq-accordion" id="accordion">
                  <div className="accordion-item wow fadeInUp">
                    <h2 className="accordion-header" id="heading1">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse1"
                        aria-expanded="true"
                        aria-controls="collapse1"
                      >
                        What types of fitness classes do you offer?
                      </button>
                    </h2>
                    <div
                      id="collapse1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="heading1"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide variety of fitness classes including
                          HIIT, yoga, spin, strength training, cardio, and more.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <h2 className="accordion-header" id="heading2">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse2"
                        aria-expanded="false"
                        aria-controls="collapse2"
                      >
                        Do I need to be a member to attend a class?
                      </button>
                    </h2>
                    <div
                      id="collapse2"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading2"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide variety of fitness classes including
                          HIIT, yoga, spin, strength training, cardio, and more.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <h2 className="accordion-header" id="heading3">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse3"
                        aria-expanded="false"
                        aria-controls="collapse3"
                      >
                        What should I bring to my first workout?
                      </button>
                    </h2>
                    <div
                      id="collapse3"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading3"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide variety of fitness classes including
                          HIIT, yoga, spin, strength training, cardio, and more.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    <h2 className="accordion-header" id="heading4">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse4"
                        aria-expanded="false"
                        aria-controls="collapse4"
                      >
                        What is your cancellation policy for classes?
                      </button>
                    </h2>
                    <div
                      id="collapse4"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading4"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide variety of fitness classes including
                          HIIT, yoga, spin, strength training, cardio, and more.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item wow fadeInUp"
                    data-wow-delay="0.8s"
                  >
                    <h2 className="accordion-header" id="heading5">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse5"
                        aria-expanded="false"
                        aria-controls="collapse5"
                      >
                        Do you have any special offers for new members?
                      </button>
                    </h2>
                    <div
                      id="collapse5"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading5"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide variety of fitness classes including
                          HIIT, yoga, spin, strength training, cardio, and more.
                        </p>
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
  );
};

export default WorkoutDetails;

{
  /* <>
  <div className="page-header parallaxie">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <div className="page-header-box">
            <h1 className="text-anime-style-2" data-cursor="-opaque">
              Workout <span>details</span>
            </h1>
            <nav className="wow fadeInUp">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Workout details
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Scrollingsticker />
  <div className="page-project-single">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="page-single-sidebar">
            <div className="project-detail-list wow fadeInUp">
              <h3>Project Information</h3>
              <ul>
                <li>
                  Name :<span>Fitness Routine</span>
                </li>
                <li>
                  Budgets :<span>$5,000 USD</span>
                </li>
                <li>
                  Category :<span>Training & Group Sessions</span>
                </li>
                <li>
                  Date :<span>1 April, 2024</span>
                </li>
                <li>
                  Duration :<span>4 weeks</span>
                </li>
              </ul>
            </div>
            <div
              className="sidebar-cta-box wow fadeInUp"
              data-wow-delay="0.25s"
            >
              <div className="sidebar-cta-logo">
                <img src="images/sidebar-cta-logo.svg" alt="" />
              </div>
              <div className="cta-contact-content">
                <p>Small Steps, Big Transformations</p>
                <h3>Empowering every individual through fitness</h3>
              </div>
              <div className="cta-contact-btn">
                <a href="/contact" className="btn-default">
                  get a quote
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="project-single-content">
            <div className="project-single-slider">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                  el: ".projects-pagination",
                  clickable: true,
                }}
                spaceBetween={30}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                slidesPerView={1}
                loop={true}
              >
                <SwiperSlide>
                  <figure className="image-anime">
                    <img src="images/project-2.jpg" alt="" />
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className="image-anime">
                    <img src="images/project-3.jpg" alt="" />
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className="image-anime">
                    <img src="images/project-4.jpg" alt="" />
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className="image-anime">
                    <img src="images/project-1.jpg" alt="" />
                  </figure>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          <div className="project-entry">
            <p className="wow fadeInUp">
              The "Strength Revamp" program is designed to help individuals
              transform their strength, endurance, and overall fitness. Whether
              you’re a beginner or an experienced athlete, this program focuses
              on building a strong foundation through targeted exercises and
              progressive training. With expert guidance and a structured plan,
              participants will enhance muscle strength, improve stamina, and
              experience a significant boost in physical performance. Get ready
              to push your limits, unlock your true potential, and achieve
              lasting strength.
            </p>
            <p className="wow fadeInUp" data-wow-delay="0.2s">
              The "Strength Revamp" program is more than just a workout
              routine—it's a comprehensive approach to transforming your body
              and mind. Focusing on a mix of weight training, functional
              movements, and recovery strategies, this program is tailored to
              meet the needs of every participant.
            </p>

            <div className="project-challenge-box">
              <h2 className="text-anime-style-2">
                Project <span>challenge & solution</span>
              </h2>
              <p className="wow fadeInUp">
                Discover a comprehensive approach to health and wellness with
                our personalized programs, group sessions, and nutrition plans.
              </p>
              <h3 className="wow fadeInUp" data-wow-delay="0.2s">
                Project challenge :
              </h3>

              <div className="project-challenge-list">
                <div
                  className="project-challenge-item wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <div className="icon-box">
                    <img src="images/icon-project-challenge-1.svg" alt="" />
                  </div>
                  <div className="project-challenge-content">
                    <h3>Nutrition coaching</h3>
                    <p>We make transition smooth and hassle-free.</p>
                  </div>
                </div>
                <div
                  className="project-challenge-item wow fadeInUp"
                  data-wow-delay="0.6s"
                >
                  <div className="icon-box">
                    <img src="images/icon-project-challenge-2.svg" alt="" />
                  </div>
                  <div className="project-challenge-content">
                    <h3>Nutrition coaching</h3>
                    <p>We make transition smooth and hassle-free.</p>
                  </div>
                </div>
                <div
                  className="project-challenge-item wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  <div className="icon-box">
                    <img src="images/icon-project-challenge-3.svg" alt="" />
                  </div>
                  <div className="project-challenge-content">
                    <h3>Nutrition coaching</h3>
                    <p>We make transition smooth and hassle-free.</p>
                  </div>
                </div>
              </div>

              <h3 className="wow fadeInUp">Project solution :</h3>
              <p className="wow fadeInUp" data-wow-delay="0.2s">
                Discover a comprehensive approach to health and wellness with
                our personalized programs, group sessions, and nutrition plans.
              </p>
              <div
                className="project-solution-list wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <ul>
                  <li>Customized plans for challenges.</li>
                  <li>Seamless execution ensured.</li>
                  <li>Innovative solutions implemented.</li>
                  <li>Focused, efficient results.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="page-single-faqs">
            <div className="section-title">
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Answers to your <span>most common</span> questions
              </h2>
            </div>
            <div className="faq-accordion" id="accordion">
              <div className="accordion-item wow fadeInUp">
                <h2 className="accordion-header" id="heading1">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    aria-expanded="true"
                    aria-controls="collapse1"
                  >
                    What types of fitness classes do you offer?
                  </button>
                </h2>
                <div
                  id="collapse1"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading1"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      We offer a wide variety of fitness classes including HIIT,
                      yoga, spin, strength training, cardio, and more.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <h2 className="accordion-header" id="heading2">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse2"
                    aria-expanded="false"
                    aria-controls="collapse2"
                  >
                    Do I need to be a member to attend a class?
                  </button>
                </h2>
                <div
                  id="collapse2"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading2"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      We offer a wide variety of fitness classes including HIIT,
                      yoga, spin, strength training, cardio, and more.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <h2 className="accordion-header" id="heading3">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="false"
                    aria-controls="collapse3"
                  >
                    What should I bring to my first workout?
                  </button>
                </h2>
                <div
                  id="collapse3"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading3"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      We offer a wide variety of fitness classes including HIIT,
                      yoga, spin, strength training, cardio, and more.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <h2 className="accordion-header" id="heading4">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse4"
                    aria-expanded="false"
                    aria-controls="collapse4"
                  >
                    What is your cancellation policy for classes?
                  </button>
                </h2>
                <div
                  id="collapse4"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      We offer a wide variety of fitness classes including HIIT,
                      yoga, spin, strength training, cardio, and more.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <h2 className="accordion-header" id="heading5">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5"
                  >
                    Do you have any special offers for new members?
                  </button>
                </h2>
                <div
                  id="collapse5"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading5"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      We offer a wide variety of fitness classes including HIIT,
                      yoga, spin, strength training, cardio, and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>; */
}
