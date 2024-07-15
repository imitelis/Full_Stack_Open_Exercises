# Full Stack Open - Part 2 - Communicating with server - Exercises


## Exercises 2.1.-2.5.

The exercises are submitted via GitHub, and by marking the exercises as done in the [submissions system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).

You can submit all of the exercises into the same repository, or use multiple different repositories. If you submit exercises from different parts into the same repository, name your directories well.

The exercises are submitted **One part at a time**. When you have submitted the exercises for a part, you can no longer submit any missed exercises for that part.

Note that this part has more exercises than the ones before, so <em>do not submit</em> until you have done all exercises from this part you want to submit.

**WARNING:** `create-react-app` makes the project automatically into a git repository if the project is not created inside of an already existing repository. You probably do not want the project to become a repository, so run the command `rm -rf .git` from its root.

### 2.1: Course information, step6

Let's finish the code for rendering course contents from exercises 1.1 - 1.5. You can start with the code from the model answers. The model answers for Part 1 can be found by going to the [submissions system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen), clicking on <em>my submissions</em> at the top, and in the row corresponding to Part 1 under the <em>solutions</em> column clicking on <em>show</em>. To see the solution to the course info exercise, click on `index.js` under <em>kurssitiedot</em> ("kurssitiedot" means "course info").

**Note that if you copy a project from one place to another, you might have to delete the <em>node_modules</em> directory and install the dependencies again with the command `npm install` before you can start the application.**

Generally, it's not recommended that you copy a project's whole contents and/or add the <em>node_modules</em> directory to the version control system.

Let's change the <em>App</em> component like so:

```
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
```

Define a component responsible for formatting a single course called <em>Course</em>.

The component structure of the application can be, for example, the following:

```
App
  Course
    Header
    Content
      Part
      Part
      ...
```

Hence, the <em>Course</em> component contains the components defined in the previous part, which are responsible for rendering the course name and its parts.

The rendered page can, for example, look as follows:

![plot](./exercises-media/8e.png)

You don't need the sum of the exercises yet.

The application must work <em>regardless of the number of parts a course has</em>, so make sure the application works if you add or remove parts of a course.

Ensure that the console shows no errors!

### 2.2: Course information, step7

Show also the sum of the exercises of the course.

![plot](./exercises-media/9e.png)

### 2.3*: Course information step8

If you haven't done so already, calculate the sum of exercises with the array method [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

**Pro-tip:** When your code looks as follows:

```
const total = 
  parts.reduce((s, p) => someMagicHere)
```

and does not work, it's worth it to use <em>console.log</em>, which requires the arrow function to be written in its longer form:

```
const total = parts.reduce((s, p) => {
  console.log('what is happening', s, p)
  return someMagicHere 
})
```

**Not working?:** Use your search engine to look up how `reduce` is used in an **Object Array**.

Pro tip 2: There is a plugin for VS Code that automatically changes the short-form arrow functions into their longer form and vice versa.

![plot](./exercises-media/5b.png)

### 2.4: Course information, step9

Let's extend our application to allow for an <em>arbitrary number</em> of courses:

```
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      // ...
    </div>
  )
}
```

The application can, for example, look like this:

![plot](./exercises-media/10e1.png)

### 2.5: separate module

Declare the <em>Course</em> component as a separate module, which is imported by the <em>App</em> component. You can include all subcomponents of the course in the same module.


## Exercises 2.6.-2.10.

In the first exercise, we will start working on an application that will be further developed in the later exercises. In related sets of exercises, it is sufficient to return the final version of your application. You may also make a separate commit after you have finished each part of the exercise set, but doing so is not required.

**WARNING:** `create-react-app` will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. You likely do not want your project to be a repository, so simply run the `rm -rf .git` command at the root of your application.

### 2.6: Phonebook, step1

Let's create a simple phonebook. **In this part, we will only be adding names to the phonebook**.

Let us start by implementing the addition of a person to the phonebook.

You can use the code below as a starting point for the <em>App</em> component of your application:

```
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
```

The `newName` state is meant for controlling the form input element.

Sometimes it can be useful to render state and other variables as text for debugging purposes. You can temporarily add the following element to the rendered component:

```
<div>debug: {newName}</div>
```

It's also important to put what we learned in the [debugging React applications](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps) chapter of part one into good use. The [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension is incredibly useful for tracking changes that occur in the application's state.

After finishing this exercise your application should look something like this:

![plot](./exercises-media/10e2.png)

Note the use of the React developer tools extension in the picture above!

**NB:**

  *  you can use the person's name as a value of the <em>key</em> property
  *  remember to prevent the default action of submitting HTML forms!

### 2.7: Phonebook, step2

Prevent the user from being able to add names that already exist in the phonebook. JavaScript arrays have numerous suitable [methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) for accomplishing this task. Keep in mind [how object equality works](https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/) in Javascript.

Issue a warning with the [alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) command when such an action is attempted:

![plot](./exercises-media/11e.png)

**Hint:** When you are forming strings that contain values from variables, it is recommended to use a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

```
`${newName} is already added to phonebook`
```

If the `newName` variable holds the value <em>Arto Hellas</em>, the template string expression returns the string

```
`Arto Hellas is already added to phonebook`
```

The same could be done in a more Java-like fashion by using the plus operator:

```
newName + ' is already added to phonebook'
```

Using template strings is the more idiomatic option and the sign of a true JavaScript professional.

### 2.8: Phonebook, step3

Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second <em>input</em> element to the form (along with its own event handler):

```
<form>
  <div>name: <input /></div>
  <div>number: <input /></div>
  <div><button type="submit">add</button></div>
</form>
```

At this point, the application could look something like this. The image also displays the application's state with the help of [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi):

![plot](./exercises-media/12e.png)

### 2.9*: Phonebook, step4

Implement a search field that can be used to filter the list of people by name:

![plot](./exercises-media/13e.png)

You can implement the search field as an <em>input</em> element that is placed outside the HTML form. The filtering logic shown in the image is <em>case insensitive</em>, meaning that the search term arto<em></em> also returns results that contain Arto with an uppercase A.

**NB:** When you are working on new functionality, it's often useful to "hardcode" some dummy data into your application, e.g.

```
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // ...
}
```

This saves you from having to manually input data into your application for testing out your new functionality.

### 2.10: Phonebook, step5

If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the <em>App</em> root component.

It is sufficient to extract **three** components from the application. Good candidates for separate components are, for example, the search filter, the form for adding new people to the phonebook, a component that renders all people from the phonebook, and a component that renders a single person's details.

The application's root component could look similar to this after the refactoring. The refactored root component below only renders titles and lets the extracted components take care of the rest.

```
const App = () => {
  // ...

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter ... />

      <h3>Add a new</h3>

      <PersonForm 
        ...
      />

      <h3>Numbers</h3>

      <Persons ... />
    </div>
  )
}
```

**NB:** You might run into problems in this exercise if you define your components "in the wrong place". Now would be a good time to rehearse the chapter [do not define a component in another component](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#do-not-define-components-within-components) from the last part.


## Exercise 2.11.

### 2.11: Phonebook, step6

We continue with developing the phonebook. Store the initial state of the application in the file <em>db.json</em>, which should be placed in the root of the project.

```
{
  "persons":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}
```

Start json-server on port 3001 and make sure that the server returns the list of people by going to the address [http://localhost:3001/persons](localhost:3001/persons) in the browser.

If you receive the following error message:

```
events.js:182
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE 0.0.0.0:3001
    at Object._errnoException (util.js:1019:11)
    at _exceptionWithHostPort (util.js:1041:20)
```

it means that port 3001 is already in use by another application, e.g. in use by an already running json-server. Close the other application, or change the port in case that doesn't work.

Modify the application such that the initial state of the data is fetched from the server using the <em>axios</em>-library. Complete the fetching with an [Effect hook](https://react.dev/reference/react/useEffect).


## Exercises 2.12.-2.15.

### 2.12: Phonebook, step7

Let's return to our phonebook application.

Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.

### 2.13: Phonebook, step8

Extract the code that handles the communication with the backend into its own module by following the example shown earlier in this part of the course material.

### 2.14: Phonebook, step9

Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the [window.confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) method:

![plot](./exercises-media/24e.png)

The associated resource for a person in the backend can be deleted by making an HTTP DELETE request to the resource's URL. If we are deleting e.g. a person who has the <em>id</em> 2, we would have to make an HTTP DELETE request to the URL <em>localhost:3001/persons/2</em>. No data is sent with the request.

You can make an HTTP DELETE request with the [axios](https://github.com/axios/axios) library in the same way that we make all of the other requests.

**NB:** You can't use the name `delete` for a variable because it's a reserved word in JavaScript. E.g. the following is not possible:

```
// use some other name for variable!
const delete = (id) => {
  // ...
}
```

### 2.15*: Phonebook, step10

<em>Why is there a star in the exercise? See [here](https://fullstackopen.com/en/part0/general_info#taking-the-course) for the explanation.</em>

Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. It's recommended to use the HTTP PUT method for updating the phone number.

If the person's information is already in the phonebook, the application can ask the user to confirm the action:

![plot](./exercises-media/16e.png)


## Exercises 2.16.-2.17.

### 2.16: Phonebook, step11

Use the [improved error message](https://fullstackopen.com/en/part2/adding_styles_to_react_app#improved-error-message) example from Part 2 as a guide to show a notification that lasts for a few seconds after a successful operation is executed (a person is added or a number is changed):

![plot](./exercises-media/27e.png)

### 2.17*: Phonebook, step12

Open your application in two browsers. **If you delete a person in browser 1** a short while before attempting to <em>change the person's phone number in browser 2</em>, you will get the following error message:

![plot](./exercises-media/29b.png)

Fix the issue according to the example shown in [promise and errors](https://fullstackopen.com/en/part2/altering_data_in_server#promises-and-errors) in Part 2. Modify the example so that the user is shown a message when the operation does not succeed. The messages shown for successful and unsuccessful events should look different:

![plot](./exercises-media/28e.png)

Note that even if you handle the exception, the first "404" error message is still printed to the console. But you should not see "Uncaught (in promise) Error".


## Exercises 2.18.-2.20.

### 2.18*: Data for countries, step1

At [https://studies.cs.helsinki.fi/restcountries/](https://studies.cs.helsinki.fi/restcountries/) you can find a service that offers a lot of information related to different countries in a so-called machine-readable format via the REST API. Make an application that allows you to view information from different countries.

The user interface is very simple. The country to be shown is found by typing a search query into the search field.

The user interface is very simple. The country to be shown is found by typing a search query into the search field.

If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific:

![plot](./exercises-media/19b1.png)

If there are ten or fewer countries, but more than one, then all countries matching the query are shown:

![plot](./exercises-media/19b2.png)

When there is only one country matching the query, then the basic data of the country (eg. capital and area), its flag and the languages spoken are shown:

![plot](./exercises-media/19b3.png)

**NB:** It is enough that your application works for most countries. Some countries, like Sudan, can be hard to support since the name of the country is part of the name of another country, South Sudan. You don't need to worry about these edge cases.

**WARNING:** `create-react-app` will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. Most likely you do not want each of your projects to be a separate repository, so simply run the `rm -rf .git` command at the root of your application.

### 2.19*: Data for countries, step2

**There is still a lot to do in this part, so don't get stuck on this exercise!**

Improve on the application in the previous exercise, such that when the names of multiple countries are shown on the page there is a button next to the name of the country, which when pressed shows the view for that country:

![plot](./exercises-media/19b4.png)

In this exercise, it is also enough that your application works for most countries. Countries whose name appears in the name of another country, like <em>Sudan</em>, can be ignored.

### 2.20*: Data for countries, step3

Add to the view showing the data of a single country, the weather report for the capital of that country. There are dozens of providers for weather data. One suggested API is [https://openweathermap.org](https://openweathermap.org). Note that it might take some minutes until a generated API key is valid.

![plot](./exercises-media/19b5.png)

If you use Open weather map, [here](https://openweathermap.org/weather-conditions#Icon-list) is the description for how to get weather icons.

**NB:** In some browsers (such as Firefox) the chosen API might send an error response, which indicates that HTTPS encryption is not supported, although the request URL starts with `http://`. This issue can be fixed by completing the exercise using Chrome.

**NB:** You need an api-key to use almost every weather service. Do not save the api-key to source control! Nor hardcode the api-key to your source code. Instead use an [environment variable](https://vitejs.dev/guide/env-and-mode.html) to save the key.

Assuming the api-key is <em>t0p53cr3t4p1k3yv4lu3</em>, when the application is started like so:

```
REACT_APP_API_KEY=t0p53cr3t4p1k3yv4lu3 npm start // For Linux/macOS Bash
($env:REACT_APP_API_KEY="t0p53cr3t4p1k3yv4lu3") -and (npm start) // For Windows PowerShell
set "REACT_APP_API_KEY=t0p53cr3t4p1k3yv4lu3" && npm start // For Windows cmd.exe
```

you can access the value of the key from the `process.env` object:

```
const api_key = process.env.REACT_APP_API_KEY
// variable api_key has now the value set in startup
```

Note that if you created the application using `npx create-react-app ...` and you want to use a different name for your environment variable then the environment variable name must still begin with <em>REACT_APP_</em>. You can also use a `.env` file rather than defining it on the command line each time by creating a file entitled '.env' in the root of the project and adding the following.

```
# .env

REACT_APP_API_KEY=t0p53cr3t4p1k3yv4lu3
```

Note that you will need to restart the server to apply the changes.

This was the last exercise of this part of the course. It's time to push your code to GitHub and mark all of your finished exercises to the exercise [submissions system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).


