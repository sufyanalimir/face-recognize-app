import "./App.css";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import InputForm from "./components/InputForm";
import Rank from "./components/Rank";
import FaceRecognition from "./components/FaceRecognition";
import ParticlesBg from "particles-bg";
import { Component } from "react";

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

  returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = "8c0dc78237c24c6cbf014a06d03abb3d";
    const USER_ID = "sufyanalimir";
    const APP_ID = "faceApp";
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
    return requestOptions;
  };

  onBtnSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      this.returnClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => {
        result.outputs.forEach((output) => {
          output.data.regions.forEach((region) => {
            console.log(region.region_info.bounding_box);
          });
        });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#333333" num={60} type="cobweb" bg={true} />
        <div className="flex justify-between pa3">
          <Logo />
          <Navigation />
        </div>
        <Rank test={this.test} />
        <InputForm
          onInputChange={this.onInputChange}
          onBtnSubmit={this.onBtnSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
