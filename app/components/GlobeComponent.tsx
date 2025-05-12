"use client";

import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { motion } from "framer-motion";

interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  label: string;
}

const GlobeComponent = () => {
  const globeRef = useRef<GlobeMethods>(null!);
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Creator's location (Andhra Pradesh, India)
  const creatorLocation = {
    lat: 15.9129,
    lng: 79.74,
  };

  useEffect(() => {
    setMounted(true);
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        // Create multiple arcs for a more dynamic effect
        const arcs = [];
        for (let i = 0; i < 5; i++) {
          arcs.push({
            startLat: creatorLocation.lat,
            startLng: creatorLocation.lng,
            endLat: userLocation.lat,
            endLng: userLocation.lng,
            color:
              i === 0
                ? "#3b82f6"
                : i === 1
                ? "#60a5fa"
                : i === 2
                ? "#93c5fd"
                : i === 3
                ? "#bfdbfe"
                : "#dbeafe",
            label: "",
          });
        }
        setArcs(arcs);
        setIsLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        // Use a default location if geolocation fails
        const defaultLocation = {
          lat: 40.7128,
          lng: -74.006,
        };

        // Create multiple arcs for default location
        const arcs = [];
        for (let i = 0; i < 5; i++) {
          arcs.push({
            startLat: creatorLocation.lat,
            startLng: creatorLocation.lng,
            endLat: defaultLocation.lat,
            endLng: defaultLocation.lng,
            color:
              i === 0
                ? "#3b82f6"
                : i === 1
                ? "#60a5fa"
                : i === 2
                ? "#93c5fd"
                : i === 3
                ? "#bfdbfe"
                : "#dbeafe",
            label: "",
          });
        }
        setArcs(arcs);
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;

      // Set initial position
      globeRef.current.pointOfView({ altitude: 2.5 });
    }
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Loading globe...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          width={400}
          height={400}
          arcsData={arcs}
          arcLabel="label"
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcAltitude={0.3}
          arcAltitudeAutoScale={0.5}
          arcStroke={0.2}
          arcCurveResolution={64}
          arcCircularResolution={6}
          arcsTransitionDuration={1000}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
          backgroundColor="rgba(0,0,0,0)"
        />
      </motion.div>
    </div>
  );
};

export default GlobeComponent;
