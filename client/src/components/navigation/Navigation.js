import React from "react";
import Logo from "../logo/Logo";

export default function Navigation({ onRouteChange, isSignedIn }) {
  return (
    isSignedIn ?
      <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Logo />
        <p className="f3 link dim black pa3 pointer" onClick={onRouteChange('signout')}>Sign Out</p>
      </nav>
      :
      <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Logo />
        <div style={{display: 'flex'}}>
          <p className="f3 link dim black pa3 pointer" onClick={onRouteChange('signin')}>Sign In</p>
          <p className="f3 link dim black pa3 pointer" onClick={onRouteChange('register')}>Register</p>
        </div>
      </nav>
  )
}