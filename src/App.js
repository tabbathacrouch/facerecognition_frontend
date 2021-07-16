import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 125,
      density: {
        enable: true,
        value_area: 500,
      },
    },
  },
};

// images that are entered must be a url, below are some examples:
// https://upload.wikimedia.org/wikipedia/commons/7/7e/Rachel_McAdams_by_Gage_Skidmore.jpg
// https://upload.wikimedia.org/wikipedia/commons/9/98/Tom_Hanks_face.jpg
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdSLG9Mz6y4TbG4iC_LUKfoIdbqnNtFosSw&usqp=CAU
// https://upload.wikimedia.org/wikipedia/commons/4/4d/Kamala_Harris_%2848571501617%29.jpg
// https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTY2Njc5MTIyNzY2OTk2NTM1/nikola_tesla_napoleon-sarony-public-domain-via-wikimedia-commons.jpg

const initialState = {
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    submissions: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({ imageUrl: event.target.value });
  };

  onButtonSubmit = () => {
    fetch("https://secret-hamlet-67600.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: this.state.imageUrl,
      }),
    })
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://secret-hamlet-67600.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((submissions) => {
              this.setState((state) => {
                return {
                  ...state,
                  user: {
                    ...state.user,
                    submissions,
                  },
                };
              });
            })
            .catch(console.log);
        } else {
          console.log("unable to fetch number of submissions");
        }
        this.calculateFaceLocation(response);
      })
      .catch((err) => console.log(err));
  };

  calculateFaceLocations = (response) => {
    return response.outputs[0].data.regions.map((face) => {
      0;
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      const topRow = clarifaiFace.top_row * height;
      const leftCol = clarifaiFace.left_col * width;
      const rightCol = width - clarifaiFace.right_col * width;
      const bottomRow = height - clarifaiFace.bottom_row * height;
      return {
        left: leftCol,
        top: topRow,
        right: rightCol,
        bottom: bottomRow,
      };
    });
  };

  onRouteChange = (route) => {
    if (route === "register" || route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        submissions: data.submissions,
        joined: data.joined,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              submissions={this.state.user.submissions}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              boxes={this.state.boxes}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
