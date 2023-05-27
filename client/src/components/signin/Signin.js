import React from 'react';

export default class Signin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  }

  onSubmitSignIn = async () => {
    const response = await fetch('https://face-detection-be-kvl5.onrender.com/signin', {
      method: 'post',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    });

    if (response.status === 200) {
      const user = await response.json();
      this.props.loadUser(user);
      this.props.onRouteChange('home')();
    }
  }

  render() {
    const { onRouteChange } = this.props;
    return(
      <main className="pa4 black-80 shadow-1 mw6 center mt5" style={{backgroundColor: 'rgba(233, 233, 233, 0.4)'}}>
        <div className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">{'Sign In'}</legend>
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
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn}/>
          </div>
          <div className="lh-copy mt3">
            <p className="f6 link dim black db pointer" onClick={onRouteChange('register')}>{'Register'}</p>
          </div>
        </div>
      </main>
    )
  }
}