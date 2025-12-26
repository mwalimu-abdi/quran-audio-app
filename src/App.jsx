import { useRef, useState, useEffect } from "react";
import "./App.css";


const playlist = [
  { title: "1 الرسول ﷺ", arabic: "النبي ﷺ", file: "/audio/compressed/the-prophet-one.opus" },
  { title: "2 الرسول ﷺ", arabic: "الرسول صلى الله عليه وسلم", file: "/audio/compressed/prophet-muhammad.opus" },
  { title: "1 إيذاء الرسو ﷺ", arabic: "المشاكل التي واجهها النبي ﷺ", file: "/audio/compressed/the-problems-faced-by-the-prophet.opus" },
  { title: "2 إيذاء الرسول ﷺ", arabic: "إيذاء النبي ﷺ", file: "/audio/compressed/al-fatiha.opus" },
  { title: "هجرة الرسول ﷺ", arabic: "هجرة الرسول ﷺ", file: "/audio/compressed/hijratu-ar-rasul.opus" },
  { title: "1 نَعيمُ أهلِ الجنة", arabic: "نَعيمُ أهلِ الجنة", file: "/audio/compressed/yusuf.opus" },
  { title: "2 نَعيمُ أهلِ الجنة", arabic: "نَعيمُ أهلِ الجنة", file: "/audio/compressed/al-ikhlas.opus" },
  { title: "التوكّل على الله", arabic: "التوكّل على الله", file: "/audio/compressed/al-falaq.opus" },
  { title: "حقيقة التوكل على الله", arabic: "حقيقة التوكل على الله", file: "/audio/compressed/true-tawakkul.opus" },
  { title: "حسبنا الله ونعم الوكيل", arabic: "حسبنا الله ونعم الوكيل", file: "/audio/compressed/hasbuna-Allah-wa-nima-al-wakeel.opus" },
  { title: "لا حول ولا قوة إلا بالله", arabic: "لا حول ولا قوة إلا بالله", file: "/audio/compressed/la-hawla-wa-la-quwwata-illa-billah.opus" },
  { title: "فضل سبحان الله", arabic: "فضل سبحان الله", file: "/audio/compressed/fadl-subhan-Allah.opus" },
  { title: "فضل البنات", arabic: "فضل البنات", file: "/audio/compressed/virtue-of-daughters.opus" },
  { title: "دور المرأة في الإسلام", arabic: "دور المرأة في الإسلام", file: "/audio/compressed/the-role-of-woman-in-islam.opus" },
  { title: "السلف الصالح والدعاء بإصلاح الذرية", arabic: "السلف الصالح والدعاء بإصلاح الذرية", file: "/audio/compressed/righteous-salaf-and-dua-for-children.opus" },
  { title: "من ترك لله شيئا عوضه الله خيرا منه", arabic: "من ترك لله شيئا عوضه الله خيرا منه", file: "/audio/compressed/whoever-leaves-for-allah.opus" },
  { title: "المغالاة في المهور", arabic: "المغالاة في المهور", file: "/audio/compressed/high-dowry-problem.opus" },
  { title: "مجهولون في الارض معروفون في السماء", arabic: "مجهولون في الارض معروفون في السماء", file: "/audio/compressed/unknown-on-earth-known-in-heaven.opus" },
  { title: "الحب في الله", arabic: "الحب في الله", file: "/audio/compressed/love-for-the-sake-of-allah.opus" },
  { title: "حب الله تعالى للعبد", arabic: "حب الله تعالى للعبد", file: "/audio/compressed/allahs-love-for-servnt.opus" },
  { title: "أسباب حفظ الله للعبد", arabic: "أسباب حفظ الله للعبد", file: "/audio/compressed/reasons-allah-protects-servant.opus" },
  { title: "1 أولياء الله تعالى", arabic: "أولياء الله تعالى", file: "/audio/compressed/awliya1-allah.opus" },
  { title: "2 أولياء الله تعالى", arabic: "أولياء الله تعالى", file: "/audio/compressed/awliya2-allah.opus" },
  { title: "3 أولياء الله تعالى", arabic: "أولياء الله تعالى", file: "/audio/compressed/awliya3-allah.opus" },
  { title: "المحافظة على المال العام", arabic: "المحافظة على المال العام", file: "/audio/compressed/protecting-public-wealth.opus" },
  { title: "السعادة الزوجية", arabic: "السعادة الزوجية", file: "/audio/compressed/marital-happiness.opus" },
  { title: "لا تحقرن من المعروف شيئا", arabic: "لا تحقرن من المعروف شيئا", file: "/audio/compressed/never-belittle-good.opus" },
  { title: "علامات توفيق الله للعبد", arabic: "علامات توفيق الله للعبد", file: "/audio/compressed/signs-of-allahs-guidance.opus" },
  { title: "قضاء حوائج الناس", arabic: "قضاء حوائج الناس", file: "/audio/compressed/fulfilling-peoples-needs.opus" },
  { title: "مرافقة النبي صلى الله عليه وسلم", arabic: "مرافقة النبي صلى الله عليه وسلم", file: "/audio/compressed/companionship-of-the-prophet.opus" },
  { title: "اتق الله حيثما كنت", arabic: "اتق الله حيثما كنت", file: "/audio/compressed/fear-allah-wherever-you-are.opus" },
  { title: "العفو والتسامح", arabic: "العفو والتسامح", file: "/audio/compressed/forgiveness-and-tolerance.opus" },
  { title: "وكان أبوهما صالحا", arabic: "وكان أبوهما صالحا", file: "/audio/compressed/their-father-was-righteous.opus" },
  { title: "الإصلاح بين الناس", arabic: "الإصلاح بين الناس", file: "/audio/compressed/reconciliation-between-people.opus" },
  { title: "البكاء من خشية الله", arabic: "البكاء من خشية الله", file: "/audio/compressed/crying-out-of-fear-of-allah.opus" },
  { title: "البشائر المحمدية ﷺ", arabic: "البشائر المحمدية ﷺ", file: "/audio/compressed/al-bashaair-al-muhammadiyya.opus" },
  { title: "إن من إجلال الله تعالى إجلال ذي الشيبة المسلم", arabic: "إن من إجلال الله تعالى إجلال ذي الشيبة المسلم", file: "/audio/compressed/ijlal-dhi-al-shayba.opus" },
  { title: "الأسباب الثبات على دين الله", arabic: "الأسباب الثبات على دين الله", file: "/audio/compressed/asbab-al-thabat-ala-din-Allah.opus" },
  { title: "حسن الظن بالله", arabic: "حسن الظن بالله", file: "/audio/compressed/husn-al-dhann-billah.opus" },
  { title: "الإخلاص في الأعمال", arabic: "الإخلاص في الأعمال", file: "/audio/compressed/sincerity-in-deeds.opus" },
  { title: "قصة أبي هريرة مع الشيطان", arabic: "قصة أبي هريرة مع الشيطان", file: "/audio/compressed/abu-huraira-and-the-devil.opus" },
  { title: "عبد الله بن أم مكتوم رضي الله عنه", arabic: "عبد الله بن أم مكتوم رضي الله عنه", file: "/audio/compressed/abdullahi-ibnu-umimaktum.opus" },
  { title: "عبد الرحمن بن عوف رضي الله عنه", arabic: "عبد الرحمن بن عوف رضي الله عنه", file: "/audio/compressed/abdurahman-ibnu-owf.opus" },
  { title: "قصة يوسف عليه السلام", arabic: "قصة يوسف عليه السلام", file: "/audio/compressed/story-of-yusuf.opus" },
  { title: "الحسن البصري رحمه الله ومواعظه", arabic: "الحسن البصري رحمه الله ومواعظه", file: "/audio/compressed/al-hasan-al-basri-sermons.opus" },
  { title: "فضل النوافل", arabic: "فضل النوافل", file: "/audio/compressed/fadhl-nawafil.opus" },
  { title: "حفظ الأسرار", arabic: "حفظ الأسرار", file: "/audio/compressed/hifz-al-asrar.opus" },
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setMeta = () => setDuration(audio.duration || 0);
    audio.addEventListener("loadedmetadata", setMeta);
    return () => audio.removeEventListener("loadedmetadata", setMeta);
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    if (isPlaying) audio.play();
  }, [currentIndex]);

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
