import { Fragment } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Fragment>
      <section id="hero">
        <div className="container hero">
          <div className="hero-content">
            <h1>Make Your <span>Rare</span> Portfolio with CodeRare</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, officiis!
            </p>
            <div className="hero-btns">
              <Link className="hero-btn" to="/register">
                Create account
              </Link>
              <a className="more-link" href="#about">Learn more</a>
            </div>
          </div>
          <img src="/hero-3.webp" alt="" />
        </div>
      </section>
      <section id="about">
        <div className="container about">
          <h1>About Us</h1>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
