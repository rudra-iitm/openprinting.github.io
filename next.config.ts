// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Existing configurations you need to keep
  output: "export",
  images: { 
    unoptimized: true 
  },
  
  // FIX: Webpack configuration for file system polling in VirtualBox
  // This enables Fast Refresh to work reliably when editing files inside the VM.
  webpack: (config, { isServer }) => {
    // We only need this polling mechanism during local development (not when building the server code)
    if (!isServer) {
        config.watchOptions = {
            poll: 1000, // Check for changes every 1000ms (1 second)
            aggregateTimeout: 300, // Wait 300ms after a change is detected before rebuilding
        };
    }
    return config;
  },
};

export default nextConfig;