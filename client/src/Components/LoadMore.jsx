import { CircularProgress, Grid, useScrollTrigger } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

export default function LoadMore({ onScroll }) {
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const elementRef = useCallback(
    (element) => {
      if (loading) return;
      if (observer.current) observer.current.disconnet();
      observer.current = new IntersectionObserver((entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) onScroll();
        })
      );
      if (element) observer.current.observe(element);
    },
    [loading]
  );
  return (
    <Grid ref={elementRef} container justifyContent="center" sx={{ my: 5 }}>
      <CircularProgress />
    </Grid>
  );
}
