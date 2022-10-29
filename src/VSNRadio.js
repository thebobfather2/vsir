import logo from './images/vsn.png';
import React, { useRef, useEffect, useState } from "react";
import Player from './Player/Player';
import { songsdata } from './Player/audios';
import './VSNRadio.css';

function VSNRadio() {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[1]);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [isplaying])

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

  }

  return (
  <div className="VSNRadio" style={{marginBottom: "0px"}}>
  <img style={{
              maxWidth: "300px", 
              marginTop: "50px", 
              marginBottom: "50px", 
              borderRadius: "20px",
              boxShadow: "0.2em 0.2em 0 0.2em rgba(0,0,0,0.17)",
              }} 
    src={logo} alt='vsn logo'/>

    <div className="Player">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
      <Player songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </div>
  </div>
  );
}

export default VSNRadio;