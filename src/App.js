import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
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


class App extends Component {
  constructor () {
    super();
    this.state = {
      input:'',
      url:'',
      box:{}
    }
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

  displayBox = (box) => {
    this.setState({box:box});
    console.log(this.state.box);
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onSubmit = (event) => {
    console.log(event.type);
    this.setState({url:this.state.input})
    app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', this.state.input)
    .then(response => this.displayBox(this.calculateBox(response)))
    .catch(error => console.log(error))
    
  }

  render() {
    return (
      <div>
        <Particles className="particles"
          // params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} url={this.state.url}/>
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