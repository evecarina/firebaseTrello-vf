import React from 'react';
import logo from '../trello.svg';
import { FormControl, FormGroup, Image, Button } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { signIn } from '../actions';

const SignIn = ({ user, login }) => {
  return (
    <div align='center'>
      {
        user && <Redirect to="/boards" />
      }
      <div style={{ width: '350px', marginTop: '100px' }}>
        <Image src={logo} width='170px' />
        <form className='container-sign' onSubmit={
          e => {
            e.preventDefault();
            signIn(this.emailInput.value, this.passwordInput.value)
          }
        }>
          <FormGroup bsSize='large small ' >
            <FormControl type="email" placeholder="Email" required inputRef={ref => { this.emailInput = ref; }} />
          </FormGroup>
          <FormGroup bsSize="large small">
            <FormControl type="password" placeholder="Password" required inputRef={ref => { this.passwordInput = ref; }} />
          </FormGroup>
          <Button type="submit">Sign In</Button>
        </form>
        <NavLink className='container-signin' to='/signup'>Register</NavLink>
      </div>
    </div>
  );
}

export default SignIn;