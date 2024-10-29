# Creating the frontend
Frontend to TeammatesFinding App

1. Open Node.js command prompt
2. Navigate to the frontend: cd TF_frontend
3. Create frontend with vite: npm create vite@latest frontend -- --template react

The application is started with npm run dev -command.

# Routing 
Install to the root: npm install react-router-dom

# Packages
Install to the root: npm install

# Combining backend
The frontend now contains some backend code commented out (+services). I couldn't yet get those work together, waiting for more implemented backend. 
Currently, local storage is used instead.

# CHANGES

MENU CHANGES:
TFmenu now contains a top-menu-bar, showing the app logo, selected course, and logout-button, and also a side-bar, containing links to the pages. This is for better usability.
"Projects" -link contains sublinks, which will be later shown depending on the type of the user.

CSS CHANGES:
The sizes changed to rem instead of px, to ensure the project to display items nicely in both smaller and bigger screens. (except border-radiuses of the forms, consider if changing them is needed as well)

ERROR HANDLING:
Project Proposal and Sign Up contains now frontend error handling.

# TO DO

- Combine with backend 
    -> Define the functionalities with respect to the type of the user (applications, invitations etc.).
    -> Implement functionalities of applications and invitations.
    -> Modify teammates finding page with respect to the type of the user (see your project's teammates, and add search and invitation possibility for the project owner).
    -> Implemented error handling with respect to the backend.

- Improve visuality of the app (some images etc... ?).


## Notes from Binh:

Below is the summary of what I added and changed. 
They're just my personal suggestions, so please feel feel to disagree and revert the changes.

0. Homepage (when user has not logged in) and login/signup could be combined into one.

1. Let's make our page names a bit more simpler: 
- Combine `Homepage` with `Course selection` and rename to `Courses` as we don't need a separate homepage to display anything. !! DONE !!
- Rename `Project finding` to `Projects`. !! DONE !!
- `Project proposal` omitted from dashboard and can be accessed via `Projects`. !! DONE: link named "Create project" !!
- Rename `Teammates finding` to `Teammates`. !! TO DO !!

So the dashboard includes 3 main routes, which can be accessed in the following flow:

`Courses` &rarr; `Projects` &rarr; `Teammates`

For example, when a user first accesses our website:
- User is asked to login (or signup). 
- User is asked to choose a course in `Courses`.
- User is asked to choose a project from the selected course, or propose a project themselves in `Projects`.
- User can monitor what projects they have applied or applications to their project in `Teammates`.

