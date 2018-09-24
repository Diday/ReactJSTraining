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
    var accessToken = 'BQAtz6GnesrC4FdNeydaE-lzfLjeA_lb7GShQILbrC5_r1OdfcVOIJjMebWBJh1hqyvsqbOSDx663hdosq3aAOCb9qr_qCzyg12CAcYVGu7Y9u8c-brAlTDLPLJTDTja7ig1WbpNMQs1i1jXndYXrxMXZrf-lQ&refresh_token=AQDfLE77Lw9R0u1J4Qur8-lddcVNb1LIGYP75c670ulwwfiHelckaR48GIeLnTv5-e3rb4CdavT3pQROXjGiUChygjiihjiEjN9Hi9pNIdC66kJjtJsBYPB6C4NSTEm1p0xkmg';

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
