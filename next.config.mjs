/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: "https",
                hostname: "ichef.bbci.co.uk",
                port: "",
                pathname: "/**",
            }
        ],
        remotePatterns:[
            {
                protocol: "https",
                hostname: "img-s-msn-com.akamaized.net",
                port: "",
                pathname: "/**",
            }
        ]
    }
    
};

export default nextConfig;
