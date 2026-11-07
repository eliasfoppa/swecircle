import { useParams } from "react-router-dom";

const instagram = {
  uppsala: { url: "https://instagram.com/swecircle", handle: "@swecircle" },
  lund: { url: "https://instagram.com/swecirclelund", handle: "@swecirclelund" },
};

/** City-specific details for the current route. Falls back to Uppsala outside a city route, e.g. on the 404 page. */
export function useCity() {
  const { location } = useParams();
  const slug = location?.toLowerCase() === "lund" ? "lund" : "uppsala";

  return {
    slug,
    hasCity: Boolean(location),
    isLund: slug === "lund",
    label: slug === "lund" ? "Lund" : "Uppsala",
    instagramUrl: instagram[slug].url,
    instagramHandle: instagram[slug].handle,
  };
}
