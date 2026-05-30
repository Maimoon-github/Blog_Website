// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This enables static export
  // Optional: Add a trailing slash to all paths (e.g., /about/ instead of /about)
  // trailingSlash: true,
  // Optional: Change the output directory name from the default 'out'
  // distDir: 'dist',
};

module.exports = nextConfig;