import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import ParticlesBg from 'particles-bg';

class App extends Component{
  render() {
    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
        <ParticlesBg className='particles' type="cobweb" bg={true} num={150} color='#482386'/>
      </div>
    );
  }
}

export default App;
