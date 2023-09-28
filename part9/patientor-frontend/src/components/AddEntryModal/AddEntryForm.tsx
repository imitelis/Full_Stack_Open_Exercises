import { useState, useEffect, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
  OutlinedInput,
  Chip,
} from "@mui/material";

import {
  Diagnosis,
  EntryType,
  HealthCheckRating,
  EntryOption,
  HealthCheckRatingOption,
  EntryFormValues,
} from "../../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const entryOptions: EntryOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating,
).map((v) => ({
  value: v as HealthCheckRating,
  label: v.toString(),
}));

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState(EntryType.Hospital);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisOptions, setDiagnosisOptions] = useState<Diagnosis["code"][]>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.LowRisk,
  );

  useEffect(() => {
    const fetchDiagnosesOptions = async () => {
      const diagnosisOptions = diagnoses.map(
        (v) => v.code,
      ) as Diagnosis["code"][];
      // console.log(diagnosisOptions);
      setDiagnosisOptions(diagnosisOptions);
    };
    void fetchDiagnosesOptions();
    // console.log(diagnosisCodes);
  }, [diagnoses, diagnosisCodes]);

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

  const onDiagnosisChange = (event: SelectChangeEvent<Diagnosis["code"][]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRating).find(
        (g) => g.toString() === value,
      );
      if (healthCheckRating) {
        setHealthCheckRating(healthCheckRating as HealthCheckRating);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (entryType) {
      case EntryType.Hospital:
        const newHospitalEntry: EntryFormValues = {
          description,
          date,
          specialist,
          type: EntryType.Hospital,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          diagnosisCodes,
        };
        diagnosisCodes.length === 0
          ? onSubmit({
              ...newHospitalEntry,
            })
          : onSubmit({
              ...newHospitalEntry,
              diagnosisCodes,
            });
        break;
      case EntryType.OccupationalHealthcare:
        let sickLeave = null;
        sickLeaveEndDate && sickLeaveEndDate
          ? (sickLeave = {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            })
          : (sickLeave = null);
        const newOccupationalHealthcareEntry: EntryFormValues = {
          description,
          date,
          specialist,
          type: EntryType.OccupationalHealthcare,
          employerName,
        };
        diagnosisCodes.length === 0
          ? sickLeave
            ? onSubmit({
                ...newOccupationalHealthcareEntry,
                sickLeave,
              })
            : onSubmit({
                ...newOccupationalHealthcareEntry,
              })
          : sickLeave
          ? onSubmit({
              ...newOccupationalHealthcareEntry,
              diagnosisCodes,
              sickLeave,
            })
          : onSubmit({
              ...newOccupationalHealthcareEntry,
              diagnosisCodes,
            });
        break;
      case EntryType.HealthCheck:
        const newHealthCheck: EntryFormValues = {
          description,
          date,
          specialist,
          type: EntryType.HealthCheck,
          healthCheckRating,
        };
        diagnosisCodes.length === 0
          ? onSubmit({
              ...newHealthCheck,
            })
          : onSubmit({
              ...newHealthCheck,
              diagnosisCodes,
            });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Entry Type</InputLabel>
        <Select
          label="Entry Type"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
          style={{ marginBottom: "12px" }}
        >
          {entryOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <InputLabel shrink>Date</InputLabel>
        <TextField
          type="date"
          label={null}
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={{ marginBottom: "12px" }}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginBottom: "12px" }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginBottom: "12px" }}
        />
        <InputLabel shrink>Diagnosis Codes</InputLabel>
        <Select
          label="Diagnosis Codes"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisChange}
          input={<OutlinedInput label="Code" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          style={{ marginBottom: "12px" }}
        >
          {diagnosisOptions.map((diagnosisCode) => (
            <MenuItem key={diagnosisCode} value={diagnosisCode}>
              {diagnosisCode}
            </MenuItem>
          ))}
        </Select>
        {entryType === EntryType.Hospital ? (
          <>
            <InputLabel shrink>Discharge Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              style={{ marginBottom: "12px" }}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              style={{ marginBottom: "24px" }}
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
            style={{ marginBottom: "12px" }}
          />
        ) : (
          <></>
        )}
        {entryType === EntryType.OccupationalHealthcare ? (
          <>
            <Grid container spacing={2} style={{ marginBottom: "24px" }}>
              <Grid item xs={6}>
                <InputLabel shrink>SickLeave Start Date</InputLabel>
                <TextField
                  type="date"
                  label={null}
                  fullWidth
                  value={sickLeaveStartDate}
                  onChange={({ target }) => setSickLeaveStartDate(target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel shrink>SickLeave End Date</InputLabel>
                <TextField
                  type="date"
                  label={null}
                  fullWidth
                  value={sickLeaveEndDate}
                  onChange={({ target }) => setSickLeaveEndDate(target.value)}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
        {entryType === EntryType.HealthCheck ? (
          <>
            <InputLabel shrink>HealthCheck Rating</InputLabel>
            <Select
              label="Entry Type"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
              style={{ marginBottom: "24px" }}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
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
