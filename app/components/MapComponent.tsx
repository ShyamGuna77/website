/* eslint-disable @typescript-eslint/no-explicit-any */

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
import L from "leaflet";

// Marker images for shadow rendering
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src || markerIcon,
  iconRetinaUrl: markerIcon2x.src || markerIcon2x,
  shadowUrl: markerShadow.src || markerShadow,
});

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
          maxZoom: 6,
        }
      );
    }
  }, [map, userPosition, creatorPosition]);

  return null;
}

// Animated polyline component
function AnimatedPolyline({
  positions,
  color,
}: {
  positions: [number, number][];
  color: string;
}) {
  const [dashOffset, setDashOffset] = useState(0);
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    let animationFrame: number;
    let offset = 0;

    const animate = () => {
      offset = (offset - 1) % 30;
      setDashOffset(offset);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <Polyline
      ref={polylineRef}
      positions={positions}
      pathOptions={{
        color: color,
        weight: 3,
        opacity: 0.9,
        dashArray: "5, 8",
        dashOffset: dashOffset.toString(),
        lineCap: "round",
        lineJoin: "round",
      }}
    />
  );
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

const MapComponent = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const [distance, setDistance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<L.Map | null>(null);

  // Toronto coordinates
  const creatorLat = 14.4426;
  const creatorLon = 79.9865;
  const creatorPosition: [number, number] = [creatorLat, creatorLon];

  // Create custom icons
  const greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: markerShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: markerShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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
        background-color: #1a1a2e !important;
        border: 3px solid #3b82f6;
        border-radius: 50%;
        aspect-ratio: 1;
        max-width: 400px;
        margin: 0 auto;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
      }
      
      .leaflet-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
        pointer-events: none;
        z-index: 1000;
      }

      .leaflet-tile-pane {
        filter: brightness(0.6) contrast(1.2) saturate(1.2);
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

  // Initialize map when component mounts
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  // Add resize observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    });

    const mapContainer = document.querySelector(".leaflet-container");
    if (mapContainer) {
      resizeObserver.observe(mapContainer);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Get user's location
  useEffect(() => {
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
    <>
      <div className="w-full h-[400px] relative p-4">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
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
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Creator marker */}
          <Marker position={creatorPosition} icon={greenIcon}>
            <Popup closeButton={false} autoClose={false} closeOnClick={false}>
              <CustomPopup name="👨‍💻 Shyam" location="India" />
            </Popup>
          </Marker>

          {/* User marker */}
          {userPosition && (
            <>
              <Marker position={userPosition} icon={redIcon}>
                <Popup closeButton={false}>
                  <CustomPopup name=" You " />
                </Popup>
              </Marker>

              <AnimatedPolyline
                positions={[creatorPosition, userPosition]}
                color="#3b82f6"
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

          <p className="text-gray-600 dark:text-zinc-400 text-sm max-w-md mx-auto">
            I&apos;m based in{" "}
            <strong className="text-blue-500">Andhra, India</strong>,
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
    </>
  );
};

export default MapComponent;
