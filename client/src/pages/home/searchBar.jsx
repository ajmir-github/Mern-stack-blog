import {
  Collapse,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { postAction } from "../../state";
import SearchIcon from "@mui/icons-material/Search";
import FilterIcon from "@mui/icons-material/FilterList";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function SearchBar() {
  const [value, onChange] = useDebounce((search) => {
    dispatch({
      type: postAction.setParams,
      payload: { search },
    });
  });
  const dispatch = useDispatch();
  const sortOptions = [
    { label: "Recently posted", params: { sort: "date" } },
    { label: "Most viewed", params: { sort: "views" } },
  ];
  const [topicOptions, setTopicOptions] = useState([
    "Any",
    "Computer",
    "Health",
    "Entertainment",
  ]);

  const [sort, setSort] = useState(0);
  const [topic, setTopic] = useState(0);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    dispatch({
      type: postAction.setParams,
      payload: sortOptions[value].params,
    });
  };
  const handleTopicChange = (e) => {
    const value = e.target.value;
    setTopic(value);
    dispatch({
      type: postAction.setParams,
      payload: {
        keyword: value === 0 ? null : topicOptions[value],
      },
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={8}>
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
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="input-label-sort">Sort</InputLabel>
            <Select
              labelId="input-label-sort"
              id="input-label-sort"
              value={sort}
              label="Sort"
              onChange={handleSortChange}
            >
              {sortOptions.map(({ label }, index) => (
                <MenuItem key={index} value={index}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="input-label-Topic">Topic</InputLabel>
            <Select
              labelId="input-label-Topic"
              id="input-label-Topic"
              value={topic}
              label="Topic"
              onChange={handleTopicChange}
            >
              {topicOptions.map((label, index) => (
                <MenuItem key={index} value={index}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}
