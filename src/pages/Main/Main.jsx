import React from "react";
import "./Main.css";
import Container from "../../components/Containers/Container";
import isim from "../../assets/ornek.jpg"
import Card from "../../components/Cards/Card";
function Main() {
  
  return (
    <>
      <Container style={{gap: '0'}} className="even-columns" >
      <Card>
      </Card>
      <Card>
      </Card>
      <Card>
      </Card>
      </Container>

      <Container>
        <video width="100%" controls>
          <source src="path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Container>

      <Container className="even-columns">
        <div>
        <div className="fs-primary-heading">ornek title</div>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </div>
        <img src={isim} className="image">
        </img>



      </Container>
    </>
  );
}
export default Main;
