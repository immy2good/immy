import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Immy Yousafzai",
    short_name: "yousafz.ai",
    start_url: "/",
    display: "browser",
    background_color: "#08090b",
    theme_color: "#08090b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
