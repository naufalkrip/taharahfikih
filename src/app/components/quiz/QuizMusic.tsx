import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export const QUIZ_MUSIC_URL =
  "https://archive.org/download/AbouElyes/BackgroundNasheed-RelaxingBn.mp3";

interface QuizMusicProps {
  playing: boolean;
}

export function QuizMusic({ playing }: QuizMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.12;
    audio.preload = "none";
    audioRef.current = audio;

    const handleCanPlay = () => setReady(true);
    const handleError = () => {
      audio.src = "";
      audio.load();
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.src = QUIZ_MUSIC_URL;
    audio.load();

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !ready) return;

    if (playing && !muted) {
      audio.play().catch(() => setMuted(true));
    } else {
      audio.pause();
    }
  }, [playing, ready, muted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      setMuted(false);
      audio.muted = false;
      if (playing) audio.play().catch(() => {});
    } else {
      setMuted(true);
      audio.muted = true;
    }
  };

  if (!ready) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        <Music className="w-3.5 h-3.5 text-muted-foreground animate-pulse" />
        <span className="text-xs text-muted-foreground">Memuat musik...</span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border shadow-sm hover:bg-card transition-all duration-200"
      title={muted ? "Aktifkan musik" : "Matikan musik"}
    >
      {muted ? (
        <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
      )}
      <span className="text-xs text-muted-foreground">
        {muted ? "Putar Musik" : "Musik On"}
      </span>
    </button>
  );
}
