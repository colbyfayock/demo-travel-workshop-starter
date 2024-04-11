# Travel Website Starter

## Getting Started

1. Create a new project

To create our new project, we can either manually clone this repository or run the following command to automatically clone the
repository and install all of the dependencies.

```
npx create-next-app@latest my-travel-ai -e https://github.com/colbyfayock/demo-travel-workshop-starter
```

> Note: If you're manually cloning the project, be sure to run `npm install` after navigating to the project!

2. Configure your Cloudinary account

In order to use Cloudinary, we need to configure our account credentials as environment variables, so the project knows where
to find them.

You can rename `.env.example` to `.env.local` or create a new `.env.local` file and add the following:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"
```

These values should be from your personal Cloudinary account which you can find in your Cloudinary Dashboard.

3. Run the setup script

This project assumes that some images and videos exist with specific names. Rather than manually uploading these file by file,
we'll run the setup script that will automatically upload them all for you.

From the root of your project run the following to add the project images and videos to your Cloudinary account:

```
node scripts/setup.js
```

4. Start your development server:

```
npm run dev
```

And the project will be available at http://localhost:3000!
