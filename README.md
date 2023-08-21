### Introduction

Welcome to the documentation for the frontend project. This guide aims to provide a comprehensive overview of the project's functionality, usage, and technologies employed. The project features a responsive web application that allows users to explore and interact with city data.

## Available Scripts

In the project directory, you can run:

Install the project dependencies

### `npm install`

Run the JSON server to serve data:

### `npm run  start-server`

Running the Application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Main view

The main view of the application provides the following features:

- Display of a grid list of **active** cities.
- Utilization of an adaptive and responsive viewer for improved user experience.
- Implementation of a search functionality to filter cities by name or country using a single search field.
- Incorporation of a filter functionality for users to sort cities by continent.
- Implementation of sorting options to arrange cities by name or distance to a specified location.
- Display of a "No results found" message when search terms yield zero results.
- Users can configure temperature units as either international or imperial.

Each city square in the main view displays the following information: City name, Country name, Description, and Background image.

#### City details page (Weather)

The city details page offers the following functionality:

- Display of detailed information about a selected city, including weather status (temperature, weather conditions, etc.).
- Display of a 5-day forecast for the chosen city.
- Display of temperature data in the user's selected units (with saved preference).
- A back button is provided to return to the main page, preserving applied filters.

#### Technologies used

- React: JavaScript library for building user interfaces.
- React Router DOM: Routing library for handling navigation in React applications.
- Redux: State management library for managing application state.
- Axios: HTTP client for making network requests.
- TypeScript: Language that adds static types to JavaScript.
- HTML & CSS (SASS): Markup and styling languages for structuring and designing the application.

---

Feel free to explore the features and functionalities of the application using this documentation. Should you have any questions or encounter issues, please refer to the provided instructions and technologies for assistance or contact the developer.
