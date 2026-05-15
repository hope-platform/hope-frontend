import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// Tell TypeScript about the precache manifest that Serwist injects at build time.
// `self.__SW_MANIFEST` is the list of files to cache for offline use.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// Inside a service worker, `self` is the global scope (not `window`).
declare const self: ServiceWorkerGlobalScope;

// Create the Serwist instance that powers Hope's offline support.
const serwist = new Serwist({
  // The files Next.js told us to precache (Help Now strategies, Quick Guides, etc.)
  precacheEntries: self.__SW_MANIFEST,
  // Activate a new service worker immediately instead of waiting for all tabs to close
  skipWaiting: true,
  // Take control of open pages as soon as the worker activates
  clientsClaim: true,
  // Speed up navigations by letting the browser preload while the worker boots
  navigationPreload: true,
  // Sensible default caching rules for fonts, images, API calls, etc.
  runtimeCaching: defaultCache,
});

// Wire up the install/activate/fetch event listeners.
serwist.addEventListeners();
