import React from "react";
import "./Main.css";
import Container from "../../components/Containers/Container";
function Main() {
  return (
    <>
      <Container className="even-columns">
        <div className="card-container">
          <div className="card">
            <div className="front">Front</div>
            <div className="back">Back</div>
          </div>
        </div>
        <div className="absolute"> vodka</div>
      </Container>

      <Container>
        <video width="100%" controls>
          <source src="path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Container>
      <Container>
        

      </Container>
    </>
  );
}
export default Main;
