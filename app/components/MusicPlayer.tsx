"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaStepForward,
  FaStepBackward,
  FaHeart,
  FaArrowLeft,
  FaRandom,
  FaRedo,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Song {
  title: string;
  artist: string;
  src: string;
  cover: string;
  theme: "red" | "purple" | "orange";
}

const songs: Song[] = [
  {
    title: "Can You Feel It",
    artist: "Lost Frequencies",
    src: "/can.mp3",
    cover: "/can_you.jpg",
    theme: "purple",
  },
  {
    title: "Lost",
    artist: "Frank Ocean",
    src: "/lost.mp3",
    cover: "/rush.jpg",
    theme: "red",
  },
];

const themeColors = {
  red: {
    bg: "bg-gradient-to-b from-red-950 to-black",
    primary: "text-red-500",
    secondary: "text-red-400",
    button: "bg-red-600",
    progress: "stroke-red-500",
    progressBg: "stroke-red-950",
    heart: "text-red-500",
    lyrics: "bg-red-950 text-red-500",
  },
  purple: {
    bg: "bg-gradient-to-b from-purple-950 to-black",
    primary: "text-purple-500",
    secondary: "text-purple-400",
    button: "bg-purple-600",
    progress: "stroke-purple-500",
    progressBg: "stroke-purple-950",
    heart: "text-purple-500",
    lyrics: "bg-purple-950 text-purple-500",
  },
  orange: {
    bg: "bg-gradient-to-b from-amber-950 to-black",
    primary: "text-amber-500",
    secondary: "text-amber-400",
    button: "bg-amber-600",
    progress: "stroke-amber-500",
    progressBg: "stroke-amber-950",
    heart: "text-amber-500",
    lyrics: "bg-amber-950 text-amber-500",
  },
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs[currentSongIndex];
  const colors = themeColors[currentSong.theme];
  const progress = (currentTime / duration) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const playNext = () => {
    if (isShuffle) {
      const nextIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(nextIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (isShuffle) {
      const prevIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(prevIndex);
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    }
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-3xl overflow-hidden ${colors.bg} flex flex-col items-center p-6 w-[400px] h-[600px]`}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-white"
        >
          <FaArrowLeft size={24} />
        </motion.button>
        <div className="text-white text-xs font-medium tracking-wider">
          PLAYING NOW
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={isFavorite ? colors.heart : "text-white"}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <FaHeart size={24} fill={isFavorite ? "currentColor" : "none"} />
        </motion.button>
      </div>

      {/* Album Art with Progress Circle */}
      <div className="relative w-64 h-64 mb-8">
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
          <circle cx="132" cy="12" r="4" className="fill-white" />
          <circle
            cx={
              132 + 120 * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2)
            }
            cy={
              132 + 120 * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2)
            }
            r="6"
            className={`fill-${
              currentSong.theme === "red"
                ? "red"
                : currentSong.theme === "purple"
                ? "purple"
                : "amber"
            }-500`}
          />
        </svg>
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${colors.primary.replace(
              "text-",
              ""
            )} ${progress}%, transparent ${progress}%)`,
          }}
        />
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-56 h-56 mx-auto mt-4 rounded-full overflow-hidden"
        >
          <Image
            src={currentSong.cover}
            alt={currentSong.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Song Info */}
      <div className="text-center mb-8">
        <h2 className="text-white text-xl font-bold mb-1">
          {currentSong.title}
        </h2>
        <p className="text-white/70 text-sm">{currentSong.artist}</p>
      </div>

      {/* Duration Slider */}
      <div className="w-full max-w-[320px] mb-8">
        <div className="relative">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:appearance-none
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:transition-all
              [&::-moz-range-thumb]:hover:scale-110
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:outline-none
              [&::-moz-range-track]:bg-white/20
              [&::-moz-range-track]:rounded-full
              [&::-moz-range-track]:h-1"
            style={{
              background: `linear-gradient(to right, ${colors.primary.replace(
                "text-",
                ""
              )} ${progress}%, rgba(255, 255, 255, 0.2) ${progress}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-white/70 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between w-full max-w-[320px] mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsShuffle(!isShuffle)}
          className={`text-white ${isShuffle ? colors.primary : ""}`}
        >
          <FaRandom size={20} />
        </motion.button>
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playPrevious}
            className="text-white"
          >
            <FaStepBackward size={28} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className={`${colors.button} w-14 h-14 rounded-full flex items-center justify-center`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isPlaying ? "pause" : "play"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {isPlaying ? (
                  <FaPause size={24} className="text-white" />
                ) : (
                  <FaPlay size={24} className="text-white ml-1" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playNext}
            className="text-white"
          >
            <FaStepForward size={28} />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsRepeat(!isRepeat)}
          className={`text-white ${isRepeat ? colors.primary : ""}`}
        >
          <FaRedo size={20} />
        </motion.button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-end space-x-4 mt-auto w-full max-w-[320px]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="text-white"
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </motion.button>
          <div className="relative group">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {Math.round(volume * 100)}%
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:hover:scale-110
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:outline-none
                [&::-moz-range-track]:bg-white/20
                [&::-moz-range-track]:rounded-full
                [&::-moz-range-track]:h-1"
              style={{
                background: `linear-gradient(to right, white ${
                  volume * 100
                }%, rgba(255, 255, 255, 0.2) ${volume * 100}%)`,
              }}
            />
          </div>
        </motion.div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={isRepeat ? () => audioRef.current?.play() : playNext}
        autoPlay={isPlaying}
      />
    </motion.div>
  );
};

export default MusicPlayer;
