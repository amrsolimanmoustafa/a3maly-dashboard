module.exports = {
  reactStrictMode: true,
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname],
  },
};