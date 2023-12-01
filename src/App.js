import "./App.css";
// import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import InputForm from "./components/InputForm/InputForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
// import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import { useState } from "react";
// import SignIn from "./components/SignIn/SignIn";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxArray, setBoxArray] = useState([]);
  // const [route, setRoute] = useState("signin");
  // const [isSignedIn, setIsSignedIn] = useState(false);

  console.log(boxArray);

  const calculateFaceLocation = (data) => {
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

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const returnClarifaiRequestOptions = (imageUrl) => {
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

  const onBtnSubmit = () => {
    setImageUrl(input);
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      returnClarifaiRequestOptions(input)
    )
      .then((response) => response.json())
      .then((result) => {
        const boxes = result.outputs.flatMap((output) =>
          output.data.regions.map((region) =>
            calculateFaceLocation(region.region_info.bounding_box)
          )
        );
        setBoxArray(boxes);
      })
      .catch((error) => console.log("error", error));
  };

  // const onRouteChange = (route) => {
  //   if (route === "signout") {
  //     setIsSignedIn(false);
  //   } else if (route === "home") {
  //     setIsSignedIn(true);
  //   }
  //   setRoute(route);
  // };

  return (
    <div className="App">
      <ParticlesBg color="#333333" num={60} type="cobweb" bg={true} />
      <div className="flex justify-between pa3">
        <Logo />
        {/* <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} /> */}
      </div>
      <InputForm onInputChange={onInputChange} onBtnSubmit={onBtnSubmit} />
      <FaceRecognition boxArray={boxArray} imageUrl={imageUrl} />

      {/* {route === "home" ? (
        <>
          <InputForm onInputChange={onInputChange} onBtnSubmit={onBtnSubmit} />
          <FaceRecognition boxArray={boxArray} imageUrl={imageUrl} />
        </>
      ) : route === "register" ? (
        <Register onRouteChange={onRouteChange} />
      ) : (
        <SignIn onRouteChange={onRouteChange} />
      )} */}
    </div>
  );
}

export default App;
