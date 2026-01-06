import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  src: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-card rounded-xl p-4 shadow-sm border border-border/60">
      <audio ref={audioRef} src={src} />
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            <button
              onClick={handleRestart}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1">
             <div className="flex justify-between text-xs text-muted-foreground mb-1 font-medium">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration || 0)}</span>
            </div>
            <Slider
              value={[progress]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
          </div>
          
          <div className="hidden sm:flex items-center gap-2 w-24">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={1}
              step={0.1}
              onValueChange={(vals) => {
                setVolume(vals[0]);
                if (audioRef.current) audioRef.current.volume = vals[0];
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
