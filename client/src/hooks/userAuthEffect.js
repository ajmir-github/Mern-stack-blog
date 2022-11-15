import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useAuthEffect(cb) {
  const signed = useSelector((s) => s.auth.signed);
  useEffect(() => {
    // protext the route
    cb(signed);
  }, [signed]);
}
