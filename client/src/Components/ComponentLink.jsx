import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ComponentLink({ href, children }) {
    const navigate = useNavigate();
    return (
      <Box sx={{ cursor: "pointer" }} onClick={() => navigate(href)}>
        {children}
      </Box>
    );
  }