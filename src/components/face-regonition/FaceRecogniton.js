import React from "react";
import './FaceRecognition.css'

export default function FaceRecognition( { imgURL, box } ) {
  return (
    <div className="wrapper">
      <div className="img-box">
        <img id='input-image' src={imgURL} alt='' width='500px' height='auto'/>
        <div className="bounding-box" style={{
          top: box.topRow, 
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol
          }}></div>
      </div>
    </div>
  )
}