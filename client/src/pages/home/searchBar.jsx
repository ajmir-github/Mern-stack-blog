import {
  Collapse,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { postAction } from "../../state";
import SearchIcon from "@mui/icons-material/Search";
import FilterIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [filterBar, setFilterBar] = useState(false);
  const toggleFilterBar = () => setFilterBar(!filterBar);
  const [value, onChange] = useDebounce((search) => {
    dispatch({
      type: !search ? postAction.clearParams : postAction.setParams,
      payload: { search },
    });
  });
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Grid container alignItems="center">
        <Grid item sx={{ flexGrow: 1 }}>
          <TextField
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
            autoComplete={false}
          />
        </Grid>
        <Grid item>
          <IconButton size="large" sx={{ ml: 2 }} onClick={toggleFilterBar}>
            <FilterIcon size="large" />
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={filterBar} timeout="auto" unmountOnExit>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Collapse>
        </Grid>
      </Grid>
    </Container>
  );
}
