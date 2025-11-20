# Nuance

a luxury e-commerce experience built with React and Vite. Minimal, elegant, and thoughtfully designed.

**Live site:** https://nua-nce.vercel.app/
## Quick Start

```bash
npm install
npm run dev
```

runs on `http://localhost:5173` by default.


## Design Decisions

**Luxury-first approach:** Went with a premium aesthetic using glass-morphism, subtle gradients, and refined typography. 

**State management:** Used Zustand for cart state - simple, no boilerplate, and works great with localStorage persistence. The cart syncs automatically across tabs.

**API:** FakeStore API for product data. Wrapped it with a simple client that handles caching and error states. Could swap it out for a real backend without much hassle.

## Trade-offs

**Client-side routing only:** Using React Router for navigation, but no SSR. 

**Local storage for cart:** Persists cart in browser storage. Simple and works offline, but doesn't sync across devices. Would need a backend for that.

**No image optimization:** Product images load directly from the API without a CDN with image transforms.

## Bonus Enhancements

- **Toast notifications** - Custom toast system with context provider, different variants (success, danger, etc.)
- **Download your bill** - After placing order, download your custom bill pdf
- **Skeleton loading states** - Proper loading skeletons for products and product details

- **Responsive design** - Mobile-first, works great on all screen sizes
- **Error boundaries** - Graceful error handling with retry functionality
- **Pagination** - Clean pagination component for product listings
- **Newsletter modal** - First-visit modal with localStorage persistence
- **Search & filters** - Real-time search with category filtering
- **Cart persistence** - Cart survives page refreshes via localStorage

## Tech Stack

React, Vite, React Router, Zustand (state),  Tailwind CSS, Axios (API client)



Built with attention to detail. Enjoy.
