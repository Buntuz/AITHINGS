/** @type {import('next').NextConfig} */

const BASE_URL = "";
const basePath = process.env.NODE_ENV === 'production' ? `${BASE_URL}` : '';

const nextConfig = {
    //output: 'export',
    basePath
};

export default nextConfig;
