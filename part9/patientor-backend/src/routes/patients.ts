import express from "express";

import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewEntry";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  // console.log('Fetching all patients!');
  res.send(patientsService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  // console.log('Fetching a patient!');
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  // console.log('Saving a patient!');
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  // console.log('Saving an entry!');
  try {
    const newEntry = toNewEntry(req.body);
    const patient = patientsService.findById(req.params.id);
    if (patient) {
      const addedEntry = patientsService.addEntry(patient, newEntry);
      res.json(addedEntry);
    } else {
      res.sendStatus(404);
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
