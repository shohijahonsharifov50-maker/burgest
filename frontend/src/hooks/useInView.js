import { useEffect, useState } from 'react';

/** True while the element is within `rootMargin` of the viewport. */
export function useInView(ref, { rootMargin = '0px', once = false } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && once) observer.disconnect();
    }, { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
