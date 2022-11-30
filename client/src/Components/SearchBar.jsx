import {
  Container,
  FormControl,
  Grid,
  InputAdornment,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function SearchBar({ params, setParams }) {
  const [sort, setSort] = useState(0);
  const [topic, setTopic] = useState(0);
  const topicOptions = useSelector((s) => s.post.keywords);
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
  const sortOptions = [
    { label: "Unset", params: { sort: null } },
    { label: "Recently posted", params: { sort: "date" } },
    { label: "Most viewed", params: { sort: "views" } },
  ];

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    setProperParams({
      ...params,
      ...sortOptions[value].params,
    });
  };
  const handleTopicChange = (e) => {
    const value = e.target.value;
    setTopic(value);
    setProperParams({
      ...params,
      keyword: value === 0 ? null : topicOptions[value],
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      <Grid container alignItems="center" rowSpacing={2} columnSpacing={1}>
        <Grid item xs={12} md={8}>
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

        <Grid item xs={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="input-label-sort">Sort</InputLabel>
            <Select
              size="small"
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
              size="small"
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
