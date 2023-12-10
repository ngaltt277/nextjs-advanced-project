const withNextIntl = require("next-intl/plugin")("./i18n/index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLERK_ORGANIZATION_ID: JSON.stringify(process.env.CLERK_ORGANIZATION_ID),
  },
};

module.exports = withNextIntl(nextConfig);
