# Full Stack Open - Part 10 - React Native - Exercises


## Exercise 10.1

### 10.1: Initializing the application

Initialize your application with Expo command-line interface and set up the development environment either using an emulator or Expo's mobile app. It is recommended to try both and find out which development environment is the most suitable for you. The name of the application is not that relevant. You can, for example, go with rate-repository-app.

To submit this exercise and all future exercises you need to create a [new GitHub repository](https://github.com/new). The name of the repository can be for example the name of the application you initialized with `expo init`. If you decide to create a private repository, add GitHub user [mluukkai](https://github.com/mluukkai) as a [repository collaborator](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository). The collaborator status is only used for verifying your submissions.

Now that the repository is created, run `git init` within your application's root directory to make sure that the directory is initialized as a Git repository. Next, to add the created repository as the remote run `git remote add origin git@github.com:<YOURGITHUBUSERNAME>/<NAMEOFYOUR_REPOSITORY>.git` (remember to replace the placeholder values in the command). Finally, just commit and push your changes into the repository and you are all done.


## Exercise 10.2.

### 10.2: Setting up the ESLint

Set up ESLint in your project so that you can perform linter checks by running `npm run lint`. To get most of linting it is also recommended to integrate ESLint with your editor.

This was the last exercise in this section. It's time to push your code to GitHub and mark all of your finished exercises to the exercise [submission system](https://studies.cs.helsinki.fi/stats/courses/fs-react-native-2020). Note that exercises in this section should be submitted to Part 1 in the exercise submission system.


## Exercise 10.3.

### Exercise 10.3: The reviewed repositories list

In this exercise, we will implement the first version of the reviewed repositories list. The list should contain the repository's full name, description, language, number of forks, number of stars, rating average and number of reviews. Luckily React Native provides a handy component for displaying a list of data, which is the [FlatList](https://reactnative.dev/docs/flatlist) component.

Implement components `RepositoryList` and `RepositoryItem` in the components directory's files <em>RepositoryList.jsx</em> and <em>RepositoryItem.jsx</em>. The `RepositoryList` component should render the `FlatList` component and RepositoryItem a single item on the list (hint: use the `FlatList` component's [renderItem](https://reactnative.dev/docs/flatlist#required-renderitem) prop). Use this as the basis for the RepositoryList.jsx file:

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

<em>Do not</em> alter the contents of the `repositories` variable, it should contain everything you need to complete this exercise. Render the R`epositoryList` component in the `Main` component which we previously added to the <em>Main.jsx</em> file. The reviewed repository list should roughly look something like this:

![plot](./exercises-media/5.png)


## Exercises 10.4-10.5.

### Exercise 10.4: The app bar

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

Now that the `AppBar` component will prevent the status bar from overlapping the content, you can remove the marginTop style we added for the `Main` component earlier in the <em>Main.jsx</em> file. The `AppBar` component should currently contain a tab with the text "`Repositories`". Make the tab pressable by using the [Pressable](https://reactnative.dev/docs/pressable) component but you don't have to handle the `onPress` event in any way. Add the `AppBar` component to the `Main` component so that it is the uppermost component on the screen. The `AppBar` component should look something like this:

![plot](./exercises-media/5.png)

The background color of the app bar in the image is `#24292e` but you can use any other color as well. It might be a good idea to add the app bar's background color into the theme configuration so that it is easy to change it if needed. Another good idea might be to separate the app bar's tab into a component like `AppBarTab` so that it is easy to add new tabs in the future.

### 10.5: Polished reviewed repositories list

The current version of the reviewed repositories list looks quite grim. Modify the <em>RepositoryItem</em> component so that it also displays the repository author's avatar image. You can implement this by using the [Image](https://reactnative.dev/docs/image) component. Counts, such as the number of stars and forks, larger than or equal to 1000 should be displayed in thousands with the precision of one decimal and with a "k" suffix. This means that for example fork count of 8439 should be displayed as "8.4k". Also, polish the overall look of the component so that the reviewed repositories list looks something like this:

![plot](./exercises-media/5.png)

In the image, the `Main` component's background color is set to `#e1e4e8` whereas `RepositoryItem` component's background color is set to `white`. The language tag's background color is `#0366d6` which is the value of the colors.primary variable in the theme configuration. Remember to exploit the `Text` component we implemented earlier. Also when needed, split the `RepositoryItem` component into smaller components.


## Exercises 10.6-10.7

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

Setting the horizontal prop `true` will cause the `ScrollView` component to scroll horizontally once the content won't fit the screen. Note that, you will need to add suitable style properties to the `ScrollView` component so that the tabs will be laid in a <em>row</em> inside the flex container. You can make sure that the app bar can be scrolled horizontally by adding tabs until the last tab won't fit the screen. Just remember to remove the extra tabs once the app bar is working as intended.


## Exercise 10.8.

### 10.8: The sign-in form

Implement a sign-in form to the SignIn component we added earlier in the SignIn.jsx file. The sign-in form should include two text fields, one for the username and one for the password. There should also be a button for submitting the form. You don't need to implement an onSubmit callback function, it is enough that the form values are logged using console.log when the form is submitted:

const onSubmit = (values) => {
  console.log(values);
};

Remember to utilize the FormikTextInput component we implemented earlier. You can use the secureTextEntry prop in the TextInput component to obscure the password input.

The sign-in form should look something like this:


## Exercise 10.9.

### 10.9: Validating the sign-in form

Validate the sign-in form so that both username and password fields are required. Note that the onSubmit callback implemented in the previous exercise, should not be called if the form validation fails.

The current implementation of the FormikTextInput component should display an error message if a touched field has an error. Emphasize this error message by giving it a red color.

On top of the red error message, give an invalid field a visual indication of an error by giving it a red border color. Remember that if a field has an error, the FormikTextInput component sets the TextInput component's error prop as true. You can use the value of the error prop to attach conditional styles to the TextInput component.

Here's what the sign-in form should roughly look like with an invalid field:

The red color used in this implementation is `#d73a4a`.


## Exercise 10.10.

### 10.10: A platform-specific font

Currently, the font family of our application is set to System in the theme configuration located in the theme.js file. Instead of the System font, use a platform-specific Sans-serif font. On the Android platform, use the Roboto font and on the iOS platform, use the Arial font. The default font can be System.

This was the last exercise in this section. It's time to push your code to GitHub and mark all of your finished exercises to the exercise submission system. Note that exercises in this section should be submitted to the section named part 2 in the exercise submission system.

## Exercise 10.11
Exercise 10.11: fetching repositories with Apollo Client

We want to replace the Fetch API implementation in the useRepositories hook with a GraphQL query. Open the Apollo Sandbox at http://localhost:4000 and take a look at the documentation next to the operations editor. Look up the repositories query. The query has some arguments, however, all of these are optional so you don't need to specify them. In the Apollo Sandbox form a query for fetching the repositories with the fields you are currently displaying in the application. The result will be paginated and it contains the up to first 30 results by default. For now, you can ignore the pagination entirely.

Once the query is working in the Apollo Sandbox, use it to replace the Fetch API implementation in the useRepositories hook. This can be achieved using the useQuery hook. The gql template literal tag can be imported from the @apollo/client library as instructed earlier. Consider using the structure recommended earlier for the GraphQL related code. To avoid future caching issues, use the cache-and-network fetch policy in the query. It can be used with the useQuery hook like this:

useQuery(MY_QUERY, {
  fetchPolicy: 'cache-and-network',
  // Other options
});

The changes in the useRepositories hook should not affect the RepositoryList component in any way.


## Exercise 10.12
Exercise 10.12: environment variables

Instead of the hardcoded Apollo Server's URL, use an environment variable defined in the .env file when initializing the Apollo Client. You can name the environment variable for example APOLLO_URI.

Do not try to access environment variables like process.env.APOLLO_URI outside the app.config.js file. Instead use the Constants.manifest.extra object like in the previous example. In addition, do not import the dotenv library outside the app.config.js file or you will most likely face errors.


## Exercises 10.13. - 10.14
Exercise 10.13: the sign in form mutation

The current implementation of the sign in form doesn't do much with the submitted user's credentials. Let's do something about that in this exercise. First, read the rate-repository-api server's authentication documentation and test the provided queries and mutations in the Apollo Sandbox. If the database doesn't have any users, you can populate the database with some seed data. Instructions for this can be found in the getting started section of the README.

Once you have figured out how the authentication works, create a file useSignIn.js file in the hooks directory. In that file implement a useSignIn hook that sends the authenticate mutation using the useMutation hook. Note that the authenticate mutation has a single argument called credentials, which is of type AuthenticateInput. This input type contains username and password fields.

The return value of the hook should be a tuple [signIn, result] where result is the mutations result as it is returned by the useMutation hook and signIn a function that runs the mutation with a { username, password } object argument. Hint: don't pass the mutation function to the return value directly. Instead, return a function that calls the mutation function like this:

```
const useSignIn = () => {
  const [mutate, result] = useMutation(/* mutation arguments */);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
  };

  return [signIn, result];
};
```

Once the hook is implemented, use it in the SignIn component's onSubmit callback for example like this:

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

This exercise is completed once you can log the user's authenticate mutations result after the sign in form has been submitted. The mutation result should contain the user's access token.
Exercise 10.14: storing the access token step1

Now that we can obtain the access token we need to store it. Create a file authStorage.js in the utils directory with the following content:

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

Next, implement the methods AuthStorage.getAccessToken, AuthStorage.setAccessToken and AuthStorage.removeAccessToken. Use the namespace variable to give your keys a namespace like we did in the previous example.


## Exercises 10.15. - 10.16
Exercise 10.15: storing the access token step2

Improve the useSignIn hook so that it stores the user's access token retrieved from the authenticate mutation. The return value of the hook should not change. The only change you should make to the SignIn component is that you should redirect the user to the reviewed repositories list view after a successful sign in. You can achieve this by using the useNavigate hook.

After the authenticate mutation has been executed and you have stored the user's access token to the storage, you should reset the Apollo Client's store. This will clear the Apollo Client's cache and re-execute all active queries. You can do this by using the Apollo Client's resetStore method. You can access the Apollo Client in the useSignIn hook using the useApolloClient hook. Note that the order of the execution is crucial and should be the following:

const { data } = await mutate(/* options */);
await authStorage.setAccessToken(/* access token from the data */);
apolloClient.resetStore();

Exercise 10.16: sign out

The final step in completing the sign in feature is to implement a sign out feature. The me query can be used to check the authenticated user's information. If the query's result is null, that means that the user is not authenticated. Open the Apollo Sandbox and run the following query:

{
  me {
    id
    username
  }
}

You will probably end up with the null result. This is because the Apollo Sandbox is not authenticated, meaning that it doesn't send a valid access token with the request. Revise the authentication documentation and retrieve an access token using the authenticate mutation. Use this access token in the Authorization header as instructed in the documentation. Now, run the me query again and you should be able to see the authenticated user's information.

Open the AppBar component in the AppBar.jsx file where you currently have the tabs "Repositories" and "Sign in". Change the tabs so that if the user is signed in the tab "Sign out" is displayed, otherwise show the "Sign in" tab. You can achieve this by using the me query with the useQuery hook.

Pressing the "Sign out" tab should remove the user's access token from the storage and reset the Apollo Client's store with the resetStore method. Calling the resetStore method should automatically re-execute all active queries which means that the me query should be re-executed. Note that the order of execution is crucial: access token must be removed from the storage before the Apollo Client's store is reset.

This was the last exercise in this section. It's time to push your code to GitHub and mark all of your finished exercises to the exercise submission system. Note that exercises in this section should be submitted to the part 3 in the exercise submission system.
