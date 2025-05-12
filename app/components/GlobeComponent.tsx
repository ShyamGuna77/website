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

  useEffect(() => {
    setMounted(true);
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

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

        // Create multiple arcs for a more dynamic effect
        const newArcs = [];
        for (let i = 0; i < 3; i++) {
          newArcs.push({
            startLat: creatorLocation.lat,
            startLng: creatorLocation.lng,
            endLat: userLocation.lat,
            endLng: userLocation.lng,
            color: "#3b82f6", // Blue color for arcs
          });
        }
        setArcs(newArcs);
        setIsLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        // Use a default location if geolocation fails
        const defaultLocation = {
          lat: 40.7128,
          lng: -74.006,
        };

        // Set locations with default
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

        // Create multiple arcs for default location
        const newArcs = [];
        for (let i = 0; i < 3; i++) {
          newArcs.push({
            startLat: creatorLocation.lat,
            startLng: creatorLocation.lng,
            endLat: defaultLocation.lat,
            endLng: defaultLocation.lng,
            color: "#3b82f6", // Blue color for arcs
          });
        }
        setArcs(newArcs);
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
          <p className="text-gray-600 text-center dark:text-gray-300 font-medium">
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
          width={400}
          height={400}
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
          arcAltitude={0.3}
          arcAltitudeAutoScale={0.5}
          arcStroke={0.4}
          arcCurveResolution={64}
          arcCircularResolution={6}
          arcsTransitionDuration={1000}
          arcDashLength={0.2}
          arcDashGap={0.4}
          arcDashAnimateTime={2000}
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
          polygonsTransitionDuration={300}
          backgroundColor="rgba(0,0,0,0)"
        />
      </motion.div>
    </div>
  );
};

export default GlobeComponent;
