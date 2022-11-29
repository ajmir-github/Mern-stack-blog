import { useEffect, useState } from "react";

export function useWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const onResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return width;
}
