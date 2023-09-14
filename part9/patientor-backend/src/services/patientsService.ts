import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,    
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};


const addPatient = ( entry: NewPatientEntry ): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newId: string = uuid();

  const newPatientEntry = {
    id: newId,
    ...entry
  };

  patients.push(newPatientEntry);
  
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};