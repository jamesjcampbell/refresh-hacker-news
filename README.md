# Hacker News UI refresh

In order to get started quickly I used [Create React App](https://github.com/facebook/create-react-app), this added React, Typescript and Jest to the project as well as configuring the following scripts used to build/test/run the application

## Prebuilt scripts
In the project directory, you can run:
- ### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- ### `npm test`

- ### `npm run build`
Builds the app for production to the `build` folder.\

- ### `npm run eject`
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Other Libraries used
Note I restricted any libraries to only MIT license.
- ### [Mantine](https://mantine.dev/)
In order to rapidly build this UI I decided to use a component library and quickly determined that I wanted a loading overlay and pagination component. Doing some quick research Mantine looked like a good choice, with MIT license, popular on GitHub (9.4K stars / active development /few issues), written in Typescript and JS-in-CSS styling (while I did not take use of this, given more time I would refactor the sass used in this project to fully incorperate with Mantine createStyles).
- ### [tabler-icons-react](https://tabler-icons-react.vercel.app/)
I wanted to use a single source of icons for the UI and as this package is already used within Mantine it was a simple choice to use it for all icons.
- ### [Open color](https://yeun.github.io/open-color/)
As I am still using sass for styling I wanted to ensure consistent colors with the Mantine theme (again I would need more time to develop a new theme for UI, and also to implement a dark mode, which should be fairly straight forward with Mantine).
- ### [Timeago](https://timeago.org/)
This is a small library I chose for the human readable time strings, this is a nice library as it is small and has internationalization support.

## Design decisions
I went with a moderately small change to the existing ui, keeping to the list view, but adding space and icons to freshen it up. I kept the orange colour from Hacker News, used for icons and selected list type and have used a complimentary blue colour in the UI for the pagination control.

The app it self is made up of just a few components, a Shell using the Mantine AppShell to set header and sidebar (NavigationLinks component). The StoryPage is the main content contained in the shell and this also contains the state for the application. The StoryPage then contains 
an ItemList component which uses a styled list to display each story item.

For the API, well it is not very performant and using a small backend server to batch the requests could add a lot to the initial performance of the site. (This is the key cause of the low lighthouse score for performance). I would also like to add some caching in the front end to not request the same stories frequently (was thinking of adding a timestamp to keep stories for 1min), I also should have added a debounce when navigating between list types.

In order to cache the data I was thinking about adding a useReducer hook in the StoryPage and use this as the primary state management for the app, I do not think a third party state management solution would be required. Similarly adding a Comments page could be managed with a context switch in the Shell component and adding a router would also be unnecessary at that stage.

For the testing I copied a lot of mocks from the Shell to the StoryPage tests and this could be refactored to a shared mocks file.

