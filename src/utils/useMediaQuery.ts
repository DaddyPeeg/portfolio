import { useEffect, useState } from "react";

function useMediaQuery(
  query: string,
  defaultMatches = window.matchMedia(query)
) {
  const [matches, setMatches] = useState(defaultMatches.matches);
  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);

    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query, matches]);
  return matches;
}

export default useMediaQuery;
