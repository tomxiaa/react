function SimpleSlide(props) {
  const { children, viewportPosition } = props;
  return (
    <div
      style={{
        color: "white",
        position: "absolute",
        minWidth: "45vw",
        paddingLeft: "350px", // To offset slides a tiny bit from the left side of the screen
        top: `${viewportPosition}vh`,
        zIndex: "50",
      }}
    >
      {children}
    </div>
  );
}

export default SimpleSlide;
