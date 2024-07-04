import { useRef, useEffect } from "react";

const useOnOutsideClick = <T extends HTMLElement>(handleOutsideClick: () => void) => {
  const innerBorderRef = useRef<T | null>(null);

  const onClick = (event: MouseEvent) => {
    if (innerBorderRef.current && !innerBorderRef.current.contains(event.target as Node)) {
      handleOutsideClick();
    }
  };

  useMountEffect(() => {
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
    };
  });

  return { innerBorderRef };
};

const useMountEffect = (effect: () => void | (() => void)) => useEffect(effect, []);

export default useOnOutsideClick;
