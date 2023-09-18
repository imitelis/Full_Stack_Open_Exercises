# Full Stack Open - Part 1 - Introduction to React - Exercises


## Exercises 1.1.-1.2.

The exercises are submitted via GitHub, and by marking the exercises as done in the "my submissions" tab of the [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).

The exercises are submitted **one part at a time**. When you have submitted the exercises for a part of the course you can no longer submit undone exercises for the same part.

Note that in this part, there are [more exercises](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#exercises-1-6-1-14) besides those found below. <em>Do not submit your work</em> until you have completed all of the exercises you want to submit for the part.

You may submit all the exercises of this course into the same repository, or use multiple repositories. If you submit exercises of different parts into the same repository, please use a sensible naming scheme for the directories.

One very functional file structure for the submission repository is as follows:

```
part0
part1
  courseinfo
  unicafe
  anecdotes
part2
  phonebook
  countries
```

See this [example submission repository](https://github.com/fullstack-hy2020/example-submission-repository)!

For each part of the course, there is a directory, which further branches into directories containing a series of exercises, like "unicafe" for Part 1.

Most of the exercises of the course build a larger application, eg. courseinfo, unicafe and anecdotes in this part, bit by bit. It is enough to submit the completed application. You can make a commit after each exercise, but that is not compulsory. For example the course info app is built in exercises 1.1.-1.5. It is just the end result after 1.5 that you need to submit!

For each web application for a series of exercises, it is recommended to submit all files relating to that application, except for the directory <em>node_modules</em>.

### 1.1: Course information, step1

<em>The application that we will start working on in this exercise will be further developed in a few of the following exercises. In this and other upcoming exercise sets in this course, it is enough to only submit the final state of the application. If desired, you may also create a commit for each exercise of the series, but this is entirely optional.</em>

Use create-react-app to initialize a new application. Modify <em>index.js</em> to match the following

```
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

and <em>App.js</em> to match the following

```
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App
```

and remove extra files (<em>App.css</em>, <em>App.test.js</em>, <em>index.css</em>, <em>logo.svg</em>, <em>setupTests.js</em>, <em>reportWebVitals.js</em>)).

Unfortunately, the entire application is in the same component. Refactor the code so that it consists of three new components: <em>Header</em>, <em>Content</em>, and <em>Total</em>. All data still resides in the <em>App</em> component, which passes the necessary data to each component using <em>props</em>. <em>Header</em> takes care of rendering the name of the course, <em>Content</em> renders the parts and their number of exercises and <em>Total</em> renders the total number of exercises.

Define the new components in the file <em>App.js</em>.

The <em>App</em> component's body will approximately be as follows:

```
const App = () => {
  // const-definitions

  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}
```

**WARNING:** Don't try to program all the components concurrently, because that will almost certainly break down the whole app. Proceed in small steps, first make e.g. the component Header and only when it works for sure, you could proceed to the next component.

Careful, small-step progress may seem slow, but it is actually <em>by far the fastest</em> way to progress. Famous software developer Robert "Uncle Bob" Martin has stated

<blockquote><em>"The only way to go fast, is to go well"</em></blockquote>

that is, according to Martin, careful progress with small steps is even the only way to be fast.

**WARNING 2:** `create-react-app` automatically makes the project a git repository unless the application is created within an already existing repository. Most likely you do not want the project to become a repository, so run the command `rm -rf .git` in the root of the project.

### 1.2: Course information, step2

Refactor the <em>Content</em> component so that it does not render any names of parts or their number of exercises by itself. Instead, it only renders three <em>Part</em> components of which each renders the name and number of exercises of one part.

```
const Content = ... {
  return (
    <div>
      <Part .../>
      <Part .../>
      <Part .../>
    </div>
  )
}
```

Our application passes on information in quite a primitive way at the moment, since it is based on individual variables. We shall fix that in [Part 2](https://fullstackopen.com/en/part2), but before that, let's go to part1b to learn about JavaScript.


## Exercises 1.3.-1.5.

<em>We continue building the application that we started working on in the previous exercises. You can write the code into the same project since we are only interested in the final state of the submitted application.</em>

**Pro-tip:** you may run into issues when it comes to the structure of the props that components receive. A good way to make things more clear is by printing the props to the console, e.g. as follows:

```
const Header = (props) => {
  console.log(props)  return <h1>{props.course}</h1>
}
```

If and when you encounter an error message

<blockquote><em>Objects are not valid as a React child</em></blockquote>

keep in mind the things told [here](https://fullstackopen.com/en/part1/introduction_to_react#do-not-render-objects).

### 1.3: Course information, step3

Let's move forward to using objects in our application. Modify the variable definitions of the <em>App</em> component as follows and also refactor the application so that it still works:

```
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      ...
    </div>
  )
}
```

### 1.4: Course information, step4

And then place the objects into an array. Modify the variable definitions of <em>App</em> into the following form and modify the other parts of the application accordingly:

```
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      ...
    </div>
  )
}
```

**NB:** At this point you <em>can assume that there are always three items</em>, so there is no need to go through the arrays using loops. We will come back to the topic of rendering components based on items in arrays with a more thorough exploration in the [next part of the course](https://fullstackopen.com/en/part2).

However, do not pass different objects as separate props from the <em>App</em> component to the components <em>Content</em> and <em>Total</em>. Instead, pass them directly as an array:

```
const App = () => {
  // const definitions

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
```

### 1.5: Course information, step5

Let's take the changes one step further. Change the course and its parts into a single JavaScript object. Fix everything that breaks.

```
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      ...
    </div>
  )
}
```


## Exercises 1.6.-1.14.

Submit your solutions to the exercises by first pushing your code to GitHub and then marking the completed exercises into the "my submissions" tab of the [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).

Remember, submit **all** the exercises of one part in a **single submission**. Once you have submitted your solutions for one part, **you cannot submit more exercises to that part anymore**.

<em>Some of the exercises work on the same application. In these cases, it is sufficient to submit just the final version of the application. If you wish, you can make a commit after every finished exercise, but it is not mandatory.</em>

**WARNING:** `create-react-app` will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. Most likely you do not want each of your projects to be a separate repository, so simply run the `rm -rf .git` command at the root of your application.

In some situations you may also have to run the command below from the root of the project:

```
rm -rf node_modules/ && npm i
```

If and when you encounter an error message

<blockquote><em>Objects are not valid as a React child</em></blockquote>

keep in mind the things told [here](https://fullstackopen.com/en/part1/introduction_to_react#do-not-render-objects).

### 1.6: Unicafe, step1

Like most companies, the student restaurant of the University of Helsinki [Unicafe](https://www.unicafe.fi) collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: <em>good</em>, <em>neutral</em>, and <em>bad</em>.

The application must display the total number of collected feedback for each category. Your final application could look like this:

![plot](./exercises-media/13e.png)

Note that your application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

It is advisable to use the same structure that is used in the material and previous exercise. File <em>index.js</em> is as follows:

```
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

You can use the code below as a starting point for the <em>App.js</em> file:

```
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
    </div>
  )
}

export default App
```

### 1.7: Unicafe, step2

Expand your application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

![plot](./exercises-media/14e.png)

### 1.8: Unicafe, step3

Refactor your application so that displaying the statistics is extracted into its own <em>Statistics</em> component. The state of the application should remain in the <em>App</em> root component.

Remember that components should not be defined inside other components:

```
// a proper place to define a component
const Statistics = (props) => {
  // ...
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // do not define a component within another component
  const Statistics = (props) => {
    // ...
  }

  return (
    // ...
  )
}
```

### 1.9: Unicafe, step4

Change your application to display statistics only once feedback has been gathered.

![plot](./exercises-media/15e.png)

### 1.10: Unicafe, step5

Let's continue refactoring the application. Extract the following two components:

  *  <em>Button</em> for defining the buttons used for submitting feedback
  *  <em>StatisticLine</em> for displaying a single statistic, e.g. the average score.

To be clear: the <em>StatisticLine</em> component always displays a single statistic, meaning that the application uses multiple components for rendering all of the statistics:

```
const Statistics = (props) => {
  /// ...
  return(
    <div>
      <StatisticLine text="good" value ={...} />
      <StatisticLine text="neutral" value ={...} />
      <StatisticLine text="bad" value ={...} />
      // ...
    </div>
  )
}
```

The application's state should still be kept in the root App component.

### 1.11*: Unicafe, step6

Display the statistics in an HTML [table](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics), so that your application looks roughly like this:

![plot](./exercises-media/16e.png)

Remember to keep your console open at all times. If you see this warning in your console:

![plot](./exercises-media/17a.png)

Then perform the necessary actions to make the warning disappear. Try pasting the error message into a search engine if you get stuck.

<em>Typical source of an error `Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist`. is Chrome extension. Try going to `chrome://extensions/` and try disabling them one by one and refreshing React app page; the error should eventually disappear.</em>

**Make sure that from now on you don't see any warnings in your console!**

### 1.12*: Anecdotes, step1

The world of software engineering is filled with [anecdotes](www.comp.nus.edu.sg/~damithch/pages/SE-quotes.htm) that distill timeless truths from our field into short one-liners.

Expand the following application by adding a button that can be clicked to display a <em>random</em> anecdote from the field of software engineering:

```
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {anecdotes[selected]}
    </div>
  )
}

export default App
```

Content of the file <em>index.js</em> is the same as in previous exercises.

Find out how to generate random numbers in JavaScript, eg. via a search engine or on [Mozilla Developer Network](https://developer.mozilla.org/en-US). Remember that you can test generating random numbers e.g. straight in the console of your browser.

Your finished application could look something like this:

![plot](./exercises-media/18a.png)

**WARNING:** `create-react-app` will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. Most likely you do not want each of your projects to be a separate repository, so simply run the `rm -rf .git` command at the root of your application.

### 1.13*: Anecdotes, step2

Expand your application so that you can vote for the displayed anecdote.

![plot](./exercises-media/19a.png)

**NB:** Store the votes of each anecdote into an array or object in the component's state. Remember that the correct way of updating state stored in complex data structures like objects and arrays is to make a copy of the state.

You can create a copy of an object like this:

```
const points = { 0: 1, 1: 3, 2: 4, 3: 2 }

const copy = { ...points }
// increment the property 2 value by one
copy[2] += 1       
```

OR a copy of an array like this:

```
const points = [1, 4, 6, 3]

const copy = [...points]
// increment the value in position 2 by one
copy[2] += 1      
```

Using an array might be the simpler choice in this case. Searching the Internet will provide you with lots of hints on how to [create a zero-filled array of the desired length](https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781).

### 1.14*: Anecdotes, step3

Now implement the final version of the application that displays the anecdote with the largest number of votes:

![plot](./exercises-media/20a.png)

If multiple anecdotes are tied for first place it is sufficient to just show one of them.

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your finished exercises to the "my submissions" tab of the [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).


