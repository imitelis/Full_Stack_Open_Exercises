import { useState, useEffect } from "react";
import axios from "axios";

import { Patient, Diagnosis, EntryFormValues } from "../../types";
import patientService from "../../services/patients";

import { Box, Typography, Button } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import PatientEntry from "./PatientEntry";
import AddEntryModal from "../AddEntryModal";

interface Props {
  patientId: string | null;
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patientId, diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (patientId) {
      const fetchPatient = async () => {
        const patient = await patientService.getById(patientId);
        if (patient) {
          setPatient(patient);
        }
      };
      void fetchPatient();
    }
  }, [patientId, patient]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patientId && patient) {
        const entry = await patientService.addEntry(patientId, values);
        patient.entries.concat(entry);
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (patientId === null || patient === null) {
    return (
      <div className="App">
        <Box fontFamily="Roboto, sans-serif" marginTop="0.5em">
          <Typography marginTop="1em" variant="h4">
            Patient
          </Typography>
          <div style={{ marginTop: "0.25em" }}>
            <em>Not found</em>
          </div>
        </Box>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Box
          fontFamily="Roboto, sans-serif"
          marginTop="0.5em"
          marginBottom="1.5em"
        >
          <Typography marginTop="1em" variant="h4">
            {patient.name} {patient.gender === "male" ? <MaleIcon /> : <></>}{" "}
            {patient.gender === "female" ? <FemaleIcon /> : <></>}{" "}
            {patient.gender === "other" ? <TransgenderIcon /> : <></>}
          </Typography>
          ssn: {patient.ssn} <br />
          occupation: {patient.occupation}
        </Box>
        <AddEntryModal
          diagnoses={diagnoses}
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add Entry
        </Button>
        <Box fontFamily="Roboto, sans-serif" marginTop="0.5em">
          <Typography marginTop="1em" variant="h5">
            Entries
          </Typography>
          <div
            style={{ marginBottom: "5em" }}
          >
            {patient.entries.length === 0 ? (
              <div style={{ marginTop: "0.25em" }}>
                <em>None yet</em>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "0.25em" }}>
              {patient.entries.map((entry, index) => (
                <PatientEntry key={index} entry={entry} />
              ))}
              </div>
            )}
          </div>
        </Box>
      </div>
    );
  }
};

export default PatientPage;
