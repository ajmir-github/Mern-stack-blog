import { TextField } from "@mui/material";
import useDebounce from "../hooks/useDebounce";

export default function NotFound() {
  const [value, onChange] = useDebounce((value) => {
    console.log({ value });
  });
  return (
    <>
      <h1>NotFound page</h1>
      <TextField fullWidth label="Search" value={value} onChange={onChange} />
      <h2>Debounce Test</h2>
    </>
  );
}
