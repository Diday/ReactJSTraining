import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      isPlaying: false
    }
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    if (!this.state.isPlaying) {
      audio.play();
      this.setState({
        isPlaying: true,
        playingUrl: previewUrl,
        audio
      })
    }
    else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          isPlaying: false
        })
      }
      else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          isPlaying: true,
          playingUrl: previewUrl,
          audio
        })
      }
    }
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
              <div className= "Track-play">
                <div className= "Track-play-inner">
                  {
                    this.state.playingUrl === track.preview_url
                    ? <span>| |</span>
                    : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p className= "Track-text">{track.name}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Gallery;
