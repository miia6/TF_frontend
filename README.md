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

0. Homepage (when user has not logged in) and login/signup could be combined into one.

1. Let's make our page names a bit more simpler: 
- Combine `Homepage` with `Course selection` and rename to `Courses` as we don't need a separate homepage to display anything.
- Rename `Project finding` to `Projects`.
- `Project proposal` omitted from dashboard and can be accessed via `Projects`.
- Rename `Teammates finding` to `Teammates`.

So the dashboard includes 3 main routes, which can be accessed in the following flow:

`Courses` &rarr; `Projects` &rarr; `Teammates`

For example, when a user first accesses our website:
- User is asked to login (or signup). 
- User is asked to choose a course in `Courses`.
- User is asked to choose a project from the selected course, or propose a project themselves in `Projects`.
- User can monitor what projects they have applied or applications to their project in `Teammates`.

