import diagnoses from '../../data/diagnoses';

import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code, 
    name, 
    latin
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiary
};