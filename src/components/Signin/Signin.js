import React from 'react';

//since the login functionallty will not effect other react elemnt we decided to make a class instead of func.
class Signin extends React.Component {
	constructor () {
		super();
		this.state = {
			email:'',
			password:'',
			signingStatus:false,
		}
	}

	onEmailChange = (event) => { this.setState({ email: event.target.value }); } 
	onPasswordChange = (event) => { this.setState({ password: event.target.value }); } 

	submit = () => {
		const {email , password} = this.state;
		fetch ('https://smartbrain-application9.herokuapp.com/signin', {
			method : 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				email:email,
				password:password
				}) 
		})
		.then(response => response.json())
		.then(signed => {
			if (signed.messege === "success") {
				this.props.userUpdate(signed.userInfo);
				this.props.signingIn(true);
			} 
			else {
				alert(signed.messege);
			} 
		})
		.catch(err => console.log('oops check this ERROR out', err))

	}


	render () {
		const { registering } = this.props
		return (
			<div className="pa6 black-80">
			  <div className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" onChange={this.onEmailChange} name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" onChange={this.onPasswordChange} name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="tc">
				    <div className="">
				      <input 
				      	onClick={() => {
				      		this.submit();
				      	}}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Sign in" 
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={registering} className="f6 link dim black db pointer">Register</p>
				    </div>
			    </div>
			  </div>
			</div>
		);
	}
}

export default Signin;