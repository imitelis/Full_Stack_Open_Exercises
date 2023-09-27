import { useState, useEffect } from "react";
import axios from "axios";

import { Patient, EntryFormValues } from "../../types";
import patientService from "../../services/patients";

import { Box, Typography, Button } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import PatientEntry from "./PatientEntry";
import AddEntryModal from "../AddEntryModal";

interface Props {
  patientId: string | null;
}

const PatientPage = ({ patientId }: Props) => {
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
          Not Found.
        </Box>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Box fontFamily="Roboto, sans-serif" marginTop="0.5em">
          <Typography marginTop="1em" variant="h4">
            {patient.name} {patient.gender === "male" ? <MaleIcon /> : <></>}{" "}
            {patient.gender === "female" ? <FemaleIcon /> : <></>}{" "}
            {patient.gender === "other" ? <TransgenderIcon /> : <></>}
          </Typography>
          ssn: {patient.ssn} <br />
          occupation: {patient.occupation}
        </Box>
        <AddEntryModal
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
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {patient.entries.map((entry, index) => (
              <PatientEntry key={index} entry={entry} />
            ))}
          </div>
        </Box>
      </div>
    );
  }
};

export default PatientPage;
