# Welcome!

Hello, my name is Shawn Stern, and in this repository you'll find some helpful example files to go along with my presentation.

Please feel free to clone this repo and have a look at the files beforehand, but that absolutely is not necessary!

As we're going through the examples, having example.js + example.ts open next to each other to switch between will really help you to appreciate the developer experience between vanilla JavaScript and TypeScript.

## Prerequisites and Setup

For the best possible experience and to see TypeScript in action, I suggest having the following set up beforehand:

- Editor: VS Code (Others such as IntelliJ, WebStorm, etc should also work, but VS Code is my personal favorite)
- Environment: These examples require the NodeJS runtime, specifically version 12.17.0+. If you already have [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) installed, all you need to do is run `nvm use` from this directory and you're all set! Otherwise you may install NodeJS manually from [here](https://nodejs.org/en/download/).
- Dependencies: These examples rely on a few dependencies, please install these by running `yarn` in this directory. `npm i` is also a valid option if you prefer not to use `yarn`!

## Running Examples

To easily execute your code as you edit it, please use the provided scripts found in `package.json`.

For example: instead of needing to compile example.ts to valid JavaScript and then executing it with `node`, simply run `yarn example:ts`!
