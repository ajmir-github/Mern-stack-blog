import { Container, Grid, InputAdornment, TextField } from "@mui/material";
import useDebounce from "../hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";

export default function UserSearchBar({ params, setParams }) {
  // remove the empty properties
  const setProperParams = (obj) =>
    setParams(
      Object.fromEntries(Object.entries(obj).filter(([key, value]) => value))
    );
  const [value, onChange] = useDebounce((search) => {
    setProperParams({
      ...params,
      search,
    });
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      <Grid container alignItems="center" rowSpacing={2} columnSpacing={1}>
        <Grid item xs={12}>
          <TextField
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            label="Search"
            value={value}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
