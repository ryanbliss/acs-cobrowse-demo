# Live Share + ACS CoBrowse Demo

This sample uses Live Share & ACS to build a simple co-browsing experience for a website.

## Testing Locally in Browser

In the project directory, you can run:

### `npm install`

Installs the latest node packages

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

`npm runs build:dev` run build the app in dev mode

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
Upon loading, if there is no `/#{id}` in the URL, it will create one and insert it into the URL.
You can copy this URL and paste it into new browser tabs to test Live Share using a local server.
To test the side panel & video queue, you can replace your URL with `/sidepanel#{id}`.

**Note:** if testing with HTTPS, such as when using a tunneling service like Ngrok, instead use the command `npm run start-https`.
