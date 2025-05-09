"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Use dynamic import with ssr: false for all Leaflet components
const MapComponentWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading map...</p>
      </div>
    </div>
  ),
});

const MapWithDistance = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsClient(true);
    // Add a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mx-auto bg-white/95 dark:bg-zinc-800/95 rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-100 dark:border-blue-900"
    >
      {isClient && isMapReady ? (
        <MapComponentWithNoSSR />
      ) : (
        <div className="w-full h-80 flex items-center justify-center bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Loading map...
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MapWithDistance;
