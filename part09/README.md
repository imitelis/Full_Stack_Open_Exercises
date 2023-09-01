# Full Stack Open - Part 9 - TypeScript - Exercises


## Exercises 9.1-9.3.

### setup

Exercises 9.1-9.7. will all be made in the same node project. Create the project in an empty directory with `npm init` and install the ts-node and typescript packages. Also, create the file <em>tsconfig.json</em> in the directory with the following content:

```
{
  "compilerOptions": {
    "noImplicitAny": true,
  }
}
```

The compiler option [noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny) makes it mandatory to have types for all variables used. This option is currently a default, but it lets us define it explicitly.

### 9.1 Body mass index

Create the code of this exercise in the file <em>bmiCalculator.ts</em>.

Write a function `calculateBmi` that calculates a [BMI](https://en.wikipedia.org/wiki/Body_mass_index) based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code

```
console.log(calculateBmi(180, 74))
```

should print the following message:

```
Normal (healthy weight)
```

Create an npm script for running the program with the command `npm run calculateBmi`.

### 9.2 Exercise calculator

Create the code of this exercise in file `exerciseCalculator.ts`.

Write a function `calculateExercises` that calculates the average time of <em>daily exercise hours</em> and compares it to the <em>target amount</em> of daily hours and returns an object that includes the following values:

  *  the number of days
  *  the number of training days
  *  the original target value
  *  the calculated average time
  *  boolean value describing if the target was reached
  *  a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
  *  a text value explaining the rating, you can come up with the explanations

The daily exercise hours are given to the function as an [array](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays) that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training on Monday, none on Tuesday, 2 hours on Wednesday, 4.5 hours on Thursday and so on would be represented by the following array:

```
[3, 0, 2, 4.5, 0, 3, 1]
```

For the Result object, you should create an [interface](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces).

If you call the function with parameters `[3, 0, 2, 4.5, 0, 3, 1]` and `2`, it should return:

{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }

Create an npm script, `npm run calculateExercises`, to call the function with hard-coded values.

### 9.3 Command line

Change the previous exercises so that you can give the parameters of `bmiCalculator` and `exerciseCalculator` as command-line arguments.

Your program could work eg. as follows:

```
$ npm run calculateBmi 180 91

Overweight
```

and:

```
$ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4

{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 }
```

In the example, the <em>first argument</em> is the target value.

Handle exceptions and errors appropriately. The exerciseCalculator should accept inputs of varied lengths. Determine by yourself how you manage to collect all needed input.

Couple of things to notice:

If you define helper functions in other modules, you should use the [JavaScript module system](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), that is, the one we have used with React where importing is done with

```
import { isNotNumber } from "./utils";
```

and exporting

```
export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

default export "this is the default..."
```

Another note: somehow surprisingly TypeScript does not allow to define the same variable in many files at a "block-scope", that is, outside functions (or classes):

*** browser showing pong from localhost:3000/ping

This is actually not quite true. This rule applies only to files that are treated as "scripts". A file is a script if it does not contain any export or import statements. If a file has those, then the file is treated as a [module](https://www.typescriptlang.org/docs/handbook/modules.html), <em>and</em> the variables do not get defined in the block-scope.


## Exercises 9.4-9.5

### 9.4 Express

Add Express to your dependencies and create an HTTP GET endpoint `hello` that answers 'Hello Full Stack!'

The web app should be started with the commands `npm start` in production mode and `npm run dev` in development mode. The latter should also use `ts-node-dev` to run the app.

Replace also your existing <em>tsconfig.json</em> file with the following content:

```
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "declaration": true,
  }
}
```

Make sure there aren't any errors!

### 9.5 WebBMI

Add an endpoint for the BMI calculator that can be used by doing an HTTP GET request to the endpoint bmi and specifying the input with query string parameters. For example, to get the BMI of a person with a height of 180 and a weight of 72, the URL is http://localhost:3002/bmi?height=180&weight=72.

The response is a JSON of the form:

{
  weight: 72,
  height: 180,
  bmi: "Normal (healthy weight)"
}

See the Express documentation for info on how to access the query parameters.

If the query parameters of the request are of the wrong type or missing, a response with proper status code and an error message is given:

{
  error: "malformatted parameters"
}

Do not copy the calculator code to file index.ts; instead, make it a TypeScript module that can be imported into index.ts.

Exercises 9.6-9.7
9.6 Eslint

Configure your project to use the above ESlint settings and fix all the warnings.
9.7 WebExercises

Add an endpoint to your app for the exercise calculator. It should be used by doing an HTTP POST request to endpoint http://localhost:3002/exercises with the input in the request body:

{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}

The response is a JSON of the following form:

{
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
}

If the body of the request is not in the right form, a response with the proper status code and an error message are given. The error message is either

{
  error: "parameters missing"
}

or

{
  error: "malformatted parameters"
}

depending on the error. The latter happens if the input values do not have the right type, i.e. they are not numbers or convertible to numbers.

In this exercise, you might find it beneficial to use the explicit any type when handling the data in the request body. Our ESlint configuration is preventing this but you may unset this rule for a particular line by inserting the following comment as the previous line:

// eslint-disable-next-line @typescript-eslint/no-explicit-any

You might also get in trouble with rules no-unsafe-member-access and no-unsafe-assignment. These rules may be ignored in this exercise.

Note that you need to have a correct setup to get the request body; see part 3.

Exercises 9.8-9.9
Before you start the exercises

For this set of exercises, you will be developing a backend for an existing project called Patientor, which is a simple medical record application for doctors who handle diagnoses and basic health information of their patients.

The frontend has already been built by outsider experts and your task is to create a backend to support the existing code.
WARNING

Quite often VS code loses track what is really happening in the code and it shows type or style related warnings despite the code has been fixed. If this happens (to me it has happened quite often), just restart the editor. It is also good to doublecheck that everything really works by running the compiler and the eslint from the command line with commands:

npm run tsc
npm run lint

When run in command line you get the "real result" for sure. So, never trust the editor too much!
9.8: Patientor backend, step1

Initialize a new backend project that will work with the frontend. Configure eslint and tsconfig with the same configurations as proposed in the material. Define an endpoint that answers HTTP GET requests for route /api/ping.

The project should be runnable with npm scripts, both in development mode and, as compiled code, in production mode.
9.9: Patientor backend, step2

Fork and clone the project patientor. Start the project with the help of the README file.

You can run this command if you get an error message when trying to start the frontend:

npm update chokidar

You should be able to use the frontend without a functioning backend.

Ensure that the backend answers the ping request that the frontend has made on startup. Check the developer tools to make sure it works:
dev tools showing ping failed

You might also want to have a look at the console tab. If something fails, part 3 of the course shows how the problem can be solved.


Exercises 9.10-9.11

Similarly to Ilari's flight service, we do not use a real database in our app but instead use hardcoded data that is in the files diagnoses.ts and patients.ts. Get the files and store those in a directory called data in your project. All data modification can be done in runtime memory, so during this part, it is not necessary to write to a file.
9.10: Patientor backend, step3

Create a type Diagnose and use it to create endpoint /api/diagnoses for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully-named directories and files.

Note that diagnoses may or may not contain the field latin. You might want to use optional properties in the type definition.
9.11: Patientor backend, step4

Create data type Patient and set up the GET endpoint /api/patients which returns all patients to the frontend, excluding field ssn. Use a utility type to make sure you are selecting and returning only the wanted fields.

In this exercise, you may assume that field gender has type string.

Try the endpoint with your browser and ensure that ssn is not included in the response:
api/patients browser shows no ssn in patients json

After creating the endpoint, ensure that the frontend shows the list of patients:
browser showing list of patients 

Exercises 9.12-9.13
9.12: Patientor backend, step5

Create a POST endpoint /api/patients for adding patients. Ensure that you can add patients also from the frontend. You can create unique ids of type string using the uuid library:

import { v1 as uuid } from 'uuid'
const id = uuid()

9.13: Patientor backend, step6

Set up safe parsing, validation and type predicate to the POST /api/patients request.

Refactor the gender field to use an enum type.

Exercise 9.14
9.14

Create a new Create React App with TypeScript, and set up ESlint for the project similarly to how we just did.

This exercise is similar to the one you have already done in Part 1 of the course, but with TypeScript and some extra tweaks. Start off by modifying the contents of index.tsx to the following:

import ReactDOM from 'react-dom/client'
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)

and App.tsx to the following:

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default App;

and remove the unnecessary files.

The whole app is now in one component. That is not what we want, so refactor the code so that it consists of three components: Header, Content and Total. All data is still kept in the App component, which passes all necessary data to each component as props. Be sure to add type declarations for each component's props!

The Header component should take care of rendering the name of the course. Content should render the names of the different parts and the number of exercises in each part, and Total should render the total sum of exercises in all parts.

The App component should look somewhat like this:

const App = () => {
  // const-declarations

  return (
    <div>
      <Header name={courseName} />
      <Content ... />
      <Total ... />
    </div>
  )
};


Exercise 9.15
9.15

Let us now continue extending the app created in exercise 9.14. First, add the type information and replace the variable courseParts with the one from the example below.

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];

Now we know that both interfaces CoursePartBasic and CoursePartBackground share not only the base attributes but also an attribute called description, which is a string in both interfaces.

Your first task is to declare a new interface that includes the description attribute and extends the CoursePartBase interface. Then modify the code so that you can remove the description attribute from both CoursePartBasic and CoursePartBackground without getting any errors.

Then create a component Part that renders all attributes of each type of course part. Use a switch case-based exhaustive type checking! Use the new component in component Content.

Lastly, add another course part interface with the following attributes: name, exerciseCount, description and requirements, the latter being a string array. The objects of this type look like the following:

{
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
}

Then add that interface to the type union CoursePart and add corresponding data to the courseParts variable. Now, if you have not modified your Content component correctly, you should get an error, because you have not yet added support for the fourth course part type. Do the necessary changes to Content, so that all attributes for the new course part also get rendered and that the compiler doesn't produce any errors.

The result might look like the following:
browser showing half stack application development


Exercises 9.16-9.19

Let us now build a frontend for the Ilari's flight diaries that was developed in the previous section. The source code of the backend can be found in this GitHub repository.
Exercise 9.16

Create a TypeScript React app with similar configurations as the apps of this section. Fetch the diaries from the backend and render those to screen. Do all the required typing and ensure that there are no Eslint errors.

Remember to keep the network tab open. It might give you a valuable hint...

You can decide how the diary entries are rendered. If you wish, you may take inspiration from the figure below. Note that the backend API does not return the diary comments, you may modify it to return also those on a GET request.
Exercise 9.17

Make it possible to add new diary entries from the frontend. In this exercise you may skip all validations and assume that the user just enters the data in a correct form.
Exercise 9.18

Notify the user if the the creation of a diary entry fails in the backend, show also the reason for the failure.

See eg. this how you can narrow the Axios error so that you can get hold of the error message.

Your solution may look like this:
browser showing error incorrect visibility best ever
Exercise 9.19

Addition of a diary entry is now very error prone since user can type anything to the input fields. The situation must be improved.

Modify the input form so that the date is set with a HTML date input element, and the weather and visibility are set with HTML radio buttons. We have already used radio buttons in part 6, that material may or may not be useful...

Your app should all the time stay well typed and there should not be any Eslint errors and no Eslint rules should be ignored.

Your solution could look like this:
browser showing add new entry form for diaries 

Exercises 9.20-9.21

We will soon add a new type for our app, Entry, which represents a lightweight patient journal entry. It consists of a journal text, i.e. a description, a creation date, information regarding the specialist who created it and possible diagnosis codes. Diagnosis codes map to the ICD-10 codes returned from the /api/diagnoses endpoint. Our naive implementation will be that a patient has an array of entries.

Before going into this, let us do some preparatory work.
9.20: Patientor, step1

Create an endpoint /api/patients/:id to the backend that returns all of the patient information for one patient, including the array of patient entries that is still empty for all the patients. For the time being, expand the backend types as follows:

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

The response should look as follows:
browser showing entries blank array when accessing patient
9.21: Patientor, step2

Create a page for showing a patient's full information in the frontend.

The user should be able to access a patient's information by clicking the patient's name.

Fetch the data from the endpoint created in the previous exercise.

You may use MaterialUI for the new components but that is up to you since our main focus now is TypeScript.

You might want to have a look at part 7 if you don't yet have a grasp on how the React Router works.

The result could look like this:
browser showing patientor with one patient

The example uses Material UI Icons to represent genders.

Exercises 9.22-9.29

Now we are ready to put the finishing touches to the app!
9.22: Patientor, step3

Define the types OccupationalHealthcareEntry and HospitalEntry so that those conform with the example data. Ensure that your backend returns the entries properly when you go to an individual patient's route:
browser shoiwing entries json data properly for patient

Use types properly in the backend! For now, there is no need to do a proper validation for all the fields of the entries in the backend, it is enough e.g. to check that the field type has a correct value.
9.23: Patientor, step4

Extend a patient's page in the frontend to list the date, description and diagnoseCodes of the patient's entries.

You can use the same type definition for an Entry in the frontend. For these exercises, it is enough to just copy/paste the definitions from the backend to the frontend.

Your solution could look like this:
browser showing list of diagnosis codes for patient
9.24: Patientor, step5

Fetch and add diagnoses to the application state from the /api/diagnoses endpoint. Use the new diagnosis data to show the descriptions for patient's diagnosis codes:
browser showing list of codes and their descriptions for patient
9.25: Patientor, step6

Extend the entry listing on the patient's page to include the Entry's details with a new component that shows the rest of the information of the patient's entries distinguishing different types from each other.

You could use eg. Icons or some other Material UI component to get appropriate visuals for your listing.

You should use a switch case-based rendering and exhaustive type checking so that no cases can be forgotten.

Like this:
vscode showing error for healthCheckEntry not being assignable to type never

The resulting entries in the listing could look something like this:
browser showing list of entries and their details in a nicer format
9.26: Patientor, step7

We have established that patients can have different kinds of entries. We don't yet have any way of adding entries to patients in our app, so, at the moment, it is pretty useless as an electronic medical record.

Your next task is to add endpoint /api/patients/:id/entries to your backend, through which you can POST an entry for a patient.

Remember that we have different kinds of entries in our app, so our backend should support all those types and check that at least all required fields are given for each type.

In this exercise you quite likely need to remember this trick.

You may assume that the diagnostic codes are sent in a correct form and use eg. the following kind of parser to extract those from the request body:

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

9.27: Patientor, step8

Now that our backend supports adding entries, we want to add the corresponding functionality to the frontend. In this exercise, you should add a form for adding an entry to a patient. An intuitive place for accessing the form would be on a patient's page.

In this exercise, it is enough to support one entry type. All the fields in the form can be just plain text inputs, so it is up to user to enter valid values.

Upon a successful submit, the new entry should be added to the correct patient and the patient's entries on the patient page should be updated to contain the new entry.

Your form might look something like this:
Patientor new healthcheck entry form

If user enters invalid values to the form and backend rejects the addition, show a proper error message to user
browser showing healthCheckRating incorrect 15 error
9.28: Patientor, step9

Extend your solution so that it supports all the entry types
9.29: Patientor, step10

Improve the entry creation forms so that it makes hard to enter incorrect dates, diagnosis codes and health rating.

Your improved form might look something like this:
patientor showing fancy calendar ui

Diagnosis codes are now set with Material UI multiple select and dates with Input elements with type date.
Submitting exercises and getting the credits

Exercises of this part are submitted via the submissions system just like in the previous parts, but unlike previous parts, the submission goes to a different "course instance". Remember that you have to finish at least 24 exercises to pass this part!

Once you have completed the exercises and want to get the credits, let us know through the exercise submission system that you have completed the course:
Submissions

Note that you need a registration to the corresponding course part for getting the credits registered, see here for more information.

You can download the certificate for completing this part by clicking one of the flag icons. The flag icon corresponds to the certificate's language.


Exercises 9.20-9.22

We will soon add a new type for our app, Entry, which represents a lightweight patient journal entry. It consists of a journal text, i.e. a description, a creation date, information regarding the specialist who created it and possible diagnosis codes. Diagnosis codes map to the ICD-10 codes returned from the /api/diagnoses endpoint. Our naive implementation will be that a patient has an array of entries.

Before going into this, let us do some preparatory work.
9.20: patientor, step1

Create an endpoint /api/patients/:id that returns all of the patient information for one patient, including the array of patient entries that is still empty for all the patients. For the time being, expand the backend types as follows:

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

The response should look as follows:
browser showing entries blank array when accessing patient
9.21: patientor, step2

Create a page for showing a patient's full information in the frontend.

The user should be able to access a patient's information by clicking the patient's name.

Fetch the data from the endpoint created in the previous exercise. After fetching the patient information from the backend, add the fetched information to the application's state. Do not fetch the information if it already is in the app state (i.e. if the user is visiting the same patient's information many times).

Since we now have the state in the context, you'll need to define a new action type for updating an individual patient's data.

The Application uses MaterialUI for styling, which we covered in part 7. You may also use it for the new components but that is up to you since our main focus now is TypeScript.

The Application also uses React Router to control which view is visible in the frontend. You might want to have a look at part 7 if you don't yet have a grasp on how the router works.

The result could look like this:
browser showing patientor with one patient

Example uses Material UI Icons to represent genders.

Note that to access the id in the URL, you need to give useParams a proper type argument:

const { id } = useParams<{ id: string }>();

9.22: Patientor, step3

Currently, we create action objects wherever we dispatch actions, e.g. the App component has the following:

dispatch({
  type: "SET_PATIENT_LIST", payload: patientListFromApi
});

Define action creator functions in the file src/state/reducer.ts and refactor the code to use them.

For example, the App should become like the following:

import { useStateValue, setPatientList } from "./state";

// ...

dispatch(setPatientList(patientListFromApi));



Exercises 9.23-9.26
9.23: Patientor, step4

Define the types OccupationalHealthcareEntry and HospitalEntry so that those conform with the example data. Ensure that your backend returns the entries properly when you go to an individual patient's route:
browser shoiwing entries json data properly for patient

Use types properly in the backend! For now, there is no need to do a proper validation for all the fields of the entries in the backend, it is enough e.g. to check that the field type has a correct value.
9.24: Patientor, step5

Extend a patient's page in the frontend to list the date, description and diagnoseCodes of the patient's entries.

You can use the same type definition for an Entry in the frontend. For these exercises, it is enough to just copy/paste the definitions from the backend to the frontend.

Your solution could look like this:
browser showing list of diagnosis codes for patient
9.25: Patientor, step6

Fetch and add diagnoses to the application state from the /api/diagnoses endpoint. Use the new diagnosis data to show the descriptions for patient's diagnosis codes:
browser showing list of codes and their descriptions for patient
9.26: Patientor, step7

Extend the entry listing on the patient's page to include the Entry's details with a new component that shows the rest of the information of the patient's entries distinguishing different types from each other.

You could use eg. Icons or some other Material UI component to get appropriate visuals for your listing.

You should use a switch case-based rendering and exhaustive type checking so that no cases can be forgotten.

Like this:
vscode showing error for healthCheckEntry not being assignable to type never

The resulting entries in the listing could look something like this:
browser showing list of entries and their details in a nicer format 


Exercises 9.27-9.31
9.27: Patientor, step8

We have established that patients can have different kinds of entries. We don't yet have any way of adding entries to patients in our app, so, at the moment, it is pretty useless as an electronic medical record.

Your next task is to add endpoint /api/patients/:id/entries to your backend, through which you can POST an entry for a patient.

Remember that we have different kinds of entries in our app, so our backend should support all those types and check that at least all required fields are given for each type.
9.28: Patientor, step9

Now that our backend supports adding entries, we want to add the corresponding functionality to the frontend. In this exercise, you should add a form for adding an entry to a patient. An intuitive place for accessing the form would be on a patient's page.

In this exercise, it is enough to support one entry type, and you do not have to handle any errors. It is enough if a new entry can be created when the form is filled with valid data.

Upon a successful submit, the new entry should be added to the correct patient and the patient's entries on the patient page should be updated to contain the new entry.

If you like, you can re-use some of the code from the Add patient form for this exercise, but this is not a requirement.

Note that the file FormField.tsx has a ready-made component called DiagnosisSelection that can be used for setting the field diagnoses.

It can be used as follows:

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        /// ...
      }}
      onSubmit={onSubmit}
      validate={values => {
        /// ...
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      return (
        <Form className="form ui">
          // ...

          <DiagnosisSelection            setFieldValue={setFieldValue}            setFieldTouched={setFieldTouched}            diagnoses={Object.values(diagnoses)}          />    
          // ...
        </Form>
      );
    }}
  </Formik>
  );
};

With small tweaks on types, the readily made component SelectField can be used for the health check rating.
9.29: Patientor, step10

Extend your solution so that it displays an error message if some required values are missing or formatted incorrectly.
9.30: Patientor, step11

Extend your solution so that it supports two entry types and displays an error message if some required values are missing or formatted incorrectly. You do not need to care about possible errors in the server's response.

The easiest but surely not the most elegant way to do this exercise is to have a separate form for each different entry type. Getting the types to work properly might be a slight challenge if you use just a single form.

Note that if you need to alter the shown form based on user selections, you can access the form values using the parameter values of the rendering function:

<Formik
  initialValues={}
  onSubmit={onSubmit}
  validate={}
>
  {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {    console.log(values);    return (
      <Form className="form ui">
      </Form>
    );
  }}
</Formik>

9.31: Patientor, step12

Extend your solution so that it supports all the entry types and displays an error message if some required values are missing or formatted incorrectly. You do not need to care about possible errors in the server's response.



