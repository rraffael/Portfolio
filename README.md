# Portfolio Next.js Starter

This is a minimal front-end only Next.js portfolio starter that connects to an external API.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
copy .env.example .env.local
```

3. Edit `.env.local` and set your API URL:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

4. Start the development server:

```bash
npm run dev
```

5. Open the app at `http://localhost:3000`

## How it works

- `pages/index.jsx` loads data from your API using `fetch`.
- Update `pages/index.jsx` to call the exact endpoint you need, for example:

```js
fetch(`${process.env.NEXT_PUBLIC_API_URL}/your-endpoint`)
```

- The API base URL is stored in `NEXT_PUBLIC_API_URL`.
- The `.env.local` file is ignored by Git so your private values stay local.

## CORS and API whitelisting

If your API is whitelisted, make sure it allows requests from the URL where your app is hosted.
For local development, that is usually `http://localhost:3000`.

## Deployment

You can deploy this app to Vercel, Netlify, or any platform that supports Next.js.

### Architecture

- Website (React / Next.js)
- API (hosted online, must allow requests from your domain)
- Database (managed by the API backend)

This gives you a clean front-end app that talks to your cloud API and leaves the database behind the API layer.
