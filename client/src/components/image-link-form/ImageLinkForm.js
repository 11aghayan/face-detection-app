import React from "react";
import './ImageLinkForm.css';


export default function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <div style={{marginInline: '1em'}}>
      <p className="f3 description-text">
        {'This Magic Brain will detect faces in your pictures. Give it a try'}
      </p>
      <div className="form-img-wrapper">
        <div className="form pa4">
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
          <button className="w-25 f5 link ph3 pv2 dib white pointer" id="detect-btn" onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}