import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (
  targetRef: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  // const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const { current: currentObserver } = observerRef;
    const { current: currentTarget } = targetRef;

    if (currentTarget) {
      currentObserver.observe(currentTarget);
    }

    return () => {
      if (currentObserver && currentTarget) {
        currentObserver.unobserve(currentTarget);
      }
    };
  }, [options, targetRef]);

  return { isIntersecting };
};

export default useIntersectionObserver;
