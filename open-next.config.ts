import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // Runs on every OpenNext build (local + Cloudflare) so assets and CSS always refresh.
  buildCommand: "npm run build:cloud",
};
