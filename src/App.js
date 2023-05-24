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

class App extends Component{
  constructor() {
    super()
    this.state = {
      imgURL: '',
      input: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
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

    } catch(err) {
      console.log(err);
    }
  }

  onRouteChange = (route) => {
    return () => {
      this.setState( { isSignedIn: route === 'home' ? true : false } );
      this.setState( { route } );
    }
      
  }

  render() {
    const { isSignedIn, route, imgURL, box} = this.state;
    return (
      <div className="App">
        <ParticlesBg className='particles' type="lines" bg={true} num={150} color='#ffffff'/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' 
          ?
            <div>
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition imgURL={imgURL} box={box}/>
            </div>
          :
          this.state.route === 'register' ?
            <Register onRouteChange={this.onRouteChange}/>
          :
            <Signin onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
