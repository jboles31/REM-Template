import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header.jsx'
import Display from './components/Display.jsx'
import $ from 'jquery'
import Background from './images/background.jpg'
import style from './main.scss';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      example: ''
    }

    this.search = this.search.bind(this)
  }

  //
  // Class Functions
  //

  search(param) {
    $.ajax({
      method: 'GET',
      url: `/api/${param}`,
      success: (data) => {
        let copyState = this.state;
        copyState.cities.push(data);
        copyState.display = data.name;
        copyState.showView = true;
        this.setState(copyState)
      },
      error: (err) => {
        console.log('error on Client', err);
      }
    })
  }

  //
  // Render App and Comps to index.html
  //

  render() {
    return (
      <div className="app-wrapper">
        <div className='bg'>
          <img className="background" src={Background} ></img>
        </div>
        <div className="comps-wrapper">
          <Container 
            search={this.search}
          />
          <Display 
            example={this.state.example}
          />
        </div>        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
