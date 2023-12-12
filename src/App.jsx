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

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = getScrollProgress();
      const rotationY = scrollProgress * 180; // 270 degrees at max scroll

      // if (boxRef.current && scrollProgress < 0.055) {
      //   boxRef.current.rotation.y = rotationY * (Math.PI / 180);
      //   boxRef.current.position.z = scrollProgress * 10; // Convert to radians
      // }
      // // else if (
      // //   boxRef.current &&
      // //   scrollProgress > 0.45 &&
      // //   scrollProgress < 0.55
      // // ) {
      // //   boxRef.current.rotation.y = rotationY * (Math.PI / 180);
      // //   boxRef.current.position.z = scrollProgress * -5;
      // // }
      // else {
      boxRef.current.rotation.y = rotationY * (Math.PI / 180); // Convert to radians
      // }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="article_wrapper">
      <div className="news-content">
        <h1 className="news-headline">
          Pandemic Education Inequality in Remote Learning
        </h1>
        <p className="news-description">
          Here's a short description of the news...
        </p>
        <img
          src="https://mg.co.za/wp-content/uploads/2021/05/234287f5-gettyimages-1221070225-1-1024x683.jpg"
          alt="description of the photo"
          className="news-photograph"
        />
      </div>

      {/* 3D scene container */}
      <div id="canvas_wrapper">
        <Scene boxRef={boxRef} />
      </div>

      {/* HTML slides are nested here and we use vh values to specify where they are */}
      <SimpleSlide viewportPosition={100}>Hello from slide 1</SimpleSlide>
      <SimpleSlide viewportPosition={200}>Hello from slide 2</SimpleSlide>
      <SimpleSlide viewportPosition={300}>Hello from slide 3</SimpleSlide>
      <SimpleSlide viewportPosition={400}>Hello from slide 4</SimpleSlide>
      <SimpleSlide viewportPosition={500}>Hello from slide 5</SimpleSlide>
    </div>
  );
}

export default App;
