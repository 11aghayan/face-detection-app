import React, {useState} from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

export default function Logo() {
  const [scale, setScale] = useState(1.15);

  return (
    <div className="ma4 mt0">
      <Tilt scale={scale} transitionSpeed={2500} className="Tilt">
        <div className="logo-div">
          <img src={brain} alt='Brain logo' />
        </div>
      </Tilt>
    </div>
  )
}