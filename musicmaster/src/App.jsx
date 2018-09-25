import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     query: '',
     artist: null,
     tracks: []
    }
  }

search() {
  console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists';
    var accessToken = 'BQBLU1r6XWy0azcN-RouMJiTHTULn4UjFr2JzUA2POw8BG2IIieGGr1adJ2ewkeWK4FL2utrwYGLL8SzZhCawLwJODEQIE4_ehTpGpelULlwbqLoi42s2z9j2vb_2MaBHaqrUiiKIrCfOEUp_YIsgQ-aBFivPg&refresh_token=AQDHdAKTAA9Nmy8dE3Uj4CusZwpO_M1BDKqPEwSUuHgLjp_dZvRuX8rkbTMdz2AsX8xaAFvkka7yQRvsZ94cwZ4yhm6RciP91lUUQ1vKllVYSkD_ikXwX4o7lALkiPsBqT1aDg';

    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});

        FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=ID&`
        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          console.log('artist\'s top tracks:', json);
          const {tracks} = json;
          this.setState({tracks});
        })
      });
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
        {
          this.state.artist !== null
          ?
          <div>
            <Profile
              artist={this.state.artist}
            />
            <div className="Gallery">
              Gallery
            </div>
          </div>
          : <div></div>
          }
      </div>
    )
  }
}

export default App;
