import React from 'react';

export default class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }


  onNameChange = event => {
    this.setState({ name: event.target.value});
  } 

  onEmailChange = event => {
    this.setState({ email: event.target.value});
  }

  onPasswordChange = event => {
    this.setState({ password: event.target.value});
  }

  onSubmitRegister = async () => {
    const response = await fetch('http://localhost:7000/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    if (response.status === 201) {
      const user = await response.json();
      this.props.loadUser(user);
      this.props.onRouteChange('home')()
    }
  }
  
  render() {
    return(
      <main className="pa4 black-80 shadow-1 mw6 center mt5" style={{backgroundColor: 'rgba(233, 233, 233, 0.4)'}}>
        <div className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">{'Sign In'}</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">{'Name'}</label>
              <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">{'Email'}</label>
              <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">{'Password'}</label>
              <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
            </div>
          </fieldset>
          <div>
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onSubmitRegister}/>
          </div>
          <div className="lh-copy mt3">
            <p className="f6 link dim black db pointer" onClick={this.props.onRouteChange('signin')}>{'Sign In'}</p>
          </div>
        </div>
      </main>
    )
  } 
  
}