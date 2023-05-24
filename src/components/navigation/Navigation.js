import React from "react";
import Logo from "../logo/Logo";

export default function Navigation() {
  return (
    <nav style={{display: 'flex', justifyContent: 'space-between'}}>
      <Logo />
      <p className="f3 link dim black pa3 pointer">Sign Out</p>
    </nav>
  )
}