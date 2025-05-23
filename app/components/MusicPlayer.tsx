"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  ChevronLeft,
} from "lucide-react";

interface Song {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  albumArt: string;
  theme: "red" | "purple" | "orange";
}

const sampleSongs: Song[] = [
  {
    id: 1,
    title: "Can You Hear the Music",
    artist: "Bring Me The Horizon",
    audioUrl: "/can.mp3",
    albumArt: "/can_you.jpg",
    theme: "red",
  },
  {
    id: 2,
    title: "Lost But Won",
    artist: "Hans Zimmer",
    audioUrl: "/lost.mp3",
    albumArt: "/rush.jpg",
    theme: "purple",
  },
];

const themeColors = {
  red: {
    bg: "bg-gradient-to-b from-red-100 to-white dark:from-red-950 dark:to-black",
    primary: "text-red-600 dark:text-red-500",
    secondary: "text-red-500 dark:text-red-400",
    button: "bg-red-600 hover:bg-red-700 dark:bg-red-600",
    progress: "stroke-red-600 dark:stroke-red-500",
    progressBg: "stroke-red-200 dark:stroke-red-950",
    heart: "text-red-600 dark:text-red-500",
    lyrics: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-500",
  },
  purple: {
    bg: "bg-gradient-to-b from-purple-100 to-white dark:from-purple-950 dark:to-black",
    primary: "text-purple-600 dark:text-purple-500",
    secondary: "text-purple-500 dark:text-purple-400",
    button: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600",
    progress: "stroke-purple-600 dark:stroke-purple-500",
    progressBg: "stroke-purple-200 dark:stroke-purple-950",
    heart: "text-purple-600 dark:text-purple-500",
    lyrics:
      "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-500",
  },
  orange: {
    bg: "bg-gradient-to-b from-amber-100 to-white dark:from-amber-950 dark:to-black",
    primary: "text-amber-600 dark:text-amber-500",
    secondary: "text-amber-500 dark:text-amber-400",
    button: "bg-amber-600 hover:bg-amber-700 dark:bg-amber-600",
    progress: "stroke-amber-600 dark:stroke-amber-500",
    progressBg: "stroke-amber-200 dark:stroke-amber-950",
    heart: "text-amber-600 dark:text-amber-500",
    lyrics: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-500",
  },
};

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song>(sampleSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener("ended", handleSongEnd);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, []);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSongEnd = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      playNextSong();
    }
  };

  const playNextSong = () => {
    const currentIndex = sampleSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextIndex = (currentIndex + 1) % sampleSongs.length;
    setCurrentSong(sampleSongs[nextIndex]);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 100);
    }
  };

  const playPreviousSong = () => {
    const currentIndex = sampleSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    const prevIndex =
      (currentIndex - 1 + sampleSongs.length) % sampleSongs.length;
    setCurrentSong(sampleSongs[prevIndex]);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 100);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const colors = themeColors[currentSong.theme];
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Calculate progress marker position
  const getProgressMarkerPosition = () => {
    if (isNaN(progress)) return { x: 132, y: 12 };
    const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
    return {
      x: 132 + 120 * Math.cos(angle),
      y: 132 + 120 * Math.sin(angle),
    };
  };

  const markerPos = getProgressMarkerPosition();

  return (
    <div
      className={`relative rounded-3xl overflow-hidden ${colors.bg} flex flex-col items-center p-4 h-[600px] max-w-4xl mx-auto md:w-full sm:w-[95%] w-[90%] shadow-lg`}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <button
          aria-label="Previous Song"
          className="text-zinc-800 dark:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-zinc-800 dark:text-white text-xs font-medium tracking-wider">
          PLAYING NOW
        </div>
        <button
          aria-label="Favorite Song"
          className={`${
            isFavorite ? colors.heart : "text-zinc-800 dark:text-white"
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Album Art with Progress Circle */}
      <div className="relative w-[390px] h-[280px] mb-4 md:w-[390px] sm:w-[320px]  md:h-[280px] sm:h-[230px] ">
        <svg
          className="absolute w-full h-full -rotate-90"
          viewBox="0 0 264 264"
        >
          <circle
            cx="132"
            cy="132"
            r="120"
            fill="none"
            strokeWidth="2"
            className={colors.progressBg}
          />
          <circle
            cx="132"
            cy="132"
            r="120"
            fill="none"
            strokeWidth="2"
            className={colors.progress}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
          {/* Time markers */}
          <circle
            cx="132"
            cy="12"
            r="3"
            className="fill-zinc-800 dark:fill-white"
          />
          <circle
            cx={markerPos.x}
            cy={markerPos.y}
            r="4"
            className={`fill-${
              currentSong.theme === "red"
                ? "red"
                : currentSong.theme === "purple"
                ? "purple"
                : "amber"
            }-600 dark:fill-${
              currentSong.theme === "red"
                ? "red"
                : currentSong.theme === "purple"
                ? "purple"
                : "amber"
            }-500`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-[200px] h-[200px] md:w-[200px] sm:w-[160px] md:h-[200px] sm:h-[160px] rounded-full overflow-hidden border-2 border-zinc-200 dark:border-white/20"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src={currentSong.albumArt}
              alt={`${currentSong.title} album art`}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-zinc-600 dark:text-white/70 text-xs mt-2">
          {formatTime(currentTime)}
        </div>
        <div className="absolute bottom-0 right-4 text-zinc-600 dark:text-white/70 text-xs">
          {formatTime(duration)}
        </div>
      </div>

      {/* Song Info */}
      <div className="text-center mb-4 md:w-auto sm:w-[90%] w-[85%]">
        <h2 className="text-zinc-800 dark:text-white text-lg font-bold mb-1 md:text-lg sm:text-base">
          {currentSong.title}
        </h2>
        <p className="text-zinc-600 dark:text-white/70 md:text-sm sm:text-xs text-xs">
          {currentSong.artist}
        </p>
      </div>

      {/* Time Slider */}
      <div className="w-full px-4 mb-4">
        <div className="relative h-1 bg-zinc-200 dark:bg-white/20 rounded-full">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value);
              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute h-full bg-zinc-600 dark:bg-white rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-zinc-600 dark:text-white/70 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between w-full mb-4 md:px-4 sm:px-2 px-1">
        <button
          aria-label="Shuffle"
          onClick={() => setIsShuffle(!isShuffle)}
          className={`text-zinc-800 dark:text-white ${
            isShuffle ? colors.primary : ""
          }`}
        >
          <Shuffle size={18} />
        </button>
        <div className="flex items-center gap-4 md:gap-4 sm:gap-2">
          <button
            aria-label="Previous Song"
            className="text-zinc-800 dark:text-white"
            onClick={playPreviousSong}
          >
            <SkipBack
              size={24}
              fill="currentColor"
              className="md:w-6 sm:w-5 w-4"
            />
          </button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className={`${colors.button} md:w-12 md:h-12 sm:w-10 sm:h-10 w-8 h-8 rounded-full flex items-center justify-center`}
          >
            {isPlaying ? (
              <Pause
                size={24}
                fill="white"
                className="text-white md:w-6 sm:w-5 w-4"
              />
            ) : (
              <Play
                size={24}
                fill="white"
                className="text-white ml-1 md:w-6 sm:w-5 w-4"
              />
            )}
          </motion.button>
          <button
            className="text-zinc-800 dark:text-white"
            onClick={playNextSong}
          >
            <SkipForward
              size={24}
              fill="currentColor"
              className="md:w-6 sm:w-5 w-4"
            />
          </button>
        </div>
        <button
          aria-label="Repeat"
          onClick={() => setIsRepeat(!isRepeat)}
          className={`text-zinc-800 dark:text-white ${
            isRepeat ? colors.primary : ""
          }`}
        >
          <Repeat size={18} />
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onEnded={handleSongEnd}
      />
    </div>
  );
}
