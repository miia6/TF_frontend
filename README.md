<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
=======
# TF_frontend
Frontend to TeammatesFinding App

1. Open Node.js command prompt

2. Navigate to the frontend: cd TF_frontend

3. Create frontend with vite: npm create vite@latest part1 -- --template react

The application is started with npm run dev -command.

# Routing (without backend)
Install to the root: npm install react-router-dom

# ! PROTOTYPE FOR DEMO GALA !
Done: Homepage (App.jsx), Login, Signup, CourseSelection.
Currently I'm working on the Dashboard. 

Pages TeammatesFinding, ProjectFinding and ProjectProposal need to be somehow implemented for the demo gala. All of these pages should have the same menu than the Dashboard currently has. 

In the App.css, font and background color to the whole app have been defined.
(Most of the) buttons should be as they are defined, for example, in the Homepage (App.css).
For forms, see signup.css, for example.

## Notes from Binh:

Below is the summary of what I added and changed. 
They're just my personal suggestions, so please feel feel to disagree and revert the changes.

1. Let's make make our pages name a bit more consistent: 
- Rename `Homepage` to `Find Courses`.
- Rename `Project finding` to `Find Projects`.
- `Project proposal` omitted from dashboard and can be accessed via `Find Projects`.
- Rename `Teammates finding` to `Find Teammates`.

So the new dashboard includes 3 main routes, which can be accessed in the following flow:

`Find Courses` &rarr; `Find Projects` &rarr; `Find Teammates`