import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     query: '',
     artist: null
    }
  }

search() {
  console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    var accessToken = 'BQBWuKTAGJO7yel7ul9dmDyTMstyYA1rlQ9aRO3FVfqpH9VYTtiXIqmlNL0sx4Z0uEv_7Y3Q7w3WmeHzK_eKsGY4CZfA_QXCUvR63Pc_UJ-EaduQa1Lupy989o3Xe9GHNh8ZbRXsqbWXQJJxkANYTTowevm9Tg&refresh_token=AQCbjDQDm46De98H8CRgPYAv4aQaq36zykmyumcm-KlsVh3C9pyprphPpMrngY6dvdTp6GEVZ3JNzona5EVYOoThIRXpXubOvooFUrTZ0FEtrwLXcLAGAFOtppmkZss90PcRLw';

    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions )
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});
      })
}

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter') {
                  this.search()
                }
              }}
            />
          <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Profile
          artist={this.state.artist}
        />
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
