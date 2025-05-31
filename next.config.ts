import type { NextConfig } from "next";

/*

If you are using the Next.js <Image> component to display images from https://avatars.githubusercontent.com, 
this configuration ensures that the images are allowed and optimized by Next.js.



Without this configuration, Next.js would block the image because it doesn't
allow external image sources by default for security reasons.
*/
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
