/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "instagram.farn1-2.fna.fbcdn.net*"
            }
        ]
    }
};

export default nextConfig;
