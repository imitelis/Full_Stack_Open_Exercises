import { v1 as uuid } from "uuid";

import patients from "../../data/patients";

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  NewEntry,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (newPatient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newId: string = uuid();

  const NewPatient = {
    id: newId,
    ...newPatient,
    entries: [],
  };

  patients.push(NewPatient);

  return NewPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Entry => {
  const newId: string = uuid();

  const NewEntry = {
    id: newId,
    ...newEntry,
  };

  patient.entries.push(NewEntry);

  return NewEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient,
  addEntry,
};
