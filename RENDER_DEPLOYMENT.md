# 🚀 Deploying Invoice Generator Frontend to Render

This guide provides step-by-step instructions on how to deploy your Vite React frontend to **Render**, replacing your Vercel deployment.

---

## 📋 Prerequisites

1. Ensure all your changes, including the new `render.yaml` file, are committed and pushed to your **GitHub** repository (`invoice-frontend`).
2. Log in to your [Render Dashboard](https://dashboard.render.com).

---

## 🛠️ Method 1: Automatic Deployment using Render Blueprint (Recommended)

Render Blueprints let you deploy your infrastructure using the `render.yaml` file in the repository.

1. In the Render Dashboard, click the **"New +"** button in the top right and select **"Blueprint"**.
2. Connect your GitHub repository `invoice-frontend`.
3. Render will automatically detect the `render.yaml` file.
4. Give your Blueprint group a name (e.g., `invoice-generator-group`).
5. Render will list the required environment variables. Provide their values:
   - `VITE_API_BASE_URL`: The URL of your deployed backend API (e.g., `https://invoice-backend.onrender.com/api`).
   - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key (copy from `.env`).
   - `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name.
   - `VITE_CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary upload preset.
6. Click **"Apply"** to deploy! Render will build and deploy the static site.

---

## 🖱️ Method 2: Manual Dashboard Setup (Alternative)

If you prefer to configure the deployment manually step-by-step in the Render UI:

1. In the Render Dashboard, click **"New +"** and select **"Static Site"**.
2. Connect your GitHub repository `invoice-frontend`.
3. Configure the static site settings as follows:
   * **Name:** `invoice-generator-frontend`
   * **Root Directory:** *(leave blank, as it's the root of this repository)*
   * **Build Command:** `npm install && npm run build`
   * **Publish Directory:** `dist`
4. Expand the **Environment** section and add the following environment variables:
   * `VITE_API_BASE_URL` (Your production backend API URL)
   * `VITE_CLERK_PUBLISHABLE_KEY` (Your Clerk publishable key)
   * `VITE_CLOUDINARY_CLOUD_NAME` (Your Cloudinary Cloud Name)
   * `VITE_CLOUDINARY_UPLOAD_PRESET` (Your Cloudinary upload preset)
5. Under the **Redirects/Rewrites** tab in your service's left sidebar, click **"Add Rule"** to ensure Single Page App (SPA) routing works perfectly:
   * **Source Path:** `/*`
   * **Destination Path:** `/index.html`
   * **Action:** `Rewrite`
   * *Click Save Changes.*
6. Click **"Create Static Site"** to trigger the build.

---

## 🔒 Step 3: Update Clerk Authentication Settings (CRITICAL)

Because the frontend has a new domain name on Render (e.g., `https://invoice-generator-frontend.onrender.com`), you **must** update your Clerk setup, otherwise logins will fail.

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com).
2. Select your application.
3. In the left menu, navigate to **Paths** or **Configure > Domains**.
4. In your Application Settings:
   - Add your new Render frontend URL (e.g., `https://your-app-name.onrender.com`) to the **Allowed Origins** list.
   - Update your **Authorized Redirect URLs** to point to the new Render domain.
5. In **Redirect URLs** under Clerk authentication settings:
   - Ensure the new domain is listed so Clerk knows where to send users after they sign in.

---

## 🔌 Step 4: Update Backend CORS Settings

Your Spring Boot backend uses CORS to restrict API calls to trusted origins. When moving from Vercel to Render, the frontend's origin changes, so the backend must be notified.

1. Open your backend service settings on your deployment platform (e.g., Render backend, Heroku, AWS, etc.).
2. Go to **Environment Variables**.
3. Update the `FRONTEND_URL` environment variable:
   * **Name:** `FRONTEND_URL`
   * **Value:** `https://your-new-render-frontend-url.onrender.com` (do not add a trailing slash).
4. Save the environment variables and redeploy/restart the backend service. This will immediately allow CORS requests from your new Render static site!
