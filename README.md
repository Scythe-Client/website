# Scythe Client Website

This repository contains the website for Scythe Client. This repo is **closed source**. The below information is for the developers only.
⚠️ **Closed Source:** This repository is private to the Scythe Client Team. Do not share externally.

---

## Build 

- **NodeJS:** 22+
- **Development:** `npm run dev`
- **Build:** `npm run build` or `next build`
- **Start:** `npm start`

---

## Project Directory Overview

The `/app` directory has all the main code like the pages and layouts, and the api endpoints.
The `/components` directory has all the UI components from shadcn/ui library, and is used in the project.
The `/lib` directory has the essential functions for the API to function properly such as Inngest and MongoDB connections.
The `/public` directory has the static assets used in the website, such as logo, background images, etc.

### API Endpoints

 - `/api/ping` health checks the API. Returns 'Pong!'
 - `/api/books` is temporary endpoint and will be deleted after the first production release to the public.
 - `/api/inngest` is the endpoint for Inngest background functions for Clerk Auth to push changes to MongoDB.
 - `/api/dev` contains dev-related endpoints and should not be exposed to public.