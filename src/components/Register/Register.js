import React from 'react';

class Register extends React.Component {
	constructor () {
		super();
		this.state = {
			name:'',
			email:'',
			password:''
		}
	}

	onNameChange = (event) => { this.setState({ name: event.target.value }); }
	onEmailChange = (event) => { this.setState({ email: event.target.value }); } 
	onPasswordChange = (event) => { this.setState({ password: event.target.value }); } 

	submit = () => {
		const {name, email , password} = this.state;
		fetch ('https://smartbrain-application9.herokuapp.com/register', {
			method : 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				name:name,
				email:email,
				password:password
				}) 
		})
		.then(response => response.json())
		.then(res => {
			if (res.messege === "You are registered !!") {
				alert(res.messege);
				this.props.registering(true);
			} 
			else {
				alert(res.messege);
			} 
		})
		.catch(err => console.log('oops check this ERROR out', err))
	}


	render() {
		return (
			<div className="pa5 black-80">
			  <div className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Registration</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onNameChange} type="name" name="full-name"  id="full-name-r" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onEmailChange} type="email" name="email-address"  id="email-address-r" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onPasswordChange} type="password" name="password"  id="password-r" />
			      </div>
			    </fieldset>
			    <div className="tc">
				    <div className="">
				      <input onClick={this.submit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={this.props.registering} className="f6 link dim black db pointer">Already have an account</p>
				    </div>
			    </div>
			  </div>
			</div>
		)
	}	
}


export default Register;