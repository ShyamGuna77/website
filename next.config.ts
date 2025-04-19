// next.config.js
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to add it here
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config here
};

module.exports = withMDX(nextConfig);
