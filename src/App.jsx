import { useRef, useState, useEffect } from "react";
import "./App.css";


const playlist = [
{ title: "1 الرسول ﷺ", arabic: "النبي ﷺ", file: "/audio/the-prophet-one.mp3" },
{ title: "2 الرسول ﷺ", arabic: "الرسول صلى الله عليه وسلم", file: "/audio/prophet-muhammad.mp3" },
  { title: "1 إيذاء الرسو ﷺ", arabic: "المشاكل التي واجهها النبي ﷺ", file: "/audio/the-problems-faced-by-the-prophet.mp3" },

{ title: "2 إيذاء الرسول ﷺ", arabic: "إيذاء النبي ﷺ", file: "/audio/al-fatiha.mp3" },
  { title: "هجرة الرسول ﷺ", arabic: "هجرة الرسول ﷺ", file: "/audio/hijratu-ar-rasul.mp3" },

{ title: "1 نَعيمُ أهلِ الجنة", arabic: "نَعيمُ أهلِ الجنة", file: "/audio/yusuf.mp3" },
{ title: "2 نَعيمُ أهلِ الجنة", arabic: "نَعيمُ أهلِ الجنة", file: "/audio/al-ikhlas.mp3" },
{ title: "التوكّل على الله", arabic: "التوكّل على الله", file: "/audio/al-falaq.mp3" },
{ title: "حقيقة التوكل على الله", arabic: "حقيقة التوكل على الله", file: "/audio/true-tawakkul.mp3" },
{ title: "حسبنا الله ونعم الوكيل", arabic: "حسبنا الله ونعم الوكيل", file: "/audio/hasbuna-Allah-wa-nima-al-wakeel.mp3" },

{ title: "لا حول ولا قوة إلا بالله", arabic: "لا حول ولا قوة إلا بالله", file: "/audio/la-hawla-wa-la-quwwata-illa-billah.mp3" },
{ title: "فضل سبحان الله", arabic: "فضل سبحان الله", file: "/audio/fadl-subhan-Allah.mp3" },
{ title: "فضل البنات", arabic: "فضل البنات", file: "/audio/virtue-of-daughters.mp3" },
{ title: "فضل البنات", arabic: "فضل البنات", file: "/audio/virtue-of-daughters.mp3" },
  { title: "دور المرأة في الإسلام", arabic: "دور المرأة في الإسلام", file: "/audio/the-role-of-woman-in-islam.mp3" },

{ title: "السلف الصالح والدعاء بإصلاح الذرية", arabic: "السلف الصالح والدعاء بإصلاح الذرية", file: "/audio/righteous-salaf-and-dua-for-children.mp3" },
{ title: "من ترك لله شيئا عوضه الله خيرا منه", arabic: "من ترك لله شيئا عوضه الله خيرا منه", file: "/audio/whoever-leaves-for-allah.mp3" },
{ title: "المغالاة في المهور", arabic: "المغالاة في المهور", file: "/audio/high-dowry-problem.mp3" },
{ title: "مجهولون في الارض معروفون في السماء", arabic: "مجهولون في الارض معروفون في السماء", file: "/audio/unknown-on-earth-known-in-heaven.mp3" },
{ title: "الحب في الله", arabic: "الحب في الله", file: "/audio/love-for-the-sake-of-allah.mp3" },
{ title: "حب الله تعالى للعبد", arabic: "حب الله تعالى للعبد", file: "/audio/allahs-love-for-servnt.mp3" },
{ title: "أسباب حفظ الله للعبد", arabic: "أسباب حفظ الله للعبد", file: "/audio/reasons-allah-protects-servant.mp3" },
{ title: "1 أولياء الله تعالى", arabic: "أولياء الله تعالى", file: "/audio/awliya1-allah.mp3" },
{ title: "2 أولياء الله تعالى", arabic: "أولياء الله تعالى", file: "/audio/awliya2-allah.mp3" },
{ title: "3 أولياء الله تعالى", arabic: "أولياء الله تعالى", file: "/audio/awliya3-allah.mp3" },
{ title: "المحافظة على المال العام", arabic: "المحافظة على المال العام", file: "/audio/protecting-public-wealth.mp3" },
{ title: "السعادة الزوجية", arabic: "السعادة الزوجية", file: "/audio/marital-happiness.mp3" },
{ title: "لا تحقرن من المعروف شيئا", arabic: "لا تحقرن من المعروف شيئا", file: "/audio/never-belittle-good.mp3" },
{ title: "علامات توفيق الله للعبد", arabic: "علامات توفيق الله للعبد", file: "/audio/signs-of-allahs-guidance.mp3" },
{ title: "قضاء حوائج الناس", arabic: "قضاء حوائج الناس", file: "/audio/fulfilling-peoples-needs.mp3" },
{ title: "مرافقة النبي صلى الله عليه وسلم", arabic: "مرافقة النبي صلى الله عليه وسلم", file: "/audio/companionship-of-the-prophet.mp3" },
{ title: "اتق الله حيثما كنت", arabic: "اتق الله حيثما كنت", file: "/audio/fear-allah-wherever-you-are.mp3" },
{ title: "العفو والتسامح", arabic: "العفو والتسامح", file: "/audio/forgiveness-and-tolerance.mp3" },
{ title: "وكان أبوهما صالحا", arabic: "وكان أبوهما صالحا", file: "/audio/their-father-was-righteous.mp3" },
{ title: "الإصلاح بين الناس", arabic: "الإصلاح بين الناس", file: "/audio/reconciliation-between-people.mp3" },
{ title: "البكاء من خشية الله", arabic: "البكاء من خشية الله", file: "/audio/crying-out-of-fear-of-allah.mp3" },
{ title: "البشائر المحمدية ﷺ", arabic: "البشائر المحمدية ﷺ", file: "/audio/al-bashaair-al-muhammadiyya.mp3" },
{ title: "إن من إجلال الله تعالى إجلال ذي الشيبة المسلم", arabic: "إن من إجلال الله تعالى إجلال ذي الشيبة المسلم", file: "/audio/ijlal-dhi-al-shayba.mp3" },
{ title: "الأسباب الثبات على دين الله", arabic: "الأسباب الثبات على دين الله", file: "/audio/asbab-al-thabat-ala-din-Allah.mp3" },
{ title: "حسن الظن بالله", arabic: "حسن الظن بالله", file: "/audio/husn-al-dhann-billah.mp3" },

  { title: "الإخلاص في الأعمال", arabic: "الإخلاص في الأعمال", file: "/audio/sincerity-in-deeds.mp3" },
  { title: "قصة أبي هريرة مع الشيطان", arabic: "قصة أبي هريرة مع الشيطان", file: "/audio/abu-huraira-and-the-devil.mp3" },
  { title: "عبد الله بن أم مكتوم رضي الله عنه", arabic: "عبد الله بن أم مكتوم رضي الله عنه", file: "/audio/abdullahi-ibnu-umimaktum.mp3" },
  { title: "عبد الرحمن بن عوف رضي الله عنه", arabic: "عبد الرحمن بن عوف رضي الله عنه", file: "/audio/abdurahman-ibnu-owf.mp3" },
  
{ title: "قصة يوسف عليه السلام", arabic: "قصة يوسف عليه السلام", file: "/audio/story-of-yusuf.mp3" },
{ title: "الحسن البصري رحمه الله ومواعظه", arabic: "الحسن البصري رحمه الله ومواعظه", file: "/audio/al-hasan-al-basri-sermons.mp3" },
{ title: "فضل النوافل", arabic: "فضل النوافل", file: "/audio/fadhl-nawafil.mp3" },
  { title: "حفظ الأسرار", arabic: "حفظ الأسرار", file: "/audio/hifz-al-asrar.mp3" },
  

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

      <div className="content">
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
