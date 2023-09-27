import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { EntryFormValues, EntryType } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface EntryOption {
  value: EntryType;
  label: string;
}

const entryOptions: EntryOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

/*
interface HealthCheckRatingOption{
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating).map(v => ({
  value: v, label: v.toString()
}));


const entryOptions: EntryOption[] = Object.keys(EntryType).map((key) => ({
  value: key as EntryType,
  label: EntryType[key as keyof typeof EntryType] as string
}));
*/

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(""); // useState(HealthCheckRating.LowRisk)

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entry = Object.values(EntryType).find(
        (g) => g.toString() === value,
      );
      if (entry) {
        setEntryType(entry as EntryType);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (entryType) {
      case EntryType.Hospital:
        onSubmit({
          description,
          date,
          specialist,
          type: EntryType.Hospital,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case EntryType.OccupationalHealthcare:
        const newOccupationalHealthcareEntry: EntryFormValues = {
          description,
          date,
          specialist,
          type: EntryType.OccupationalHealthcare,
          employerName,
        };
        sickLeaveEndDate && sickLeaveEndDate
          ? onSubmit({
              ...newOccupationalHealthcareEntry,
              sickLeave: {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              },
            })
          : onSubmit({
              ...newOccupationalHealthcareEntry,
            });
        break;
      case EntryType.HealthCheck:
        onSubmit({
          description,
          date,
          specialist,
          type: EntryType.HealthCheck,
          healthCheckRating: 2,
        });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select
          label="Entry Type"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
        >
          {entryOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        {entryType === EntryType.Hospital ? (
          <>
            <TextField
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        ) : (
          <></>
        )}
        {entryType === EntryType.OccupationalHealthcare ? (
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
        ) : (
          <></>
        )}
        {entryType === EntryType.OccupationalHealthcare ? (
          <>
            <TextField
              label="SickLeave Starting Date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="SickLeave Ending Date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        ) : (
          <></>
        )}
        {entryType === EntryType.HealthCheck ? (
          <TextField
            label="HealthCheckRating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        ) : (
          <></>
        )}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;

/*
<Select
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={onEntryTypeChange}
        >
        {healthCheckRatingOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
        
*/
