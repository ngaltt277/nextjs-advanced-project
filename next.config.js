const withNextIntl = require("next-intl/plugin")("./i18n/index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);
