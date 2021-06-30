import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

//for clarifai
const app = new Clarifai.App({
  apiKey: 'ffc3d3ec16f948e5a95b4a58957cbec9'
});

// this is not working for the particles, we must be able to manipulate the number, shape, desity etc. ==> check docs, p.s I like it the way it is, so just check why.. 
// const particlesOptions = {
//   particles: {
//     value: 50,
//     density: {
//       enable: false,
//       value_area: 1000
//     }
//   }
// }

const initialState = {
  input:'',
  url:'',
  box:{},
  isSignedin:false,
  isRegistered:true,
  user:{
    date: "",
    email: "",
    id: 0,
    name: "",
    rank: 0
  }
}
class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  calculateBox = (data) => {
    const boxBorders = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: boxBorders.left_col * width,
      topRow: boxBorders.top_row * height,
      rightCol: width - (boxBorders.right_col * width),
      bottomRow: height - (boxBorders.bottom_row * height)
    }
  }

  updateRank = () => {
    fetch ('http://127.0.0.1:3000/image', {
      method : 'put',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        id:this.state.user.id
        })
    })
    .then(response => response.json())
    .then(newRank => this.setState(Object.assign( this.state.user, {rank:newRank})))
    .catch(err => console.log("Rank updating Error", err))
  }

  displayBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onSubmit = (event) => {
    this.setState({url:this.state.input})
    app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', this.state.input)
    .then(response => {
      this.displayBox(this.calculateBox(response));
      this.updateRank();
    })
    .catch(error => console.log(error))
  }

  signingIn = (signed) => {
    this.setState({isSignedin:signed});
  }

  signOut = (click) =>{
    this.setState(initialState);
  }

  registering = (event) => {
    this.state.isRegistered ? this.setState({isRegistered:false}) : this.setState({isRegistered:true});
  }

  userUpdate = (user)  => {
    this.setState({user:{
      date: user.date,
      email: user.email,
      id: user.id,
      name: user.name.toUpperCase(),
      rank: user.rank
    }})
  }

  render() {
    return (
      <div>
        <Particles className="particles"
          // params={particlesOptions}
        />
        {this.state.isSignedin ?
          <div>
            <Navigation signingIn={this.signingIn} signOut={this.signOut} />
            <Logo />
            <Rank userName={this.state.user.name} rank={this.state.user.rank} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={this.state.box} url={this.state.url}/>
          </div>
        :
          <div>
            {this.state.isRegistered ? <Signin signingIn={this.signingIn} registering={this.registering} userUpdate={this.userUpdate} /> : <Register registering={this.registering} /> }
          </div>
        }
      </div>
    );
  }
}

export default App;



// function validURL(str) {
//   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
//     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
//     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
//     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
//     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
//     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
//   return !!pattern.test(str);
// }