"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const GlobeComponentWithNoSSR = dynamic(() => import("./GlobeComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center rounded-full">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4  border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-center dark:text-gray-300">
          Loading globe...
        </p>
      </div>
    </div>
  ),
});

const MapWithDistance = () => {
  const [isClient, setIsClient] = useState(false);
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsClient(true);
    // Add a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsGlobeReady(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mx-auto overflow-hidden"
    >
      {isClient && isGlobeReady ? (
        <GlobeComponentWithNoSSR />
      ) : (
        <div className="w-full h-[500px] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-center dark:text-gray-300 font-medium">
              Loading globe...
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MapWithDistance;
