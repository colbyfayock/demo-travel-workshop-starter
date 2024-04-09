# Travel Website Starter

## Getting Started

* Create a new project by running the following in your terminal:

```
npx create-next-app@latest -e https://github.com/colbyfayock/demo-travel-workshop-starter my-travel-ai
```

* Configure your Cloudinary account credentials in a `.env.local` file:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"
```

* Run the following setup script from the root of your project to add project images and videos to your account:

```
node scripts/setup.js
```

* Start your development server:

```
npm run dev
```

And the project will be available at http://localhost:3000!