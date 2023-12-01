import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import InputForm from "./components/InputForm/InputForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import { Component } from "react";
import SignIn from "./components/SignIn/SignIn";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (data) => {
    const clarifai_face = data;
    const input_img = document.getElementById("inputImg");
    const img_width = Number(input_img.width);
    const img_height = Number(input_img.height);

    return {
      leftCol: clarifai_face.left_col * img_width,
      topRow: clarifai_face.top_row * img_height,
      rightCol: img_width - clarifai_face.right_col * img_width,
      bottomRow: img_height - clarifai_face.bottom_row * img_height,
    };
  };

  displayBox = (box) => {
    console.log(box);
    this.setState({ box: box });
    console.log(box);
  };

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
        if (result.outputs.length === 1) {
          this.displayBox(
            this.calculateFaceLocation(
              result.outputs[0].data.regions[0].region_info.bounding_box
            )
          );
        } else {
          result.outputs.forEach((output) => {
            output.data.regions.forEach((region) => {
              this.displayBox(
                this.calculateFaceLocation(region.region_info.bounding_box)
              );
            });
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#333333" num={60} type="cobweb" bg={true} />
        <div className="flex justify-between pa3">
          <Logo />
          <Navigation
            onRouteChange={this.onRouteChange}
            isSignedIn={this.state.isSignedIn}
          />
        </div>
        {this.state.route === "home" ? (
          <>
            {/* <Rank /> */}
            <InputForm
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onBtnSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </>
        ) : this.state.route === "register" ? (
          <Register onRouteChange={this.onRouteChange} />
        ) : (
          <SignIn onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
