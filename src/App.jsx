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
      const rotationY = scrollProgress * 270; // 270 degrees at max scroll
      if (boxRef.current) {
        boxRef.current.rotation.y = rotationY * (Math.PI / 180); // Convert to radians
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="article_wrapper">
      {/* HTML slides are nested here and we use vh values to specify where they are */}
      <SimpleSlide viewportPosition={50}>Hello from slide 1</SimpleSlide>
      <SimpleSlide viewportPosition={100}>Hello from slide 2</SimpleSlide>
      <SimpleSlide viewportPosition={200}>Hello from slide 3</SimpleSlide>
      <SimpleSlide viewportPosition={300}>Hello from slide 4</SimpleSlide>
      <SimpleSlide viewportPosition={550}>Hello from slide 5</SimpleSlide>

      {/* 3D scene container */}
      <Scene boxRef={boxRef} />
    </div>
  );
}

export default App;
