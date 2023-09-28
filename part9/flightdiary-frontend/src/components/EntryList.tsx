import { NonSensitiveDiaryEntry } from "../types";

import { Typography, Box } from "@mui/material";

interface EntryListProps {
  entries: NonSensitiveDiaryEntry[];
}

const EntryList = (props: EntryListProps) => {
  return (
    <div style={{ marginBottom: "2em" }}>
      <Typography
        variant="h5"
        style={{ marginTop: "0.5em", color: "dodgerblue" }}
      >
        Diary Entries
      </Typography>
      {props.entries.map((entry, index) => (
        <div key={index}>
          <Typography
            variant="h6"
            style={{ marginTop: "0.5em", color: "dodgerblue" }}
          >
            {entry.date}
          </Typography>
          <Box component="span" fontFamily="Roboto, sans-serif">
            visibility: {entry.visibility} <br />
            weather: {entry.weather}
          </Box>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
