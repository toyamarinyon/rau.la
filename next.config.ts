import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [new URL("https://assets.basehub.com/77f1bec9/**")],
	},
};

export default nextConfig;
