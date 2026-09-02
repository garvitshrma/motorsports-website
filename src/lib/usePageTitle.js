import { useEffect } from 'react'

/** Keeps the document title in step with the routed page. */
export function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}
