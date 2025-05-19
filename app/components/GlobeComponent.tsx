/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { motion } from "framer-motion";

interface Location {
  lat: number;
  lng: number;
  name: string;
  color: string;
  size: number;
}

interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

interface CountryProperties {
  ADMIN: string;
  POP_EST: number;
  ISO_A2: string;
}

interface Country {
  properties: CountryProperties;
  [key: string]: unknown; // Changed from any to unknown
}

const GlobeComponent = () => {
  const globeRef = useRef<GlobeMethods>(null!);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [countries, setCountries] = useState<{ features: Country[] }>({
    features: [],
  });
  const [hoverD, setHoverD] = useState<Country | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1.5);

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

  // Load country data
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then((data: { features: Country[] }) => setCountries(data));
  }, []);

  // Creator's location (Andhra Pradesh, India)
  const creatorLocation = {
    lat: 15.9129,
    lng: 79.74,
  };

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  useEffect(() => {
    setMounted(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        // Calculate distance
        const dist = calculateDistance(
          creatorLocation.lat,
          creatorLocation.lng,
          userLocation.lat,
          userLocation.lng
        );
        setDistance(dist);

        // Set locations
        const newLocations = [
          {
            lat: creatorLocation.lat,
            lng: creatorLocation.lng,
            name: "Andhra Pradesh",
            color: "#ef4444",
            size: 20,
          },
          {
            lat: userLocation.lat,
            lng: userLocation.lng,
            name: "Your Location",
            color: "#22c55e",
            size: 20,
          },
        ];
        setLocations(newLocations);

        // Create multiple arcs bHAI
        const newArcs = [];
        for (let i = 0; i < 3; i++) {
          newArcs.push({
            startLat: creatorLocation.lat,
            startLng: creatorLocation.lng,
            endLat: userLocation.lat,
            endLng: userLocation.lng,
            color: "#F70000",
          });
        }
        setArcs(newArcs);
        setIsLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);

        const defaultLocation = {
          lat: 40.7128,
          lng: -74.006,
        };

        // Calculate distance with default location
        const dist = calculateDistance(
          creatorLocation.lat,
          creatorLocation.lng,
          defaultLocation.lat,
          defaultLocation.lng
        );
        setDistance(dist);

        console.log("distance", dist);

        const newLocations = [
          {
            lat: creatorLocation.lat,
            lng: creatorLocation.lng,
            name: "Andhra Pradesh",
            color: "#ef4444",
            size: 20,
          },
          {
            lat: defaultLocation.lat,
            lng: defaultLocation.lng,
            name: "Default Location",
            color: "#22c55e",
            size: 20,
          },
        ];
        setLocations(newLocations);

        const newArcs = [];
        for (let i = 0; i < 3; i++) {
          newArcs.push({
            startLat: creatorLocation.lat,
            startLng: creatorLocation.lng,
            endLat: defaultLocation.lat,
            endLng: defaultLocation.lng,
            color: "#3b82f6",
          });
        }
        setArcs(newArcs);
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      // Enhanced auto-rotate settings
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1.5;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.controls().enablePan = true;
      globeRef.current.controls().minDistance = 200;
      globeRef.current.controls().maxDistance = 500;

      // Set initial position with smooth animation
      globeRef.current.pointOfView(
        { altitude: 2.5 },
        1000 // Add animation duration
      );

      // Add smooth rotation on mount
      setTimeout(() => {
        if (globeRef.current) {
          globeRef.current.controls().autoRotate = true;
          globeRef.current.controls().autoRotateSpeed = 1.5;
        }
      }, 1000);
    }
  }, []);

  // Add window resize handler for responsive rotation
  useEffect(() => {
    const handleResize = () => {
      if (globeRef.current) {
        // Adjust rotation speed based on screen size
        const speed = window.innerWidth < 640 ? 1 : 1.5;
        globeRef.current.controls().autoRotateSpeed = speed;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to toggle rotation
  const toggleRotation = () => {
    if (globeRef.current) {
      const newRotationState = !isRotating;
      setIsRotating(newRotationState);
      globeRef.current.controls().autoRotate = newRotationState;
    }
  };

  // Function to handle speed change
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value);
    setRotationSpeed(newSpeed);
    if (globeRef.current) {
      globeRef.current.controls().autoRotateSpeed = newSpeed;
      // Add a slight tilt effect based on speed
      const tiltAngle = Math.min(newSpeed * 0.2, 0.5);
      globeRef.current.pointOfView({ altitude: 2.5, lat: tiltAngle * 10 }, 300);
    }
  };

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-center dark:text-gray-300 font-medium">
            Loading globe...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[350px] sm:max-w-[600px] h-[300px] sm:h-[400px] md:h-[500px] mb-2 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center"
        >
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            width={window.innerWidth < 640 ? 350 : 600}
            height={window.innerWidth < 640 ? 350 : 600}
            htmlElementsData={locations}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.1}
            htmlElement={(d) => {
              const el = document.createElement("div");
              el.innerHTML = markerSvg;
              el.style.color = (d as Location).color;
              el.style.width = `${(d as Location).size}px`;
              el.style.transition = "opacity 250ms";
              el.style.pointerEvents = "auto";
              el.style.cursor = "pointer";
              el.onclick = () => console.info(d);
              return el;
            }}
            htmlElementVisibilityModifier={(el, isVisible) => {
              el.style.opacity = isVisible ? "1" : "0";
            }}
            arcsData={arcs}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor="color"
            arcAltitude={0.4}
            arcAltitudeAutoScale={0.5}
            arcStroke={0.7}
            arcCurveResolution={32}
            arcCircularResolution={3}
            arcsTransitionDuration={500}
            arcDashLength={0.2}
            arcDashGap={0.1}
            arcDashAnimateTime={1000}
            polygonsData={countries.features.filter(
              (d) => d.properties.ISO_A2 !== "AQ"
            )}
            polygonCapColor={() => "rgba(0,0,0,0)"}
            polygonSideColor={() => "rgba(0,0,0,0)"}
            polygonStrokeColor={() => "#FFD700"}
            polygonLabel={(d: unknown): string => {
              const country = d as Country;
              return `
                <div style="
                  background-color: rgba(0, 0, 0, 0.8);
                  color: white;
                  padding: 8px;
                  border-radius: 4px;
                  font-size: 12px;
                ">
                  <div><b>${country.properties.ADMIN} (${
                country.properties.ISO_A2
              })</b></div>
                  <div>Population: ${country.properties.POP_EST.toLocaleString()}</div>
                </div>
              `;
            }}
            polygonsTransitionDuration={200}
            backgroundColor="rgba(0,0,0,0)"
          />
        </motion.div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-[300px] mx-auto px-4 flex flex-col items-center space-y-3">
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">0.1x</span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {rotationSpeed.toFixed(1)}x
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">7x</span>
        </div>
        <div className="w-full flex items-center space-x-3">
          <input
            type="range"
            min="0.1"
            max="7"
            step="0.1"
            value={rotationSpeed}
            onChange={handleSpeedChange}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-600 active:accent-blue-700"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                (rotationSpeed / 7) * 100
              }%, #e5e7eb ${(rotationSpeed / 7) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleRotation}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-1.5 text-sm"
            >
              <span>{isRotating ? "Stop" : "Start"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isRotating ? "animate-spin" : ""
                }`}
                style={{ animationDuration: `${2 / rotationSpeed}s` }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {distance !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center mt-2"
        >
          <p className="text-sm sm:text-lg text-zinc-800 dark:text-zinc-200 max-w-md mx-auto px-4">
            I&apos;m based in{" "}
            <strong className="text-blue-600 dark:text-blue-400">
              Andhra, India
            </strong>
            , approximately{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {distance}{" "}
            </span>
            kilometers from your current location.
            {distance > 2000 && " That's quite a journey!"}
            {distance > 10000 &&
              " We're almost on opposite sides of the globe!"}
            {distance < 700 && " Wow, we're practically neighbors!"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default GlobeComponent;
