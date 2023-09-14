import express from 'express';

import toNewPatientEntry from '../utils';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  // console.log('Fetching all patients!');
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
   // console.log('Saving a patient!');
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);    
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;