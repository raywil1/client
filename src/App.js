import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  const [playing, setPlaying] = useState(false);
  const [url, setUrl] = useState(episodes[0].value);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const episodes = [
    { label: 'Episode 1', value: 'https://www.youtube.com/watch?v=dyHLIB5lXC4&list=PLlOP_iIbln5ljmlXYJB52qYbKIY_gF_b1&index=1&ab_channel=DW2012' },
    { label: 'Episode 2', value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { label: 'Episode 3', value: 'https://www.youtube.com/watch?v=Cl3OVsp5pvc' },
    { label: 'Episode 4', value: 'https://www.youtube.com/watch?v=v5CZQpqF_74&ab_channel=AllanUngar'}
    // Add more episodes here with label and value
  ];

  const playPause = () => {
    setPlaying(!playing);
  };

  const fastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, 'seconds');
  };

  const rewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, 'seconds');
  };

  const showControls = () => setControlsVisible(true);
  const hideControls = () => setControlsVisible(false);

  const handleEpisodeChange = (event) => {
    setUrl(event.target.value);
    setPlaying(true);
  };

  const onProgress = (progress) => {
    setPlayed(progress.playedSeconds);
  };

  const onDuration = (duration) => {
    setDuration(duration);
  };

  const seekTo = (fraction) => {
    const time = fraction * duration;
    playerRef.current.seekTo(time, 'seconds');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="video-wrapper"
          onMouseEnter={showControls}
          onMouseLeave={hideControls}
        >
          <ReactPlayer
            ref={playerRef}
            className="react-player"
            url={url}
            playing={playing}
            controls={false}
            onProgress={onProgress}
            onDuration={onDuration}
            width="100%"
            height="100%"
          />
          {controlsVisible && (
            <div className="video-controls">
              <button className="control-button" onClick={playPause}>
                {playing ? 'Pause' : 'Play'}
              </button>
              <button className="control-button" onClick={fastForward}>
                Fast Forward
              </button>
              <button className="control-button" onClick={rewind}>
                Rewind
              </button>
              <select
                className="episode-select"
                onChange={handleEpisodeChange}
                value={url}
              >
                {episodes.map((episode) => (
                  <option key={episode.value} value={episode.value}>
                    {episode.label}
                  </option>
                ))}
              </select>
              <div className="progress-bar-container">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played / duration}
                  onChange={(e) => seekTo(parseFloat(e.target.value))}
                  className="progress-bar"
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;