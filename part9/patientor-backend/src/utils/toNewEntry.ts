import {
  Diagnosis,
  Discharge,
  SickLeave,
  HealthCheckRating,
  NewEntry,
  NewBaseEntry,
} from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isDischarge = (discharge: object): boolean => {
  if ("date" in discharge && "criteria" in discharge) {
    return Boolean(
      isString(discharge.date) &&
        isDate(discharge.date) &&
        isString(discharge.criteria),
    );
  }
  return false;
};

const isSickLeave = (sickLeave: object): boolean => {
  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    return Boolean(
      isString(sickLeave.startDate) &&
        isDate(sickLeave.startDate) &&
        isString(sickLeave.endDate) &&
        isDate(sickLeave.endDate),
    );
  }
  return false;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object" || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }
  const { date, criteria } = discharge as Discharge;
  return { date, criteria };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object" || !isSickLeave(sickLeave)) {
    throw new Error("Incorrect or missing sickLeave");
  }
  const { startDate, endDate } = sickLeave as SickLeave;
  return { startDate, endDate };
};

const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown,
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return healthCheckRating;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const newBaseEntry: NewBaseEntry =
      "diagnosisCodes" in object
        ? {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          }
        : {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
          };

    if ("type" in object) {
      switch (object.type) {
        case "Hospital":
          if ("discharge" in object) {
            const newHospitalEntry: NewEntry = {
              ...newBaseEntry,
              type: "Hospital",
              discharge: parseDischarge(object.discharge),
            };
            return newHospitalEntry;
          }
          throw new Error("Incorrect data: discharge is missing");

        case "OccupationalHealthcare":
          if ("employerName" in object) {
            const newOccupationalHealthcareEntry: NewEntry =
              "sickLeave" in object
                ? {
                    ...newBaseEntry,
                    type: "OccupationalHealthcare",
                    employerName: parseEmployerName(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave),
                  }
                : {
                    ...newBaseEntry,
                    type: "OccupationalHealthcare",
                    employerName: parseEmployerName(object.employerName),
                  };
            return newOccupationalHealthcareEntry;
          }
          throw new Error("Incorrect data: employerName is missing");

        case "HealthCheck":
          if ("healthCheckRating" in object) {
            const newHealthCheckEntry: NewEntry = {
              ...newBaseEntry,
              type: "HealthCheck",
              healthCheckRating: parseHealthCheckRating(
                object.healthCheckRating,
              ),
            };
            return newHealthCheckEntry;
          }
          throw new Error("Incorrect data: healthCheckRating is missing");
      }
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewEntry;
