# Full Stack Open - Part 10 - React Native - Exercises


## Exercise 10.1.

### 10.1: Initializing the application

Initialize your application with Expo command-line interface and set up the development environment either using an emulator or Expo's mobile app. It is recommended to try both and find out which development environment is the most suitable for you. The name of the application is not that relevant. You can, for example, go with <em>rate-repository-app</em>.

To submit this exercise and all future exercises you need to create a [new GitHub repository](https://github.com/new). The name of the repository can be for example the name of the application you initialized with `expo init`. If you decide to create a private repository, add GitHub user [mluukkai](https://github.com/mluukkai) as a [repository collaborator](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository). The collaborator status is only used for verifying your submissions.

Now that the repository is created, run `git init` within your application's root directory to make sure that the directory is initialized as a Git repository. Next, to add the created repository as the remote run `git remote add origin git@github.com:<YOURGITHUBUSERNAME>/<NAMEOFYOUR_REPOSITORY>.git` (remember to replace the placeholder values in the command). Finally, just commit and push your changes into the repository and you are all done.


## Exercise 10.2.

### 10.2: Setting up the ESLint

Set up ESLint in your project so that you can perform linter checks by running `npm run lint`. To get most of linting it is also recommended to integrate ESLint with your editor.

This was the last exercise in this section. It's time to push your code to GitHub and mark all of your finished exercises to the exercise [submission system](https://studies.cs.helsinki.fi/stats/courses/fs-react-native-2020). Note that exercises in this section should be submitted to Part 1 in the exercise submission system.


## Exercise 10.3.

### 10.3: The reviewed repositories list

In this exercise, we will implement the first version of the reviewed repositories list. The list should contain the repository's full name, description, language, number of forks, number of stars, rating average and number of reviews. Luckily React Native provides a handy component for displaying a list of data, which is the [FlatList](https://reactnative.dev/docs/flatlist) component.

Implement components `RepositoryList` and `RepositoryItem` in the <em>components</em> directory's files <em>RepositoryList.jsx</em> and <em>RepositoryItem.jsx</em>. The `RepositoryList` component should render the `FlatList` component and `RepositoryItem` a single item on the list (hint: use the `FlatList` component's [renderItem](https://reactnative.dev/docs/flatlist#required-renderitem) prop). Use this as the basis for the <em>RepositoryList.jsx</em> file:

```
import { FlatList, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      // other props
    />
  );
};

export default RepositoryList;
```

<em>Do not</em> alter the contents of the `repositories` variable, it should contain everything you need to complete this exercise. Render the `RepositoryList` component in the `Main` component which we previously added to the <em>Main.jsx</em> file. The reviewed repository list should roughly look something like this:

![plot](./exercises-media/5a.jpg)


## Exercises 10.4.-10.5.

### 10.4: The app bar

We will soon need to navigate between different views in our application. That is why we need an [app bar](https://material.io/components/app-bars-top/) to display tabs for switching between different views. Create a file <em>AppBar.jsx</em> in the <em>components</em> folder with the following content:

```
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // ...
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>{/* ... */}</View>;
};

export default AppBar;
```

Now that the `AppBar` component will prevent the status bar from overlapping the content, you can remove the `marginTop` style we added for the `Main` component earlier in the <em>Main.jsx</em> file. The `AppBar` component should currently contain a tab with the text "`Repositories`". Make the tab pressable by using the [Pressable](https://reactnative.dev/docs/pressable) component but you don't have to handle the `onPress` event in any way. Add the `AppBar` component to the `Main` component so that it is the uppermost component on the screen. The `AppBar` component should look something like this:

![plot](./exercises-media/6a.jpg)

The background color of the app bar in the image is `#24292e` but you can use any other color as well. It might be a good idea to add the app bar's background color into the theme configuration so that it is easy to change it if needed. Another good idea might be to separate the app bar's tab into a component like `AppBarTab` so that it is easy to add new tabs in the future.

### 10.5: Polished reviewed repositories list

The current version of the reviewed repositories list looks quite grim. Modify the <em>RepositoryItem</em> component so that it also displays the repository author's avatar image. You can implement this by using the [Image](https://reactnative.dev/docs/image) component. Counts, such as the number of stars and forks, larger than or equal to 1000 should be displayed in thousands with the precision of one decimal and with a "k" suffix. This means that for example fork count of 8439 should be displayed as "8.4k". Also, polish the overall look of the component so that the reviewed repositories list looks something like this:

![plot](./exercises-media/7a.jpg)

In the image, the `Main` component's background color is set to `#e1e4e8` whereas `RepositoryItem` component's background color is set to `white`. The language tag's background color is `#0366d6` which is the value of the `colors.primary` variable in the theme configuration. Remember to exploit the `Text` component we implemented earlier. Also when needed, split the `RepositoryItem` component into smaller components.


## Exercises 10.6.-10.7.

### 10.6: The sign-in view

We will soon implement a form, that a user can use to <em>sign in</em> to our application. Before that, we must implement a view that can be accessed from the app bar. Create a file <em>SignIn.jsx</em> in the <em>components</em> directory with the following content:

```
import Text from './Text';

const SignIn = () => {
  return <Text>The sign-in view</Text>;
};

export default SignIn;
```

Set up a route for this `SignIn` component in the `Main` component. Also, add a tab with the text "Sign in" to the app bar next to the "Repositories" tab. Users should be able to navigate between the two views by pressing the tabs (hint: you can use the React router's [Link](https://reactrouter.com/en/6.4.5/components/link-native) component).

### 10.7: Scrollable app bar

As we are adding more tabs to our app bar, it is a good idea to allow horizontal scrolling once the tabs won't fit the screen. The [ScrollView](https://reactnative.dev/docs/scrollview) component is just the right component for the job.

Wrap the tabs in the `AppBar` component's tabs with a `ScrollView` component:

```
const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>{/* ... */}</ScrollView>    </View>
  );
};
```

Setting the [horizontal](https://reactnative.dev/docs/scrollview#horizontal) prop `true` will cause the `ScrollView` component to scroll horizontally once the content won't fit the screen. Note that, you will need to add suitable style properties to the `ScrollView` component so that the tabs will be laid in a <em>row</em> inside the flex container. You can make sure that the app bar can be scrolled horizontally by adding tabs until the last tab won't fit the screen. Just remember to remove the extra tabs once the app bar is working as intended.


## Exercise 10.8.

### 10.8: The sign-in form

Implement a sign-in form to the `SignIn` component we added earlier in the <em>SignIn.jsx</em> file. The sign-in form should include two text fields, one for the username and one for the password. There should also be a button for submitting the form. You don't need to implement an `onSubmit` callback function, it is enough that the form values are logged using `console.log` when the form is submitted:

```
const onSubmit = (values) => {
  console.log(values);
};
```

Remember to utilize the `FormikTextInput` component we implemented earlier. You can use the secureTextEntry prop in the `TextInput` component to obscure the password input.

The sign-in form should look something like this:

![plot](./exercises-media/7b.jpg)


## Exercise 10.9.

### 10.9: Validating the sign-in form

Validate the sign-in form so that both username and password fields are required. Note that the `onSubmit` callback implemented in the previous exercise, <em>should not be called</em> if the form validation fails.

The current implementation of the `FormikTextInput` component should display an error message if a touched field has an error. Emphasize this error message by giving it a red color.

On top of the red error message, give an invalid field a visual indication of an error by giving it a red border color. Remember that if a field has an error, the `FormikTextInput` component sets the `TextInput` component's `error` prop as `true`. You can use the value of the error prop to attach conditional styles to the `TextInput` component.

Here's what the sign-in form should roughly look like with an invalid field:

![plot](./exercises-media/8a.jpg)

The red color used in this implementation is `#d73a4a`.


## Exercise 10.10.

### 10.10: A platform-specific font

Currently, the font family of our application is set to <em>System</em> in the theme configuration located in the <em>theme.js</em> file. Instead of the <em>System</em> font, use a platform-specific [Sans-serif](https://en.wikipedia.org/wiki/Sans-serif) font. On the Android platform, use the <em>Roboto</em> font and on the iOS platform, use the <em>Arial</em> font. The default font can be <em>System</em>.

This was the last exercise in this section. It's time to push your code to GitHub and mark all of your finished exercises to the exercise [submission system](https://studies.cs.helsinki.fi/stats/courses/fs-react-native-2020). Note that exercises in this section should be submitted to the section named Part 2 in the exercise submission system.


## Exercise 10.11.

### 10.11: Fetching repositories with Apollo Client

We want to replace the Fetch API implementation in the `useRepositories` hook with a GraphQL query. Open the Apollo Sandbox at [http://localhost:4000](localhost:4000) and take a look at the documentation next to the operations editor. Look up the `repositories` query. The query has some arguments, however, all of these are optional so you don't need to specify them. In the Apollo Sandbox form a query for fetching the repositories with the fields you are currently displaying in the application. The result will be paginated and it contains the up to first 30 results by default. For now, you can ignore the pagination entirely.

Once the query is working in the Apollo Sandbox, use it to replace the Fetch API implementation in the `useRepositories` hook. This can be achieved using the [useQuery](https://www.apollographql.com/docs/react/api/react/hooks/#usequery) hook. The `gql` template literal tag can be imported from the <em>@apollo/client</em> library as instructed earlier. Consider using the structure recommended earlier for the GraphQL related code. To avoid future caching issues, use the `cache-and-network` [fetch policy](https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy) in the query. It can be used with the `useQuery` hook like this:

```
useQuery(MY_QUERY, {
  fetchPolicy: 'cache-and-network',
  // Other options
});
```

The changes in the `useRepositories` hook should not affect the `RepositoryList` component in any way.


## Exercise 10.12.

### 10.12: Environment variables

Instead of the hardcoded Apollo Server's URL, use an environment variable defined in the <em>.env</em> file when initializing the Apollo Client. You can name the environment variable for example `APOLLO_URI`.

<em>Do not</em> try to access environment variables like `process.env.APOLLO_URI` outside the <em>app.config.js</em> file. Instead use the `Constants.manifest.extra` object like in the previous example. In addition, do not import the dotenv library outside the <em>app.config.js</em> file or you will most likely face errors.


## Exercises 10.13.-10.14.

### 10.13: the sign in form mutation

The current implementation of the sign in form doesn't do much with the submitted user's credentials. Let's do something about that in this exercise. First, read the rate-repository-api server's [authentication documentation](https://github.com/fullstack-hy2020/rate-repository-api#-authentication) and test the provided queries and mutations in the Apollo Sandbox. If the database doesn't have any users, you can populate the database with some seed data. Instructions for this can be found in the [getting started](https://github.com/fullstack-hy2020/rate-repository-api#-getting-started) section of the README.

Once you have figured out how the authentication works, create a file `useSignIn.js` file in the <em>hooks</em> directory. In that file implement a `useSignIn` hook that sends the `authenticate` mutation using the [useMutation](https://www.apollographql.com/docs/react/api/react/hooks/#usemutation) hook. Note that the `authenticate` mutation has a single argument called `credentials`, which is of type `AuthenticateInput`. This [input type](https://graphql.org/graphql-js/mutations-and-input-types) contains `username` and `password` fields.

The return value of the hook should be a tuple `[signIn, result]` where `result` is the mutations result as it is returned by the `useMutation` hook and `signIn` a function that runs the mutation with a `{ username, password }` object argument. Hint: don't pass the mutation function to the return value directly. Instead, return a function that calls the mutation function like this:

```
const useSignIn = () => {
  const [mutate, result] = useMutation(/* mutation arguments */);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
  };

  return [signIn, result];
};
```

Once the hook is implemented, use it in the `SignIn` component's `onSubmit` callback for example like this:

```
const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  // ...
};
```

This exercise is completed once you can log the user's <em>authenticate</em> mutations result after the sign in form has been submitted. The mutation result should contain the user's access token.

### 10.14: Storing the access token step1

Now that we can obtain the access token we need to store it. Create a file <em>authStorage.js</em> in the <em>utils</em> directory with the following content:

```
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    // Get the access token for the storage
  }

  setAccessToken(accessToken) {
    // Add the access token to the storage
  }

  removeAccessToken() {
    // Remove the access token from the storage
  }
}

export default AuthStorage;
```

Next, implement the methods `AuthStorage.getAccessToken`, `AuthStorage.setAccessToken` and `AuthStorage.removeAccessToken`. Use the `namespace` variable to give your keys a namespace like we did in the previous example.


## Exercises 10.15.-10.16.

### 10.15: Storing the access token step2

Improve the `useSignIn` hook so that it stores the user's access token retrieved from the <em>authenticate</em> mutation. The return value of the hook should not change. The only change you should make to the `SignIn` component is that you should redirect the user to the reviewed repositories list view after a successful sign in. You can achieve this by using the [useNavigate](https://reactrouter.com/en/6.14.2/hooks/use-navigate) hook.

After the <em>authenticate</em> mutation has been executed and you have stored the user's access token to the storage, you should reset the Apollo Client's store. This will clear the Apollo Client's cache and re-execute all active queries. You can do this by using the Apollo Client's [resetStore](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.resetStore) method. You can access the Apollo Client in the `useSignIn` hook using the [useApolloClient](https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient) hook. Note that the order of the execution is crucial and should be the following:

```
const { data } = await mutate(/* options */);
await authStorage.setAccessToken(/* access token from the data */);
apolloClient.resetStore();
```

### 10.16: Sign out

The final step in completing the sign in feature is to implement a sign out feature. The `me` query can be used to check the authenticated user's information. If the query's result is `null`, that means that the user is not authenticated. Open the Apollo Sandbox and run the following query:

```
{
  me {
    id
    username
  }
}
```

You will probably end up with the `null` result. This is because the Apollo Sandbox is not authenticated, meaning that it doesn't send a valid access token with the request. Revise the [authentication documentation](https://github.com/fullstack-hy2020/rate-repository-api#-authentication) and retrieve an access token using the `authenticate` mutation. Use this access token in the Authorization header as instructed in the documentation. Now, run the `me` query again and you should be able to see the authenticated user's information.

Open the `AppBar` component in the <em>AppBar.jsx</em> file where you currently have the tabs "Repositories" and "Sign in". Change the tabs so that if the user is signed in the tab "Sign out" is displayed, otherwise show the "Sign in" tab. You can achieve this by using the `me` query with the [useQuery](https://www.apollographql.com/docs/react/api/react/hooks/#usequery) hook.

Pressing the "Sign out" tab should remove the user's access token from the storage and reset the Apollo Client's store with the [resetStore](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.resetStore) method. Calling the `resetStore` method should automatically re-execute all active queries which means that the `me` query should be re-executed. Note that the order of execution is crucial: access token must be removed from the storage <em>before</em> the Apollo Client's store is reset.

This was the last exercise in this section. It's time to push your code to GitHub and mark all of your finished exercises to the exercise [submission system](https://github.com/fullstack-hy2020/misc/blob/master/library-backend.js). Note that exercises in this section should be submitted to the Part 3 in the exercise submission system.


## Exercises 10.17.-10.18.

### 10.17: Testing the reviewed repositories list

Implement a test that ensures that the `RepositoryListContainer` component renders repository's name, description, language, forks count, stargazers count, rating average, and review count correctly. One approach in implementing this test is to add a [testID](https://reactnative.dev/docs/view#testid) prop for the element wrapping a single repository's information:

```
const RepositoryItem = (/* ... */) => {
  // ...

  return (
    <View testID="repositoryItem" {/* ... */}>
      {/* ... */}
    </View>
  )
};
```

Once the `testID` prop is added, you can use the [getAllByTestId](https://callstack.github.io/react-native-testing-library/docs/api-queries#getallby) query to get those elements:

```
const repositoryItems = screen.getAllByTestId('repositoryItem');
const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

// expect something from the first and the second repository item
```

Having those elements you can use the [toHaveTextContent](https://github.com/testing-library/jest-native#tohavetextcontent) matcher to check whether an element has certain textual content. You might also find the [Querying Within Elements](https://testing-library.com/docs/dom-testing-library/api-within/) guide useful. If you are unsure what is being rendered, use the [debug](https://callstack.github.io/react-native-testing-library/docs/api#debug) function to see the serialized rendering result.

Use this as a base for your test:

```
describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
    });
  });
});
```

You can put the test file where you please. However, it is recommended to follow one of the ways of organizing test files introduced earlier. Use the `repositories` variable as the repository data for the test. There should be no need to alter the variable's value. Note that the repository data contains two repositories, which means that you need to check that both repositories' information is present.

### 10.18: Testing the sign in form

Implement a test that ensures that filling the sign in form's username and password fields and pressing the submit button <em>will call</em> the `onSubmit` handler with <em>correct arguments</em>. The <em>first argument</em> of the handler should be an object representing the form's values. You can ignore the other arguments of the function. Remember that the [fireEvent](https://callstack.github.io/react-native-testing-library/docs/api#fireevent) methods can be used for triggering events and a [mock function](https://jestjs.io/docs/mock-function-api) for checking whether the `onSubmit` handler is called or not.

You don't have to test any Apollo Client or AsyncStorage related code which is in the `useSignIn` hook. As in the previous exercise, extract the pure code into its own component and test it in the test.

Note that Formik's form submissions are <em>asynchronous</em> so expecting the `onSubmit` function to be called immediately after pressing the submit button won't work. You can get around this issue by making the test function an async function using the `async` keyword and using the React Native Testing Library's [waitFor](https://callstack.github.io/react-native-testing-library/docs/api#waitfor) helper function. The `waitFor` function can be used to wait for expectations to pass. If the expectations don't pass within a certain period, the function will throw an error. Here is a rough example of how to use it:

```
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});
```

## Exercises 10.19.-10.26.

### 10.19: The single repository view

Implement a view for a single repository, which contains the same repository information as in the reviewed repositories list but also a button for opening the repository in GitHub. It would be a good idea to reuse the `RepositoryItem` component used in the `RepositoryList` component and display the GitHub repository button for example based on a boolean prop.

The repository's URL is in the `url` field of the `Repository` type in the GraphQL schema. You can fetch a single repository from the Apollo server with the `repository` query. The query has a single argument, which is the id of the repository. Here's a simple example of the `repository` query:

```
{
  repository(id: "jaredpalmer.formik") {
    id
    fullName
    url
  }
}
```

As always, test your queries in the Apollo Sandbox first before using them in your application. If you are unsure about the GraphQL schema or what are the available queries, take a look at the documentation next to the operations editor. If you have trouble using the id as a variable in the query, take a moment to study the Apollo Client's [documentation](https://www.apollographql.com/docs/react/data/queries/) on queries.

To learn how to open a URL in a browser, read the Expo's [Linking API documentation](https://docs.expo.dev/versions/latest/sdk/linking/). You will need this feature while implementing the button for opening the repository in GitHub. Hint: [Linking.openURL](https://docs.expo.dev/versions/latest/sdk/linking/#linkingopenurlurl) method will come in handy.

The view should have its own route. It would be a good idea to define the repository's id in the route's path as a path parameter, which you can access by using the [useParams](https://reactrouter.com/en/6.14.2/hooks/use-params) hook. The user should be able to access the view by pressing a repository in the reviewed repositories list. You can achieve this by for example wrapping the `RepositoryItem` with a [Pressable](https://reactnative.dev/docs/pressable) component in the `RepositoryList` component and using `navigate` function to change the route in an `onPress` event handler. You can access the `navigate` function with the [useNavigate](https://reactrouter.com/en/6.14.2/hooks/use-navigate) hook.

The final version of the single repository view should look something like this:

![plot](./exercises-media/13a.jpg)

**Note:** If the peer depencendy issues prevent installing the library, try the `--legacy-peer-deps` option:

```
npm install expo-linking --legacy-peer-deps
```

### 10.20: Repository's review list

Now that we have a view for a single repository, let's display repository's reviews there. Repository's reviews are in the `reviews` field of the `Repository` type in the GraphQL schema. `reviews` is a similar paginated list as in the `repositories` query. Here's an example of getting reviews of a repository:

```
{
  repository(id: "jaredpalmer.formik") {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
```

Review's `text` field contains the textual review, `rating` field a numeric rating between 0 and 100, and `createdAt` the date when the review was created. Review's `user` field contains the reviewer's information, which is of type `User`.

We want to display reviews as a scrollable list, which makes [FlatList](https://reactnative.dev/docs/flatlist) a suitable component for the job. To display the previous exercise's repository's information at the top of the list, you can use the `FlatList` component's [ListHeaderComponent](https://reactnative.dev/docs/flatlist#listheadercomponent) prop. You can use the [ItemSeparatorComponent](https://reactnative.dev/docs/flatlist#itemseparatorcomponent) to add some space between the items like in the `RepositoryList` component. Here's an example of the structure:

```
const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
};

const ReviewItem = ({ review }) => {
  // Single review item
};

const SingleRepository = () => {
  // ...

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      // ...
    />
  );
};

export default SingleRepository;
```

The final version of the repository's reviews list should look something like this:

![plot](./exercises-media/14a.jpg)

The date under the reviewer's username is the creation date of the review, which is in the `createdAt` field of the Review type. The date format should be user-friendly such as <em>date.month.year</em>. You can for example install the [date-fns](https://date-fns.org) library and use the [format](https://date-fns.org/v2.28.0/docs/format) function for formatting the creation date.

The round shape of the rating's container can be achieved with the `borderRadius` style property. You can make it round by fixing the container's `width` and `height` style property and setting the border-radius as `width / 2`.

### 10.21: The review form

Implement a form for creating a review using Formik. The form should have four fields: repository owner's GitHub username (for example "jaredpalmer"), repository's name (for example "formik"), a numeric rating, and a textual review. Validate the fields using Yup schema so that it contains the following validations:

  *  Repository owner's username is a required string
  *  Repository's name is a required string
  *  Rating is a required number between 0 and 100
  *  Review is a optional string

Explore Yup's [documentation](https://github.com/jquense/yup#yup) to find suitable validators. Use sensible error messages with the validators. The validation `message` can be defined as the validator method's message argument. You can make the review field expand to multiple lines by using `TextInput` component's [multiline](https://reactnative.dev/docs/textinput#multiline) prop.

You can create a review using the `createReview` mutation. Check this mutation's arguments in the Apollo Sandbox. You can use the [useMutation](https://www.apollographql.com/docs/react/api/react/hooks/#usemutation) hook to send a mutation to the Apollo Server.

After a successful `createReview` mutation, redirect the user to the repository's view you implemented in the previous exercise. This can be done with the `navigate` function after you have obtained it using the [useNavigate](https://reactrouter.com/en/6.22.3/docs/en/v6/api#usenavigate) hook. The created review has a `repositoryId` field which you can use to construct the route's path.

To prevent getting cached data with the `repository` query in the single repository view, use the `cache-and-network` [fetch policy](https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy) in the query. It can be used with the `useQuery` hook like this:

```
useQuery(GET_REPOSITORY, {
  fetchPolicy: 'cache-and-network',
  // Other options
});
```

Note that only <em>an existing public GitHub repository</em> can be reviewed and a user can review the same repository <em>only once</em>. You don't have to handle these error cases, but the error payload includes specific codes and messages for these errors. You can try out your implementation by reviewing one of your own public repositories or any other public repository.

The review form should be accessible through the app bar. Create a tab to the app bar with a label "Create a review". This tab should only be visible to users who have signed in. You will also need to define a route for the review form.

The final version of the review form should look something like this:

![plot](./exercises-media/15a.jpg)

This screenshot has been taken after invalid form submission to present what the form should look like in an invalid state.

# 10.22: The sign up form

Implement a sign up form for registering a user using Formik. The form should have three fields: username, password, and password confirmation. Validate the form using Yup schema so that it contains the following validations:

  *  Username is a required string with a length between 5 and 30
  *  Password is a required string with a length between 5 and 50
  *  Password confirmation matches the password

The password confirmation field's validation can be a bit tricky, but it can be done for example by using the [oneOf](https://github.com/jquense/yup#schemaoneofarrayofvalues-arrayany-message-string--function-schema-alias-equals) and [ref](https://github.com/jquense/yup#refpath-string-options--contextprefix-string--ref) methods like suggested in this [issue](https://github.com/jaredpalmer/formik/issues/90#issuecomment-354873201).

You can create a new user by using the `createUser` mutation. Find out how this mutation works by exploring the documentation in the Apollo Sandbox. After a successful `createUser` mutation, sign the created user in by using the `useSignIn` hook as we did in the sign in the form. After the user has been signed in, redirect the user to the reviewed repositories list view.

The user should be able to access the sign-up form through the app bar by pressing a "Sign up" tab. This tab should only be visible to users that aren't signed in.

The final version of the sign up form should look something like this:

![plot](./exercises-media/16a.jpg)

This screenshot has been taken after invalid form submission to present what the form should look like in an invalid state.

# 10.23: Sorting the reviewed repositories list

At the moment repositories in the reviewed repositories list are ordered by the date of repository's first review. Implement a feature that allows users to select the principle, which is used to order the repositories. The available ordering principles should be:

  *  Latest repositories. The repository with the latest first review is on the top of the list. This is the current behavior and should be the default principle.
  *  Highest rated repositories. The repository with the <em>highest</em> average rating is on the top of the list.
  *  Lowest rated repositories. The repository with the <em>lowest</em> average rating is on the top of the list.

The `repositories` query used to fetch the reviewed repositories has an argument called `orderBy`, which you can use to define the ordering principle. The argument has two allowed values: CREATED_AT (order by the date of repository's first review) and RATING_AVERAGE, (order by the repository's average rating). The query also has an argument called `orderDirection` which can be used to change the order direction. The argument has two allowed values: `ASC` (ascending, smallest value first) and `DESC` (descending, biggest value first).

The selected ordering principle state can be maintained for example using the React's [useState](https://react.dev/reference/react/useState) hook. The variables used in the `repositories` query can be given to the `useRepositories` hook as an argument.

You can use for example [@react-native-picker/picker library](https://docs.expo.io/versions/latest/sdk/picker/), or [React Native Paper](https://callstack.github.io/react-native-paper/) library's [Menu](https://callstack.github.io/react-native-paper/docs/components/Menu/) component to implement the ordering principle's selection. You can use the `FlatList` component's [ListHeaderComponent](https://reactnative.dev/docs/flatlist#listheadercomponent) prop to provide the list with a header containing the selection component.

The final version of the feature, depending on the selection component in use, should look something like this:

![plot](./exercises-media/17a.jpg)

# 10.24: Filtering the reviewed repositories list

The Apollo Server allows filtering repositories using the repository's name or the owner's username. This can be done using the `searchKeyword` argument in the `repositories` query. Here's an example of how to use the argument in a query:

```
{
  repositories(searchKeyword: "ze") {
    edges {
      node {
        id
        fullName
      }
    }
  }
}
```

Implement a feature for filtering the reviewed repositories list based on a keyword. Users should be able to type in a keyword into a text input and the list should be filtered as the user types. You can use a simple `TextInput` component or something a bit fancier such as React Native Paper's [Searchbar](https://callstack.github.io/react-native-paper/docs/components/Searchbar/) component as the text input. Put the text input component in the `FlatList` component's header.

To avoid a multitude of unnecessary requests while the user types the keyword fast, only pick the latest input after a short delay. This technique is often referred to as [debouncing](https://lodash.com/docs/4.17.15#debounce). [use-debounce](https://www.npmjs.com/package/use-debounce) library is a handy hook for debouncing a state variable. Use it with a sensible delay time, such as 500 milliseconds. Store the text input's value by using the `useState` hook and then pass the debounced value to the query as the value of the `searchKeyword` argument.

You probably face an issue that the text input component loses focus after each keystroke. This is because the content provided by the `ListHeaderComponent` prop is constantly unmounted. This can be fixed by turning the component rendering the `FlatList` component into a class component and defining the header's render function as a class property like this:

```
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    // ...

    return (
      <RepositoryListHeader
      // ...
      />
    );
  };

  render() {
    return (
      <FlatList
        // ...
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}
```

The final version of the filtering feature should look something like this:

![plot](./exercises-media/18a.jpg)

# 10.25: The user's reviews view

Implement a feature which allows user to see their reviews. Once signed in, the user should be able to access this view by pressing a "My reviews" tab in the app bar. Here is what the review list view should roughly look like:

![plot](./exercises-media/20a.jpg)

Remember that you can fetch the authenticated user from the Apollo Server with the `me` query. This query returns a `User` type, which has a field `reviews`. If you have already implemented a reusable `me` query in your code, you can customize this query to fetch the `reviews` field conditionally. This can be done using GraphQL's [include](https://graphql.org/learn/queries/#directives) directive.

Let's say that the current query is implemented roughly in the following manner:

```
const GET_CURRENT_USER = gql`
  query {
    me {
      # user fields...
    }
  }
`;
```

You can provide the query with an `includeReviews` argument and use that with the `include` directive:

```
const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      # user fields...
      reviews @include(if: $includeReviews) {
        edges {
          node {
            # review fields...
          }
        }
      }
    }
  }
`;
```

The `includeReviews` argument has a default value of `false`, because we don't want to cause additional server overhead unless we explicitly want to fetch authenticated user's reviews. The principle of the `include` directive is quite simple: if the value of the `if` argument is `true`, include the field, otherwise omit it.

# 10.26: Review actions

Now that user can see their reviews, let's add some actions to the reviews. Under each review on the review list, there should be two buttons. One button is for viewing the review's repository. Pressing this button should take the user to the single repository review implemented in the previous exercise. The other button is for deleting the review. Pressing this button should delete the review. Here is what the actions should roughly look like:

![plot](./exercises-media/21a.jpg)

Pressing the delete button should be followed by a confirmation alert. If the user confirms the deletion, the review is deleted. Otherwise, the deletion is discarded. You can implement the confirmation using the [Alert](https://reactnative.dev/docs/alert) module. Note that calling the `Alert.alert` method won't open any window in Expo web preview. Use either Expo mobile app or an emulator to see the what the alert window looks like.

Here is the confirmation alert that should pop out once the user presses the delete button:

![plot](./exercises-media/22a.jpg)

You can delete a review using the `deleteReview` mutation. This mutation has a single argument, which is the id of the review to be deleted. After the mutation has been performed, the easiest way to update the review list's query is to call the [refetch](https://www.apollographql.com/docs/react/data/queries/#refetching) function.


## Exercise 10.27.

# 10.27: Infinite scrolling for the repository's reviews list

Implement infinite scrolling for the repository's reviews list. The `Repository` type's `reviews` field has the `first` and `after` arguments similar to the `repositories` query. `ReviewConnection` type also has the `pageInfo` field just like the `RepositoryConnection` type.

Here's an example query:

```
{
  repository(id: "jaredpalmer.formik") {
    id
    fullName
    reviews(first: 2, after: "WyIxYjEwZTRkOC01N2VlLTRkMDAtODg4Ni1lNGEwNDlkN2ZmOGYuamFyZWRwYWxtZXIuZm9ybWlrIiwxNTg4NjU2NzUwMDgwXQ==") {
      totalCount
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
```

The cache's field policy can be similar as with the `repositories` query:

```
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },

    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});
```

As with the reviewed repositories list, use a relatively small `first` argument value while you are trying out the infinite scrolling. You might need to create a few new users and use them to create a few new reviews to make the reviews list long enough to scroll. Set the value of the `first` argument high enough so that the `onEndReach` handler isn't called immediately after the view is loaded, but low enough so that you can see that more reviews are fetched once you reach the end of the list. Once everything is working as intended you can use a larger value for the `first` argument.

This was the last exercise in this section. It's time to push your code to GitHub and mark all of your finished exercises to the exercise submission system. Note that exercises in this section should be submitted to the Part 4 in the exercise [submissions system](https://studies.cs.helsinki.fi/stats/courses/fs-react-native-2020).