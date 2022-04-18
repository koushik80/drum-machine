import * as React from 'react';
import logo from './logo.png';
import './drum.css';
import { firstSoundsGroup, secondSoundsGroup } from './data';

const soundsName = {
    heaterKit: "Heater Kit",
    smoothPianoKit: "Smooth Piano Kit"
  };

  const soundsGroup = {
    heaterKit: firstSoundsGroup,
    smoothPianoKit: secondSoundsGroup
  }

  const KeyboardKey = ({ play, deactivateAudio, sound: { id, key, url, keyCode } }) => {
    const handleKeydown = (e) => {
      if (keyCode === e.keyCode) {
        const audio = document.getElementById(key);
        play(key, id);
        deactivateAudio(audio)
      }
    }
    /*eslint-disable */
    React.useEffect(() => {
      document.addEventListener('keydown', handleKeydown);
    }, [])
    /*eslint-enable */
    return (
      <button value="test" id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
        <audio className="clip" src={url} id={key} />
        {key}
      </button>
    );
  }

const Keyboard = ({ sounds, play, power, deactivateAudio }) => (
    <div className="keyboard">
      {power
        ? sounds.map((sound) => <KeyboardKey sound={sound} play={play} deactivateAudio={deactivateAudio} />)
        : sounds.map((sound) => <KeyboardKey sound={{ ...sound, url: "#" }} play={play} deactivateAudio={deactivateAudio} />)
      }
    </div>
);
  const DrumControl = ({ stop, name, power, volume, handleVolumeChange, changeSoundGroup }) => (
    <div className="control">
      <button onClick={stop}>Turn Power {power ? 'OFF' : 'ON'}</button>
      <h2>Volume: %{Math.round(volume * 100)}</h2>
      <input
        max="1"
        min="0"
        step='0.01'
        type="range"
        value={volume}
        onChange={handleVolumeChange}
      />
      <h2 id="display">{name}</h2>
      <button onClick={changeSoundGroup}>Change Sounds Group</button>
    </div>
  );

const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundType]);
  const styleActiveKey = (key) => {
    key.parentElement.style.backgroundColor = "#DE5B6D"
    key.parentElement.style.color = "#43978D"
  }
  const deactivatedKey = (audio) => {
    audio.parentElement.style.backgroundColor = "#DE5B6D"
    audio.parentElement.style.color = "#43978D"
  }

  const deactivateAudio = (audio) => {
    setTimeout(() => {
      audio.parentElement.style.backgroundColor = "#DE5B6D"
      audio.parentElement.style.color = "#43978D"
    }, 300)
  }

  const play = (key, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(key);
    styleActiveKey(audio);
    audio.currentTime = 0;
    audio.play();
    deactivateAudio(audio)
  }

  const stop = () => {
    setPower(!power)
  }

  const changeSoundGroup = () => {
    setSoundName("")
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit");
      setSounds(soundsGroup.smoothPianoKit);
    } else {
      setSoundType("heaterKit");
      setSounds(soundsGroup.heaterKit);
    }
  }
  const handleVolumeChange = e => {
    setVolume(e.target.value)
  }
  const setKeyVolume = () => {
    const audioes = sounds.map(sound => document.getElementById(sound.key));
    audioes.forEach(audio => {
      if (audio) {
        audio.volume = volume;
      }
    })
  }

  return (
    <div className="App">
      <div className='logo'>
        <div className='inner-logo'>devHuß
        <img src={logo} className="App-logo" alt="logo" /></div>
      </div>
      <header className="App-header">
        <div className="project">
        <p>
          Front End Development <code></code> Libraries Project 3
          </p>
          </div>
        <a
          className="App-link"
          href="https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-drum-machine"
          target="_blank"
          rel="noopener noreferrer"
        >
          Drum Machine
        </a>
      </header>
      <div>
      <div id="drum-machine">
      {setKeyVolume()}
      <div className="wrapper">
        <Keyboard sounds={sounds} play={play} power={power} deactivateAudio={deactivateAudio} />
        <DrumControl
          stop={stop}
          power={power}
          volume={volume}
          deactivatedKey={deactivatedKey}
          name={soundName || soundsName[soundType]}
          changeSoundGroup={changeSoundGroup}
          handleVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
    </div>
    </div>
  )
};

export default App;


