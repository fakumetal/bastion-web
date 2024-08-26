import path from "path";
import { config } from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "envs/.env.local");
config({ path: envPath });

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    HOST_URL: process.env.HOST_URL,
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ['lh5.googleusercontent.com','lh3.googleusercontent.com','photos.app.goo.gl'],
  },
};

export default nextConfig;
