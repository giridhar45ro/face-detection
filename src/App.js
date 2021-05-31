import "./App.css";
import { Component } from "react";
import Navigation from "./componenets/Navigation";
import Logo from "./componenets/Logo";
import ImageLinkForm from "./componenets/ImageLinkForm";
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
    };
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
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
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
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
