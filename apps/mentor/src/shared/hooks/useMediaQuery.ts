import { useEffect, useState } from "react"

/**
 * @description 미디어 쿼리 훅
 */
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches)
    useEffect(() => {
        const media = window.matchMedia(query)
        const handler = () => setMatches(media.matches)
        media.addEventListener("change", handler)
        return () => media.removeEventListener("change", handler)
    }, [query])

    return matches
}

export default useMediaQuery;