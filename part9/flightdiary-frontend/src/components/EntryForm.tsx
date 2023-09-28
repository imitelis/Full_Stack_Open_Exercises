import { useState, useEffect } from "react";

import { Weather, Visibility, NonSensitiveDiaryEntry } from "../types";

import { createEntry } from "../services/diaryService";

import {
  TextField,
  FormControlLabel,
  Grid,
  Button,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

interface EntryFormProps {
  entries: NonSensitiveDiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  setGreenMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setRedMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(date);
    console.log(weather);
    console.log(visibility);
    console.log(comment);
  }, [date, weather, visibility, comment]);

  const handleWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };

  const handleVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!date && !comment) {
      props.setRedMessage(
        `entry validation failed: date and comment are required`,
      );
      console.log(`entry validation failed: date and comment are required`);
      setTimeout(() => {
        props.setRedMessage(null);
      }, 3000);
    } else if (!date) {
      props.setRedMessage(`entry validation failed: date is are required`);
      setTimeout(() => {
        props.setRedMessage(null);
      }, 3000);
    } else if (!comment) {
      props.setRedMessage(`entry validation failed: comment is are required`);
      setTimeout(() => {
        props.setRedMessage(null);
      }, 3000);
    } else {
      createEntry({
        date: date,
        weather: weather,
        visibility: visibility,
        comment: comment,
      }).then((data) => {
        props.setEntries(props.entries.concat(data));
      });
      props.setGreenMessage(`added new entry in ${date}`);
      setTimeout(() => {
        props.setGreenMessage(null);
      }, 3000);
    }

    setDate("");
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment("");
  };

  return (
    <div style={{ marginBottom: "1em" }}>
      <Typography
        variant="h5"
        style={{ marginTop: "0.5em", color: "dodgerblue" }}
      >
        Add a new
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h6">date:</Typography>
        </Grid>
        <Grid item>
          <TextField
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h6">weather:</Typography>
        </Grid>
        <Grid item>
          <RadioGroup name="weather" value={weather} onChange={handleWeather}>
            <span>
              <FormControlLabel
                value={Weather.Sunny}
                control={<Radio />}
                label="Sunny"
              />
              <FormControlLabel
                value={Weather.Rainy}
                control={<Radio />}
                label="Rainy"
              />
              <FormControlLabel
                value={Weather.Cloudy}
                control={<Radio />}
                label="Cloudy"
              />
              <FormControlLabel
                value={Weather.Stormy}
                control={<Radio />}
                label="Stormy"
              />
              <FormControlLabel
                value={Weather.Windy}
                control={<Radio />}
                label="Windy"
              />
            </span>
          </RadioGroup>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h6">visibility:</Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            name="visibility"
            value={visibility}
            onChange={handleVisibility}
          >
            <span>
              <FormControlLabel
                value={Visibility.Great}
                control={<Radio />}
                label="Great"
              />
              <FormControlLabel
                value={Visibility.Good}
                control={<Radio />}
                label="Good"
              />
              <FormControlLabel
                value={Visibility.Ok}
                control={<Radio />}
                label="Ok"
              />
              <FormControlLabel
                value={Visibility.Poor}
                control={<Radio />}
                label="Poor"
              />
            </span>
          </RadioGroup>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h6" marginBottom="3.5em">
            comment:
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            value={comment}
            fullWidth
            onChange={(event) => setComment(event.target.value)}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={entryCreation}
          >
            add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EntryForm;
