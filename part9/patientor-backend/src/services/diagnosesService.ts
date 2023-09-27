import diagnoses from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin,
  }));
};

export default {
  getDiagnoses,
};
