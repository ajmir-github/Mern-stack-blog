import { Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function GoBack() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Box
      role="presentation"
      sx={{
        position: "fixed",
        bottom: 16,
        left: 16,
      }}
    >
      <Fab color="primary" aria-label="add" onClick={goBack}>
        <NavigateBeforeIcon />
      </Fab>
    </Box>
  );
}
