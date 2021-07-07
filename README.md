# React-TypeScript boilerplate for library development with Rollup bundler

## First step: &nbsp;&nbsp; `yarn start`

Runs the initialization script. Cleaning up the project for the first use:
- Changing the project name
- Removing the boilerplate's Git folder
- Creating a new Git folder by running &nbsp; `git init`
- Adding the bin folder to .gitignore
- Running &nbsp; `yarn`
  
`Caution: `__Do not run it again, it will reset your project!__ <br/><br/>
## Available Scripts:
### `yarn serve`


Runs the test frame app in the development mode.  
Open [http://localhost:3456](http://localhost:3456) to view it in the browser.

The content is served from the `build` folder.  
The page will rebuild (watch mode) if you make edits. If live reload fails, try to increase the 'delay' value at rollup.config.dev.js/plugins/livereload.

### `yarn dist`

Builds the library for production to the `dist` folder.  
The build is minified.


### `yarn build`
Building the library to the `build` folder __without__ minified code.
<br/><br/>
## Optional function:  

### `yarn upload`

Running the `dist` command and uploading the folder to an Amazon S3 bucket using the
[`dist-upload-s3`](https://www.npmjs.com/package/dist-upload-s3) script.