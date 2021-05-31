import "./App.css";
import { Component } from "react";
import Navigation from "./componenets/Navigation";
import Logo from "./componenets/Logo";
import ImageLinkForm from "./componenets/ImageLinkForm";
import SigninForm from "./componenets/signinForm";
import FaceRecognition from "./componenets/FaceRecognition";
import Rank from "./componenets/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "325b32be669d42d19564bf03f3be4365",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    return {
      leftCol: clarifiFace.left_col * width,
      topRow: clarifiFace.top_row * height,
      rightCol: width - clarifiFace.right_col * width,
      bottomRow: height - clarifiFace.bottom_row * height,
    };
  };

  displayFace = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onRouteChange = () => {
    this.setState({ route: "home" });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.displayFace(this.calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particles_data} />

        <Navigation />
        {this.state.route === "signin" ? (
          <SigninForm onRouteChange={this.onRouteChange} />
        ) : (
          <div className="">
            <Logo />
            <Rank />

            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        )}
      </div>
    );
  }
}

const particles_data = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 400,
      },
    },
  },
};

export default App;
