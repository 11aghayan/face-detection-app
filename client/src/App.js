import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import FaceRecognition from './components/face-regonition/FaceRecogniton';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import detect from './modules/detect-faces';
import ParticlesBg from 'particles-bg';

const initalState = {
  imgURL: '',
  input: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    email: '',
    id: '',
    name: '',
    joined: '',
    entries: 0
  }
};

class App extends Component{
  constructor() {
    super()
    this.state = initalState;
  }

  onInputChange = event => {
    this.setState( { input: event.target.value } )
  }

  onButtonSubmit = async () => {
    const imgURL = this.state.input;
    this.setState({ imgURL })
    try {
      let boundingBox = await detect(imgURL);
      boundingBox = boundingBox.outputs[0].data.regions[0].region_info.bounding_box;

      const image = document.getElementById('input-image');
      const width = Number(image.width);
      const height = Number(image.height);

      this.setState({ box: {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height)
      } } );

      try {
        const response = await fetch('http://localhost:7000/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        });
        
        if (response.status === 200) {
          const data = await response.json();
          this.setState(Object.assign(this.state.user, { entries: data.entries }));
        }
      } catch(err) {
        console.log(err);
      }


    } catch(err) {
      console.log(err);
    }
  }

  onRouteChange = route => {

      return () => {

        if (route === 'home') {
          this.setState({ isSignedIn: true });
        } else {
          this.setState(initalState);
        }
        
        this.setState( { route } );

      }

  }

  loadUser = user => {
    this.setState( { user } );
  } 

  render() {
    const { isSignedIn, route, imgURL, box} = this.state;
    return (
      <div className="App">
        <ParticlesBg className='particles' type="lines" bg={true} num={150} color='#ffffff' />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { route === 'home' 
          ?
            <div>
              <Rank rank={this.state.user.entries} username={this.state.user.name}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imgURL={imgURL} box={box} />
            </div>
          :
          this.state.route === 'register' ?
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          :
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    );
  }
}

export default App;
