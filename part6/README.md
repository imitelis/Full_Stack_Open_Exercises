# Full Stack Open - Part 6 - Advanced state management - Exercises


## Exercises 6.1-6.2

Let's make a simplified version of the unicafe exercise from Part 1. Let's handle the state management with Redux.

You can take the project from this repository [https://github.com/fullstack-hy2020/unicafe-redux](https://github.com/fullstack-hy2020/unicafe-redux) for the base of your project.

<em>Start by removing the git configuration of the cloned repository, and by installing dependencies</em>

```
cd unicafe-redux   // go to the directory of cloned repository
rm -rf .git
npm install
```

### 6.1: Unicafe revisited, step1

Before implementing the functionality of the UI, let's implement the functionality required by the store.

We have to save the number of each kind of feedback to the store, so the form of the state in the store is:

```
{
  good: 5,
  ok: 4,
  bad: 2
}
```

The project has the following base for a reducer:

```
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return state
    case 'OK':
      return state
    case 'BAD':
      return state
    case 'ZERO':
      return state
    default: return state
  }

}

export default counterReducer
```

and a base for its tests

```
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
})
```

**Implement the reducer and its tests.**

In the tests, make sure that the reducer is an <em>immutable function</em> with the <em>deep-freeze</em> library. Ensure that the provided first test passes, because Redux expects that the reducer returns a sensible original state when it is called so that the first parameter <em>state</em>, which represents the previous state, is <em>undefined</em>.

Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality that they are testing.

A good model for the reducer is the [redux-notes](https://fullstackopen.com/en/part6/flux_architecture_and_redux#pure-functions-immutable) example above.

### 6.2: Unicafe revisited, step2

Now implement the actual functionality of the application.

Your application can have a modest appearance, nothing else is needed but buttons and the number of reviews for each type:

![plot](./exercises-media/50e.png)


## Exercises 6.3.-6.8.

Let's make a new version of the anecdote voting application from Part 1. Take the project from this repository [https://github.com/fullstack-hy2020/redux-anecdotes](https://github.com/fullstack-hy2020/redux-anecdotes) to base your solution on.

If you clone the project into an existing git repository, <em>remove the git configuration of the cloned application:</em>

```
cd redux-anecdotes  // go to the cloned repository
rm -rf .git
```

The application can be started as usual, but you have to install the dependencies first:

```
npm install
npm start
```

After completing these exercises, your application should look like this:
browser showing anecdotes and vote buttons

### 6.3: Anecdotes, step1

Implement the functionality for voting anecdotes. The number of votes must be saved to a Redux store.

### 6.4: Anecdotes, step2

Implement the functionality for adding new anecdotes.

You can keep the form uncontrolled like we did [earlier](https://fullstackopen.com/en/part6/flux_architecture_and_redux#uncontrolled-form).

### 6.5: Anecdotes, step3

Make sure that the anecdotes are ordered by the number of votes.

### 6.6: Anecdotes, step4

If you haven't done so already, separate the creation of action-objects to [action creator](https://read.reduxbook.com/markdown/part1/04-action-creators.html)-functions and place them in the src/reducers/anecdoteReducer.js file, so do what we have been doing since the chapter [action creators](https://fullstackopen.com/en/part6/flux_architecture_and_redux#action-creators).

### 6.7: Anecdotes, step5

Separate the creation of new anecdotes into a component called <em>AnecdoteForm</em>. Move all logic for creating a new anecdote into this new component.

### 6.8: Anecdotes, step6

Separate the rendering of the anecdote list into a component called <em>AnecdoteList</em>. Move all logic related to voting for an anecdote to this new component.

Now the <em>App</em> component should look like this:

![plot](./exercises-media/3a.png)

```
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
```


## Exercise 6.9

### 6.9: Better anecdotes, step7

Implement filtering for the anecdotes that are displayed to the user.

![plot](./exercises-media/9a.png)

Store the state of the filter in the redux store. It is recommended to create a new reducer, action creators, and a combined reducer for the store using the <em>combineReducers</em> function.

Create a new <em>Filter</em> component for displaying the filter. You can use the following code as a template for the component:

```
const Filter = () => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
```


## Exercises 6.10-6.13

Let's continue working on the anecdote application using Redux that we started in exercise 6.3.

### 6.10: Better anecdotes, step8

Install Redux Toolkit for the project. Move the Redux store creation into the file <em>store.js</em> and use Redux Toolkit's `configureStore` to create the store.

Change the definition of the <em>filter reducer</em> and <em>action creators</em> to use the Redux Toolkit's `createSlice` function.

Also, start using Redux DevTools to debug the application's state easier.

### 6.11: Better anecdotes, step9

Change also the definition of the <em>anecdote reducer</em> and <em>action creators</em> to use the Redux Toolkit's `createSlice` function.

### 6.12: Better anecdotes, step10

The application has a ready-made body for the <em>Notification</em> component:

```
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...
    </div>
  )
}

export default Notification
```

Extend the component so that it renders the message stored in the Redux store, making the component take the following form:

```
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(/* something here */)  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}    </div>
  )
}
```

You will have to make changes to the application's existing reducer. Create a separate reducer for the new functionality by using the Redux Toolkit's `createSlice` function.

The application does not have to use the <em>Notification</em> component intelligently at this point in the exercises. It is enough for the application to display the initial value set for the message in the <em>notificationReducer</em>.

### 6.13: Better anecdotes, step11

Extend the application so that it uses the <em>Notification</em> component to display a message for five seconds when the user votes for an anecdote or creates a new anecdote:

![plot](./exercises-media/8a.png)

It's recommended to create separate [action creators](https://redux-toolkit.js.org/api/createSlice#reducers) for setting and removing notifications.


## Exercises 6.14-6.15

### 6.14: Anecdotes and the backend, step1

When the application launches, fetch the anecdotes from the backend implemented using json-server.

As the initial backend data, you can use, e.g. [this](https://github.com/fullstack-hy2020/misc/blob/master/anecdotes.json).

### 6.15: Anecdotes and the backend, step2

Modify the creation of new anecdotes, so that the anecdotes are stored in the backend.


## Exercises 6.16-6.19

### 6.16: Anecdotes and the backend, step3

Modify the initialization of the Redux store to happen using asynchronous action creators, which are made possible by the Redux Thunk library.

### 6.17: Anecdotes and the backend, step4

Also modify the creation of a new anecdote to happen using asynchronous action creators, made possible by the Redux Thunk library.

### 6.18: Anecdotes and the backend, step5

Voting does not yet save changes to the backend. Fix the situation with the help of the Redux Thunk library.

### 6.19: Anecdotes and the backend, step6

The creation of notifications is still a bit tedious since one has to do two actions and use the `setTimeout` function:

```
dispatch(setNotification(`new anecdote '${content}'`))
setTimeout(() => {
  dispatch(clearNotification())
}, 5000)
```

Make an action creator, which enables one to provide the notification as follows:

```
dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
```

The first parameter is the text to be rendered and the second parameter is the time to display the notification given in seconds.

Implement the use of this improved notification in your application.


## Exercises 6.20-6.22

Now let's make a new version of the anecdote application that uses the React Query library. Take this [project](https://github.com/fullstack-hy2020/query-anecdotes) as your starting point. The project has a ready-installed JSON Server, the operation of which has been slightly modified. Start the server with <em>npm run server</em>.

### 6.20: Anecdotes and React Query, step1

Implement retrieving anecdotes from the server using React Query.

The application should work in such a way that if there are problems communicating with the server, only an error page will be displayed:

![plot](./exercises-media/65e.png)

You can find [here](https://tanstack.com/query/latest/docs/react/guides/queries) info how to detect the possible errors.

You can simulate a problem with the server by e.g. turning off the JSON Server. Please note that in a problem situation, the query is first in the state <em>isLoading</em> for a while, because if a request fails, React Query tries the request a few times before it states that the request is not successful. You can optionally specify that no retries are made:

```
const result = useQuery(
  'anecdotes', getAnecdotes, 
  {
    retry: false
  }
)
```

or that the request is retried e.g. only once:

```
const result = useQuery(
  'anecdotes', getAnecdotes, 
  {
    retry: 1
  }
)
```

### 6.21: Anecdotes and React Query, step2

Implement adding new anecdotes to the server using React Query. The application should render a new anecdote by default. Note that the content of the anecdote must be at least 5 characters long, otherwise the server will reject the POST request. You don't have to worry about error handling now.

### 6.22: Anecdotes and React Query, step3

Implement voting for anecdotes using again the React Query. The application should automatically render the increased number of votes for the voted anecdote.


## Exercises 6.23-6.24

### 6.23: Anecdotes and React Query, step4

The application has a <em>Notification</em> component for displaying notifications to the user.

Implement the application's notification state management using the useReducer hook and context. The notification should tell the user when a new anecdote is created or an anecdote is voted on:

![plot](./exercises-media/66e.png)

The notification is displayed for five seconds.

### 6.24: Anecdotes and React Query, step5

As stated in exercise 6.21, the server requires that the content of the anecdote to be added is at least 5 characters long. Now implement error handling for the insertion. In practice, it is sufficient to display a notification to the user in case of a failed POST request:

![plot](./exercises-media/67e.png)

The error condition should be handled in the callback function registered for it, see [here](https://tanstack.com/query/latest/docs/react/reference/useMutation) how to register a function.

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your completed exercises to the exercise [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).


## Exercises 6.19-6.21 (the old part)

**NOTE:** This is the old ending section of the Part 6 that has 30th January 2023 been replaced with material about [React Query, useReducer and context](https://fullstackopen.com/en/part6/react_query_use_reducer_and_the_context). This section remains here for a couple of weeks.

If you have started with the exercises that use the Redux connect you may continue with those. If you have not yet started, I recommend to proceed with the new section.

### 6.19: Anecdotes and connect, step1

The redux store is currently being accessed by the components through the `useSelector` and `useDispatch` hooks.

Modify the <em>Notification</em> component so that it uses the `connect` function instead of the hooks.

### 6.20: Anecdotes and connect, step2

Do the same for the <em>Filter</em> and <em>AnecdoteForm</em> components.

### 6.21: Anecdotes, the grand finale

You (probably) have one nasty bug in your application. If the user clicks the vote button multiple times in a row, the notification is displayed funnily. For example, if a user votes twice in three seconds, the last notification is only displayed for two seconds (assuming the notification is normally shown for 5 seconds). This happens because removing the first notification accidentally removes the second notification.

Fix the bug so that after multiple votes in a row, the notification for the last vote is displayed for five seconds.

The fix can be done by canceling the previous notification when a new notification is displayed, whenever necessary. The [documentation](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) for the setTimeout function might also be useful for this.

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your completed exercises to the exercise [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).


