import React from 'react';


const Register = ({registering}) => {
	return (
		<div className="pa5 black-80">
		  <div className="measure center">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f2 fw6 ph0 mh0">Registeration</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" for="name">Full Name</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="full-name"  id="full-name-r" />
		      </div>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address-r" />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" for="password">Password</label>
		        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password-r" />
		      </div>
		    </fieldset>
		    <div className="tc">
			    <div className="">
			      <input onClick={registering} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={registering} className="f6 link dim black db pointer">Already have an account</p>
			    </div>
		    </div>
		  </div>
		</div>
	);
}


export default Register;