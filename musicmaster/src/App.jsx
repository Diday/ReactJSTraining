import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

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
    var accessToken = 'BQBs7xC1NysdQdnOJmFBeCnyMjvahBNNeb722egFy2hPQV7m_Rn4DJWiplPERBkKh8bSRCEdDQU9MEbrxsw0V4ShH30c6rpNLjRIOpK159RvOEnI-5wK9khrP7CudvTpyegwBkz3J2ENlQTEJZBUcYHXNUvJJw&refresh_token=AQCgvo7sRr7RnXeHq4Yq4Ox54TMTvQys6Q0AFIi2CUYag5lf_EmeoSQIs1cBS6DdBVopCTQKpsS8VeTh7xZRR8vjSijNxv_VbkFuQZsfGsansZVjl8beeqo75yMmJQMZlMaO8A';

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
            <Gallery
              tracks={this.state.tracks}
            />
          </div>
          : <div></div>
          }
      </div>
    )
  }
}

export default App;
