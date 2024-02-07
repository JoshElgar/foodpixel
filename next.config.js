/** @type {import('next').NextConfig} */
// next.config.js in the new project
const assetPrefix = process.env.ASSET_PREFIX || "";

const nextConfig = {
  assetPrefix,
};

module.exports = nextConfig;
