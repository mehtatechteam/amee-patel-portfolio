/**
 * Fired on `window` once (LoadingScreen.tsx) the moment the loading overlay
 * begins clearing — lets other client components (e.g. the hero's
 * registration-snap entrance) sync their own one-time entrance animation to
 * when it's actually visible, instead of guessing a fixed delay against a
 * preload time that varies by network/device.
 */
export const LOADING_SCREEN_DONE_EVENT = "loadingscreen:done";

declare global {
  interface Window {
    __loadingScreenDone?: boolean;
  }
}
