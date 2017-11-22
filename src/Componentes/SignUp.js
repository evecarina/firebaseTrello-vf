import React, { Component } from 'react';
import { FormControl, FormGroup, Image, Button } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { signUser } from '../actions';
import img from '../trello.svg'


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      show: false
    }
  }
  render() {
    const { user, passwordError } = this.props;
    const passwordConfirm = () => {
      console.log(this.state.confirm)
      if (this.passConfirm.value === this.password.value) {
        this.setState({
          confirm: true
        })
      }else{
        this.setState({
          confirm: false
        })
      }
    }
    return (
      <div align='center' className="container-form">
        <div style={{ width: '450px', marginTop: '20px' }}>
        <img src={img} width='150px' marginButton= '20px'></img>

          {
            
            user && <Redirect to="/boards" />
          }
          <form className='container-sign' onSubmit={
            e => {
              e.preventDefault();
              this.setState({
                show: true
              })
              signUser(this.firstName.value, this.lastName.value, this.email.value, this.password.value, this.state.confirm)
            }}>
            <FormGroup bsSize='large'>
              <FormControl type="text" placeholder="First Name" inputRef={ref => { this.firstName = ref; }} required />
            </FormGroup>
            <FormGroup bsSize="large">
              <FormControl type="text" placeholder="Last Name" inputRef={ref => { this.lastName = ref; }} required />
            </FormGroup>
            <FormGroup bsSize='large'>
              <FormControl type="email" placeholder="Email" inputRef={ref => { this.email = ref; }} required />
            </FormGroup>
            <FormGroup bsSize='large'>
              <FormControl type="password"  onChange={passwordConfirm} placeholder="Password" inputRef={ref => { this.password = ref; }} required />
            </FormGroup>
            {passwordError && <div className='error'>should be at least 6 character(s)</div>}
            <FormGroup bsSize='large'>
              <FormControl type="password" placeholder="Confirm password"
                inputRef={ref => { this.passConfirm = ref; }}
                onChange={passwordConfirm} required />
            </FormGroup>
            {this.state.show && !this.state.confirm && <div className='error'>Password does not match</div>}
            <Button type='submit' >Sign Up</Button>
          </form>
          <NavLink className='container-signin' to='/signin'>Sign in</NavLink>
        </div>
      </div>
    );
  }
}
//<NavLink to='/boards' className='btn'>Sign Up</NavLink>
export default SignUp;