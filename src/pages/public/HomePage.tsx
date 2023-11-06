import { Fragment } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Fragment>
      <section id="hero">
        <div className="container hero">
          <div className="hero-content">
            <h1>
              Make Your <span>Rare</span> Portfolio with CodeRare
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, officiis!
            </p>
            <div className="hero-btns">
              <Link className="hero-btn" to="/register">
                Create account
              </Link>
              <a className="more-link" href="#about">
                Learn more
              </a>
            </div>
          </div>
          <img src="/hero-3.webp" alt="" />
        </div>
      </section>
      <section id="about">
        <div className="container about">
          <h1>About Us</h1>
          <div className="about-div">
            <img src="/about-1.svg" alt="img" />
            <div className="content">
              <h2>Lorem ipsum dolor sit.</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Cupiditate asperiores veritatis, ad voluptatibus vero
                consequatur labore id tempore sint quis doloribus, autem
                doloremque quo quidem ex voluptatem et veniam reiciendis sequi
                dolores fuga minus accusantium iste! Optio tenetur sapiente
                tempore!
              </p>
            </div>
          </div>
          <div className="about-div">
            <div className="content">
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                molestiae hic. Voluptatibus deleniti totam incidunt odit
                consequatur sequi quod magnam veritatis ratione beatae. Sequi
                repellendus deleniti delectus quis doloremque minus laboriosam
                quod labore molestias? Sunt officia autem minima eum voluptas.
              </p>
            </div>
            <img src="/about-2.svg" alt="" />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
