# Code Test

## Welcome!

This repository is the starting base for the code test which will help us assess your JavaScript skill level, general attention to detail as a developer and use of best-practice implementation patterns.

## Technical Requirements

You must have installed:
- Node 8.x +
- NPM or Yarn

The goal of this test is for us to get a sense of your JavaScript skill. We want seeing this demo app be implemented using React, Redux with ajax call to ExpressJS. We are also expected to see best practice, quality code and a web app meeting industrial standard ( ie: Unit Tests, Responsive design, Accessibility,  Security etc).
 
## Instructions

1. Read this readme
2. Ensure you have understood the wireframes available in `/materials/wireframes`
3. The `/code` folder should be a GIT repository. Please initialise a GIT repository using `git init` from within the `/code` folder. Your commit messages should follow the documented [Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153). Ensure you commit regularly so we can follow your step by step progress throughout the application.
4. Before you begin coding, generate your own set of randomised sample data by running `yarn run setup` or `npm run setup` from the root directory. This will create a `sample-data.json` file in your `/code` directory.
5. Design your own folder structure as you see fit within the `/code` directory
6. Design your own components and interactions. The use of third-party plugins for this simple demo app should be kept to a minimum as the wireframes have been designed to be achievable using the chosen framework/library without any additional plugins. Feel free to use helper libraries such as `lodash` or similar.
7. When finished, publish the GIT repository in `/code` to your personal Gitlab account and mark it as *Internal* under their Project Visibility settings and send the GIT repository URL back to us for review.

_*Note:* If you are unable to host your own GIT repository, please zip the entire `/code` folder and send it back to us. Make sure this includes the `.git` folder so we can review your GIT commit history for the application._

## The Application Requirements

This simple employee roster app will use a static `sample-data.json` file with randomly generated sample data that should be used to create a simple one-page app of the roster for the company's employees.

The roster should be represented in a "card" layout (see wireframe `summary-view.png`) which initially shows minimal employee information consisting of the employee's name, avatar picture and with personal info

Clicking on a card should highlight the card in some way and render additional information in a modal overlay (see wireframe `detail-view.png`). Clicking the close (X) icon above the modal should close the modal and remove the highlight from the card that was clicked. Clicking anywhere outside the modal's content should also close the modal.

Your application should render correctly in a mobile sized device.

_*Note:* If anything is unclear, please create a readme.md file in the `/code` directory to document the assumptions you've made._
