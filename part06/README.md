# Full Stack Open - Part 6 - Advanced state management - Exercises


## Exercises 6.1.-6.2.

Let's make a simplified version of the unicafe exercise from part 1. Let's handle the state management with Redux.

You can take the project from this repository https://github.com/fullstack-hy2020/unicafe-redux for the base of your project.

Start by removing the git configuration of the cloned repository, and by installing dependencies

```
cd unicafe-redux   // go to the directory of cloned repository
rm -rf .git
npm install
```

### 6.1: unicafe revisited, step1

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

Implement the reducer and its tests.

In the tests, make sure that the reducer is an immutable function with the deep-freeze library. Ensure that the provided first test passes, because Redux expects that the reducer returns a sensible original state when it is called so that the first parameter state, which represents the previous state, is undefined.

Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality that they are testing.

A good model for the reducer is the redux-notes example above.

### 6.2: unicafe revisited, step2

Now implement the actual functionality of the application.

Your application can have a modest appearance, nothing else is needed but buttons and the number of reviews for each type:

![plot](./exercises-data/50e.png)


## Exercises 6.3.-6.8.

Let's make a new version of the anecdote voting application from part 1. Take the project from this repository https://github.com/fullstack-hy2020/redux-anecdotes to base your solution on.

If you clone the project into an existing git repository, remove the git configuration of the cloned application:

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

### 6.3: anecdotes, step1

Implement the functionality for voting anecdotes. The number of votes must be saved to a Redux store.

### 6.4: anecdotes, step2

Implement the functionality for adding new anecdotes.

You can keep the form uncontrolled like we did earlier.

### 6.5: anecdotes, step3

Make sure that the anecdotes are ordered by the number of votes.

### 6.6: anecdotes, step4

If you haven't done so already, separate the creation of action-objects to action creator-functions and place them in the src/reducers/anecdoteReducer.js file, so do what we have been doing since the chapter action creators.

### 6.7: anecdotes, step5

Separate the creation of new anecdotes into a component called AnecdoteForm. Move all logic for creating a new anecdote into this new component.

### 6.8: anecdotes, step6

Separate the rendering of the anecdote list into a component called AnecdoteList. Move all logic related to voting for an anecdote to this new component.

Now the App component should look like this:

![plot](./exercises-data/3a.png)

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

### 6.9 Better anecdotes, step7

Implement filtering for the anecdotes that are displayed to the user.

![plot](./exercises-data/9a.png)

Store the state of the filter in the redux store. It is recommended to create a new reducer, action creators, and a combined reducer for the store using the combineReducers function.

Create a new Filter component for displaying the filter. You can use the following code as a template for the component:

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


## Exercises 6.10.-6.13.

Let's continue working on the anecdote application using Redux that we started in exercise 6.3.

### 6.10 Better anecdotes, step8

Install Redux Toolkit for the project. Move the Redux store creation into the file store.js and use Redux Toolkit's configureStore to create the store.

Change the definition of the filter reducer and action creators to use the Redux Toolkit's createSlice function.

Also, start using Redux DevTools to debug the application's state easier.

### 6.11 Better anecdotes, step9

Change also the definition of the anecdote reducer and action creators to use the Redux Toolkit's createSlice function.

### 6.12 Better anecdotes, step10

The application has a ready-made body for the Notification component:

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

You will have to make changes to the application's existing reducer. Create a separate reducer for the new functionality by using the Redux Toolkit's createSlice function.

The application does not have to use the Notification component intelligently at this point in the exercises. It is enough for the application to display the initial value set for the message in the notificationReducer.

### 6.13 Better anecdotes, step11

Extend the application so that it uses the Notification component to display a message for five seconds when the user votes for an anecdote or creates a new anecdote:

![plot](./exercises-data/8a.png)

It's recommended to create separate action creators for setting and removing notifications.


## Exercises 6.14.-6.15.

### 6.14 Anecdotes and the backend, step1

When the application launches, fetch the anecdotes from the backend implemented using json-server.

As the initial backend data, you can use, e.g. this.

### 6.15 Anecdotes and the backend, step2

Modify the creation of new anecdotes, so that the anecdotes are stored in the backend.


## Exercises 6.16.-6.19.

### 6.16 Anecdotes and the backend, step3

Modify the initialization of the Redux store to happen using asynchronous action creators, which are made possible by the Redux Thunk library.

### 6.17 Anecdotes and the backend, step4

Also modify the creation of a new anecdote to happen using asynchronous action creators, made possible by the Redux Thunk library.

### 6.18 Anecdotes and the backend, step5

Voting does not yet save changes to the backend. Fix the situation with the help of the Redux Thunk library.

### 6.19 Anecdotes and the backend, step6

The creation of notifications is still a bit tedious since one has to do two actions and use the setTimeout function:

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


## Exercises 6.20.-6.22.

Now let's make a new version of the anecdote application that uses the React Query library. Take this project as your starting point. The project has a ready-installed JSON Server, the operation of which has been slightly modified. Start the server with npm run server.

### Exercise 6.20

Implement retrieving anecdotes from the server using React Query.

The application should work in such a way that if there are problems communicating with the server, only an error page will be displayed:

![plot](./exercises-data/65e.png)

You can find here info how to detect the possible errors.

You can simulate a problem with the server by e.g. turning off the JSON Server. Please note that in a problem situation, the query is first in the state isLoading for a while, because if a request fails, React Query tries the request a few times before it states that the request is not successful. You can optionally specify that no retries are made:

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

### Exercise 6.21

Implement adding new anecdotes to the server using React Query. The application should render a new anecdote by default. Note that the content of the anecdote must be at least 5 characters long, otherwise the server will reject the POST request. You don't have to worry about error handling now.

### Exercise 6.22

Implement voting for anecdotes using again the React Query. The application should automatically render the increased number of votes for the voted anecdote.


## Exercises 6.23.-6.24.

### Exercise 6.23.

The application has a Notification component for displaying notifications to the user.

Implement the application's notification state management using the useReducer hook and context. The notification should tell the user when a new anecdote is created or an anecdote is voted on:

![plot](./exercises-data/66e.png)

The notification is displayed for five seconds.

### Exercise 6.24.

As stated in exercise 6.21, the server requires that the content of the anecdote to be added is at least 5 characters long. Now implement error handling for the insertion. In practice, it is sufficient to display a notification to the user in case of a failed POST request:

![plot](./exercises-data/67e.png)

The error condition should be handled in the callback function registered for it, see here how to register a function.

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your completed exercises to the exercise submission system.


## Exercises 6.19.-6.21 (the old part)

NOTE: this is the old ending section of the 6 part that has 30th January 2023 been replaced with material about React Query, useReducer and context. This section remains here for a couple of weeks.

If you have started with the exercises that use the Redux connect you may continue with those. If you have not yet started, I recommend to proceed with the new section.

### 6.19 anecdotes and connect, step1

The redux store is currently being accessed by the components through the useSelector and useDispatch hooks.

Modify the Notification component so that it uses the connect function instead of the hooks.

### 6.20 anecdotes and connect, step2

Do the same for the Filter and AnecdoteForm components.

### 6.21 anecdotes, the grand finale

You (probably) have one nasty bug in your application. If the user clicks the vote button multiple times in a row, the notification is displayed funnily. For example, if a user votes twice in three seconds, the last notification is only displayed for two seconds (assuming the notification is normally shown for 5 seconds). This happens because removing the first notification accidentally removes the second notification.

Fix the bug so that after multiple votes in a row, the notification for the last vote is displayed for five seconds.

The fix can be done by canceling the previous notification when a new notification is displayed, whenever necessary. The documentation for the setTimeout function might also be useful for this.

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your completed exercises to the exercise submission system.

