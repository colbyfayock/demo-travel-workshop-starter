# Demo Travel Workshop Starter

A Next.js travel guide with destination pages, Cloudinary-hosted images and videos, packing lists, and a photo-upload flow for traveler images.

## Use this template

```bash

```

## Local setup

Install dependencies with npm, then set up Cloudinary credentials in `.env.local`:

```bash
npm install
```

```dotenv
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Cloudinary cloud name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<Cloudinary API key>
CLOUDINARY_API_SECRET=<Cloudinary API secret>
```

Upload the sample destination images and videos to Cloudinary, then start the development server:

```bash
node scripts/setup.js
npm run dev
```
