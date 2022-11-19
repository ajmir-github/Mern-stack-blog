import { useEffect, useRef, useState } from "react";

export default function useDebounce(cb, delay = 1000) {
  const [value, setValue] = useState("");
  const [bounce, setBounce] = useState("");
  const initalRender = useRef(null);
  // delay
  useEffect(() => {
    const timeout = setTimeout(() => setBounce(value), delay);
    return () => clearTimeout(timeout);
  }, [value]);
  // Effect
  useEffect(() => {
    if (!!bounce) initalRender.current = true;
    if (initalRender.current) cb(bounce);
  }, [bounce]);
  //
  function onChange(e) {
    setValue(e.target.value);
  }
  return [value, onChange];
}
