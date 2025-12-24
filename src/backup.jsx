import { useRef, useState, useEffect } from "react";
import "./App.css";

const playlist = [
  { title: "إيذاء النبي ﷺ", arabic: "إيذاء النبي ﷺ", file: "/audio/al-fatiha.mp3" },
  { title: "نَعيمُ أهلِ الجنة", arabic: "نَعيمُ أهلِ الجنة", file: "/audio/al-ikhlas.mp3" },
  { title: "التوكّل على الله", arabic: "التوكّل على الله", file: "/audio/al-falaq.mp3" },
];

function App() {
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const current = playlist[currentIndex];

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    isPlaying ? pause() : play();
  };

  const next = () => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  // Restart if same surah is clicked
  const selectSurah = (index) => {
    const audio = audioRef.current;

    if (index === currentIndex) {
      audio.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) audio.play();
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  // Load metadata (duration)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setMeta = () => setDuration(audio.duration || 0);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => audio.removeEventListener("loadedmetadata", setMeta);
  }, [currentIndex]);

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);

    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  // ONLY reset when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);

    if (isPlaying) audio.play();
  }, [currentIndex]); // 🔥 FIX HERE

  const formatTime = (time) => {
    const m = Math.floor(time / 60) || 0;
    const s = Math.floor(time % 60) || 0;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="app">
      <header className="header">
        <h2>Sheikh Mohamed Maalim Ali</h2>
      </header>

      <div className="list">
        {playlist.map((s, i) => (
          <div
            key={i}
            className={`surah-item ${i === currentIndex ? "active" : ""}`}
            onClick={() => selectSurah(i)}
          >
            <div className="english">{s.title}</div>
          </div>
        ))}
      </div>

      <div className="bottom-player">
        <div className="now-playing">{current.arabic}</div>

        <div className="time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <input
          type="range"
          className="progress"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            const time = Number(e.target.value);
            setCurrentTime(time);
            audioRef.current.currentTime = time;
          }}
        />

        <div className="controls">
          <button onClick={prev}>⏮</button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <button onClick={next}>⏭</button>
        </div>

        <audio ref={audioRef} src={current.file} preload="metadata" />
      </div>
    </div>
  );
}

export default App;
