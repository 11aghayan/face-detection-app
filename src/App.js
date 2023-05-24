import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import FaceRecognition from './components/face-regonition/FaceRecogniton'
import detect from './modules/detect-faces';
import ParticlesBg from 'particles-bg';

class App extends Component{
  constructor() {
    super()
    this.state = {
      imgURL: '',
      input: '',
      box: {}
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

  render() {
    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imgURL={this.state.imgURL} box={this.state.box}/>
        <ParticlesBg className='particles' type="cobweb" bg={true} num={150} color='#ffffff'/>
      </div>
    );
  }
}

export default App;
