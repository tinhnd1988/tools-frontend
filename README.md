# Utility Tools – Frontend (React + Vite)

Modern React app using Context API and TailwindCSS v4.

## Requirements

- Node 20+
- Yarn 4 (Corepack)

## Setup

```bash
corepack enable
cd frontend
yarn install
```

Create `.env` (already added by tooling):

```
VITE_API_BASE_URL=http://mmo-tools-backend.test/api
VITE_DEFAULT_LANG=vi
VITE_SOCIAL_FACEBOOK=https://facebook.com
VITE_SOCIAL_ZALO=https://zalo.me
VITE_SOCIAL_TELEGRAM=https://t.me
```

## Run

```bash
yarn dev
```

## Build

```bash
yarn build
yarn preview
```

## Tech

- React 19, Vite, TailwindCSS v4
- i18next (vi default, en), axios, react-router-dom
- chart.js for analytics

## Structure

- `src/contexts` – `ApiContext`, `ThemeContext`
- `src/components` – `Layout`, `Sidebar`
- `src/pages` – tools screens (QR, VietQR, Links, Notes, WHOIS, IP, DNS, HTTP, Crypto, Data, Cron, UUID, 2FA, UA, Proxy)

## Configure

- API base URL and socials via `.env` (variables start with `VITE_`).
