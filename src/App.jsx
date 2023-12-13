import { useEffect, useRef } from "react";

import Scene from "./Scene";
import SimpleSlide from "./SimpleSlide";
import { AnimationTimeline } from "./AnimationTimeline";

// We add a CSS file here so we can style components
import "./App.css";

function getScrollProgress() {
  // This will calculate how many pixels the page is vertically
  const winScroll = window.document.documentElement.scrollTop;
  // This is responsible for subtracticing the total height of the page - where the users page is scrolled to
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  // This will calculate the final total of the percentage of how much the user has scrolled (0-1)
  return winScroll / height;
}

function App() {
  const boxRef = useRef();
  //assuming the news content section is 100vh in height
  const newsContentHeight = window.innerHeight * 3; // or a specific pixel value

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollProgress = getScrollProgress();

      // Check if the scroll position is past the news content section
      if (scrollY > newsContentHeight) {
        // Adjust scrollProgress to start from 0 after the news content
        const adjustedScrollProgress =
          (scrollY - newsContentHeight) /
          (document.documentElement.scrollHeight -
            newsContentHeight -
            window.innerHeight);

        // Now use the adjustedScrollProgress for rotation
        const rotationY = adjustedScrollProgress * 180; // or whatever your maximum rotation is
        if (boxRef.current) {
          boxRef.current.rotation.y = rotationY * (Math.PI / 180); // Convert to radians
        }
      }
    };

    // useEffect(() => {
    //   const handleScroll = () => {
    //     const scrollProgress = getScrollProgress();
    //     const rotationY = scrollProgress * 180; // 270 degrees at max scroll

    //     // if (boxRef.current && scrollProgress < 0.055) {
    //     //   boxRef.current.rotation.y = rotationY * (Math.PI / 180);
    //     //   boxRef.current.position.z = scrollProgress * 10; // Convert to radians
    //     // }
    //     // // else if (
    //     // //   boxRef.current &&
    //     // //   scrollProgress > 0.45 &&
    //     // //   scrollProgress < 0.55
    //     // // ) {
    //     // //   boxRef.current.rotation.y = rotationY * (Math.PI / 180);
    //     // //   boxRef.current.position.z = scrollProgress * -5;
    //     // // }
    //     // else {
    //     boxRef.current.rotation.y = rotationY * (Math.PI / 180); // Convert to radians
    //     // }
    //   };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="article_wrapper">
      {/* SECTION-00:News Header: with image and overlaid text */}
      <section className="news-header">
        <img
          src="https://static01.nyt.com/images/2020/07/02/opinion/01Nuzzo/01Nuzzo-superJumbo.jpg?quality=75&auto=webp"
          alt="Empty classroom"
          className="header-image"
        />
        <div className="header-overlay">
          <h1 className="news-title">
            Did online education during the pandemic create a bigger inequality
            gap?
          </h1>
          <p className="news-description">
            According to a UNESCO report focus on online remote learning during
            the pandemic led to a neglect of more equitable teaching methods,
            causing further inequality.
          </p>
          <p className="header-authors">
            By Tom Xia, Dipika Titus and Bosung Kim
          </p>
        </div>
      </section>

      {/* SECTION-01: */}
      <section>
        <div className="section-1">
          <img
            src="https://i0.wp.com/www.educationnext.org/wp-content/uploads/2020/05/ednext-april20-blog-gill-school-closed.png?w=690"
            alt="Baldwin School no school be safe sign"
            className="section1-image"
          />
          <h2 className="section1-header">An Ed-Tech Tragedy?</h2>
          <p className="section1-content">
            In early 2020, as the coronavirus spread, schools around the world
            abruptly halted in-person education. 
          </p>
        </div>
      </section>

      {/* SECTION-02: */}
      <section>
        <div className="section-2">
          <p className="left-text">
            A recent 655-page report by UNESCO has revealed a 'staggering'
            global education inequality due to the over reliance on remote
            learning.
          </p>
          <img
            src="https://i.postimg.cc/15ZgyLJw/UNESCO-white-logo-1.png"
            alt="UNESCO icon"
            className="right-icon"
          />
        </div>
      </section>

      {/* SECTION-03: */}
      <section>
        <div className="section-2">
          <p className="left-text">
            The global scale of the issue is immense, with 1.6 billion children
            impacted by pandemic-era school shutdowns. Schools were closed for a
            global average of 95 days during the first year of the pandemic,
            essentially half a school year, according to UNICEF. 
          </p>
          <img
            src="https://i.postimg.cc/258sf8sy/1-6billion.png"
            alt="1.6billion icon"
            className="right-icon"
          />
        </div>
      </section>

      {/* SECTION-04: */}
      <section>
        <div className="section-1">
          <h2 className="section1-header">
            168 million students from 14 countries
          </h2>
          <img
            src="https://i.postimg.cc/NFMF9c2j/World-Map.png"
            alt="World Map"
            className="section1-image"
          />
          <p className="section1-content">
            According to UNICEF, in the 14 most affected countries, a staggering
            168 million students missed almost an entire year of classroom
            instruction.
          </p>
        </div>
      </section>

      {/* SECTION-05: */}
      <section>
        <div className="highlight-quote">
          Pandemic-related barriers are projected to push 72 million more
          elementary students into learning poverty, unable to read by age 10,
          as reported by The World Bank.
        </div>
      </section>

      {/* SECTION-06: */}
      <section>
        <div className="section-1">
          <img
            src="https://i.postimg.cc/yY9G2rND/online-learning.png"
            alt="Online learning diagram"
            className="section1-image"
          />
          <p className="section1-content">
            While necessary for safety, online learning hindered discussions of
            more equitable, lower-tech alternatives. 
          </p>
        </div>
      </section>

      {/* SECTION-07: */}
      <section>
        <div className="section-2">
          <p className="left-text">
            Researchers recommended regularly providing schoolwork packets for
            every student, delivering school lessons through radio or
            television, and reopening schools sooner for in-person classes.
          </p>
          <img
            src="https://i.postimg.cc/KYJcBYSh/radio.png"
            alt="radio wifi icon"
            className="right-icon"
          />
        </div>
      </section>

      {/* 3D scene container */}
      <div id="canvas_wrapper">
        <Scene boxRef={boxRef} />
      </div>

      {/* HTML slides are nested here and we use vh values to specify where they are */}
      <SimpleSlide viewportPosition={500}>Hello from slide 3</SimpleSlide>
      <SimpleSlide viewportPosition={600}>Hello from slide 4</SimpleSlide>
      <SimpleSlide viewportPosition={700}>Hello from slide 5</SimpleSlide>
    </div>
  );
}

export default App;
