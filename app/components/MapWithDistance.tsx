"use client";

import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import L from "leaflet";

// Marker images for shadow rendering
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default icon issue
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src || markerIcon,
    iconRetinaUrl: markerIcon2x.src || markerIcon2x,
    shadowUrl: markerShadow.src || markerShadow,
  });
}

// Component for fitting map to markers
function MapBoundsController({ userPosition, creatorPosition }: any) {
  const map = useMap();

  useEffect(() => {
    if (userPosition && creatorPosition) {
      // Fit bounds to show both markers with padding
      map.fitBounds(
        [
          [userPosition[0], userPosition[1]],
          [creatorPosition[0], creatorPosition[1]],
        ],
        {
          padding: [40, 40],
          animate: true,
          duration: 1,
          maxZoom: 6, // Prevent zooming in too much
        }
      );
    }
  }, [map, userPosition, creatorPosition]);

  return null;
}

// Custom popup content component
const CustomPopup = ({
  name,
  location = null,
}: {
  name: string;
  location?: string | null;
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <strong style={{ fontSize: "16px" }}>{name}</strong>
      {location && (
        <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>{location}</p>
      )}
    </div>
  );
};

const MapWithDistance = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const [distance, setDistance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  // Toronto coordinates
  const creatorLat = 14.4426;
  const creatorLon = 79.9865;
  const creatorPosition: [number, number] = [creatorLat, creatorLon];

  // Create custom icons (only when in browser)
  const greenIcon =
    typeof window !== "undefined"
      ? new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
          shadowUrl: markerShadow.src || markerShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      : null;

  const redIcon =
    typeof window !== "undefined"
      ? new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          shadowUrl: markerShadow.src || markerShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      : null;

  // Calculate distance between two coordinates using Haversine formula
  const haversineDistance = (
    [lat1, lon1]: [number, number],
    [lat2, lon2]: [number, number]
  ): number => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Add custom CSS for popups and map
  useEffect(() => {
    if (typeof window === "undefined") return;

    const style = document.createElement("style");
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
      .leaflet-popup-tip {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .dark .leaflet-popup-content-wrapper,
      .dark .leaflet-popup-tip {
        background: rgba(39, 39, 42, 0.95);
        color: #e4e4e7;
        border-color: rgba(59, 130, 246, 0.4);
      }
      .leaflet-container {
        font-family: inherit;
        background-color: rgba(210, 232, 252, 0.2) !important;
      }
      
      /* Hide Leaflet controls */
      .leaflet-control-zoom {
        display: none !important;
      }
      .leaflet-control-attribution {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Get user's location
  useEffect(() => {
    if (typeof window === "undefined") return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;
        const userPos: [number, number] = [userLat, userLon];

        setUserPosition(userPos);
        setIsLoading(false);

        // Calculate distance
        const dist = haversineDistance(creatorPosition, userPos);
        setDistance(parseFloat(dist.toFixed(2)));
      },
      (err) => {
        console.error("Geolocation error:", err);

        // Use a default position if geolocation fails (New York)
        const defaultPos: [number, number] = [40.7128, -74.006];
        setUserPosition(defaultPos);
        setIsLoading(false);

        // Calculate distance to default location
        const dist = haversineDistance(creatorPosition, defaultPos);
        setDistance(parseFloat(dist.toFixed(2)));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mx-auto bg-white/95 dark:bg-zinc-800/95 rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-100 dark:border-blue-900"
    >
      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium text-center">
        Interactive Location Map
      </div>

      <div className="w-full h-96 relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 dark:bg-zinc-900/80">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Locating you on the map...
              </p>
            </div>
          </div>
        )}

        {/* Map instance */}
        <MapContainer
          center={creatorPosition}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          scrollWheelZoom={true}
          dragging={true}
          doubleClickZoom={true}
          attributionControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Creator marker */}
          {greenIcon && (
            <Marker position={creatorPosition} icon={greenIcon}>
              <Popup closeButton={false} autoClose={false} closeOnClick={false}>
                <CustomPopup name="👨‍💻 Shyam" location="Toronto, Canada" />
              </Popup>
            </Marker>
          )}

          {/* User marker */}
          {userPosition && redIcon && (
            <>
              <Marker position={userPosition} icon={redIcon}>
                <Popup closeButton={false}>
                  <CustomPopup name="📍 You are here" />
                </Popup>
              </Marker>

              {/* Connection line between points */}
              <Polyline
                positions={[creatorPosition, userPosition]}
                pathOptions={{
                  color: "#3b82f6",
                  weight: 3,
                  opacity: 0.8,
                  dashArray: "5, 8",
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />

              {/* Controller to fit map bounds to show both markers */}
              <MapBoundsController
                userPosition={userPosition}
                creatorPosition={creatorPosition}
              />
            </>
          )}
        </MapContainer>
      </div>

      {distance !== null && (
        <div className="p-6 bg-white dark:bg-zinc-800 text-center space-y-3">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
            <span className="mr-2">🌍</span>
            <span className="text-white font-medium">
              {distance} km between us
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100">
            We're <span className="text-cyan-500">{distance} km</span> apart!
          </h2>

          <p className="text-gray-600 dark:text-zinc-400 text-sm max-w-md mx-auto">
            I'm based in{" "}
            <strong className="text-blue-500">Toronto, Canada</strong>,
            approximately{" "}
            <span className="font-medium">{distance} kilometers</span> from your
            current location.
            {distance > 5000 && " That's quite a journey!"}
            {distance > 10000 &&
              " We're almost on opposite sides of the globe!"}
            {distance < 100 && " Wow, we're practically neighbors!"}
          </p>

          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Distance calculated using the Haversine formula
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MapWithDistance;
