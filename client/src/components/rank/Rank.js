import React from "react";
import './Rank.css';


export default function Rank({ rank, username }) {
  return (
    <div style={{backgroundColor: 'rgb(255, 255, 255, 0.5)', marginInline: '5em'}}>
      <div className="f2" style={{color: '#11abcd'}}>
        { `${username}, your current rank is` }
      </div>
      <div id="rank">
        { rank }
      </div>
    </div>
  )
}