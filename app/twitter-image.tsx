// Twitter/X (and any crawler that specifically looks for twitter:image
// rather than falling back to og:image) gets its own explicit route here,
// reusing the exact same branded card so both tags always agree.
export { default, alt, size, contentType } from "./opengraph-image";
