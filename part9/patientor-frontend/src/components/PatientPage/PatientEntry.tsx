import { useState, useEffect } from "react";

import { Entry, Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";

import { Box } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import NextWeekIcon from "@mui/icons-material/NextWeek";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  entry: Entry;
}

const PatientEntry = ({ entry }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      if (diagnoses) {
        setDiagnoses(diagnoses);
      }
    };
    void fetchDiagnoses();
  }, []);

  function findDiagnosisName(diagnosisCode: string): string | null {
    const matchingDiagnosis =
      diagnoses.find((diagnosis) => diagnosis.code === diagnosisCode) ?? null;
    if (matchingDiagnosis) {
      return matchingDiagnosis.name;
    }
    return null;
  }

  let content: JSX.Element | null = null;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  switch (entry.type) {
    case "Hospital":
      content = (
        <Box
          border={2}
          borderColor="red"
          style={{ borderRadius: "5px", padding: "10px" }}
        >
          <span style={{ color: "red", fontSize: "22px" }}>
            Hospital <MedicalServicesIcon />
          </span>
          <br />
          <span style={{ color: "red" }}>
            <FavoriteIcon /> date:{" "}
          </span>
          {entry.date}
          <br />
          <span style={{ color: "red" }}>description: </span>
          <em>{entry.description}</em>
          <br />
          diagnosis:{" "}
          {entry.diagnosisCodes === undefined ? (
            <>None</>
          ) : (
            entry.diagnosisCodes?.map((diagnosisCode) => (
              <>
                {diagnosisCode}: {findDiagnosisName(diagnosisCode)}.{" "}
              </>
            ))
          )}
          <br />
          discharge date: {entry.discharge.date}
          <br />
          discharge criteria: {entry.discharge.criteria}
          <br />
          diagnose by <span style={{ color: "red" }}>{entry.specialist}</span>
        </Box>
      );
      break;
    case "OccupationalHealthcare":
      content = (
        <Box
          border={2}
          borderColor="dodgerblue"
          style={{ borderRadius: "5px", padding: "10px" }}
        >
          <span style={{ color: "dodgerblue", fontSize: "22px" }}>
            Occupational Healthcare <NextWeekIcon />
          </span>
          <br />
          <span style={{ color: "dodgerblue" }}>
            <FavoriteIcon /> date:{" "}
          </span>
          {entry.date}
          <br />
          <span style={{ color: "dodgerblue" }}>description: </span>
          <em>{entry.description}</em>
          <br />
          diagnosis:{" "}
          {entry.diagnosisCodes === undefined ? (
            <>None</>
          ) : (
            entry.diagnosisCodes?.map((diagnosisCode) => (
              <>
                {diagnosisCode}: {findDiagnosisName(diagnosisCode)}.{" "}
              </>
            ))
          )}
          <br />
          employer name: {entry.employerName}
          <br />
          sick leave:{" "}
          {entry.sickLeave ? (
            <>
              {entry.sickLeave?.startDate}-{entry.sickLeave?.endDate}
            </>
          ) : (
            <>
              <em>None</em>
            </>
          )}
          <br />
          diagnose by{" "}
          <span style={{ color: "dodgerblue" }}>{entry.specialist}</span>
        </Box>
      );
      break;
    case "HealthCheck":
      content = (
        <Box
          border={2}
          borderColor="darkorchid"
          style={{ borderRadius: "5px", padding: "10px" }}
        >
          <span style={{ color: "darkorchid", fontSize: "22px" }}>
            Health Check <WorkHistoryIcon />
          </span>
          <br />
          <span style={{ color: "darkorchid" }}>
            <FavoriteIcon /> date:{" "}
          </span>
          {entry.date}
          <br />
          <span style={{ color: "darkorchid" }}>description: </span>
          <em>{entry.description}</em>
          <br />
          diagnosis:{" "}
          {entry.diagnosisCodes === undefined ? (
            <>None</>
          ) : (
            entry.diagnosisCodes?.map((diagnosisCode) => (
              <>
                {diagnosisCode}: {findDiagnosisName(diagnosisCode)}.{" "}
              </>
            ))
          )}
          <br />
          healthcheck rating: {entry.healthCheckRating}
          <br />
          diagnose by{" "}
          <span style={{ color: "darkorchid" }}>{entry.specialist}</span>
        </Box>
      );
      break;
    default:
      assertNever(entry);
      break;
  }

  return <>{content}</>;
};

export default PatientEntry;
