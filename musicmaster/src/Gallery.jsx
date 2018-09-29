import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    audio.play()
  }

  render() {
    const {tracks} = this.props;
    return (
      <div>
        {tracks.map((track, key) => {
          const trackImg = track.album.images[0].url;
          return (
            <div
              key= {key}
              className= "Track"
              onClick= {() => this.playAudio(track.preview_url)}
            >
              <img src= {trackImg} className= "Track-img" alt= "Track"/>
              <p className= "Track-text">{track.name}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Gallery;
