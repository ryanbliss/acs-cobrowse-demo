# Live Share + ACS CoBrowse Demo

This sample uses Live Share & ACS to build a simple co-browsing experience for a website.

## Preparing local server

Add a file named `appsettings.json` to the `./server` directory with the following contents:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Trace",
      "System": "Information",
      "Microsoft": "Information"
    }
  },
  "AllowedHosts": "*",
  "ResourceConnectionString": "REPLACE_WITH_YOUR_CONNECTION_STRING",
  "EndpointUrl":"REPLACE_WITH_YOUR_ENDPOINT_URL",
  "AdminUserId": "REPLACE_WITH_YOUR_ADMIN_ID"
}
```

## Testing Locally in Browser

In the project directory, you can run:

### `npm setup`

Installs the latest node packages

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run start-client`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
Upon loading, if there is no `/#{id}` in the URL, it will create one and insert it into the URL.
You can copy this URL and paste it into new browser tabs to test Live Share using a local server.

**Note:** if testing with HTTPS, such as when using a tunneling service like Ngrok, instead use the command `npm run start-https`.

### `npm run start-server`

Runs the server in development mode on port 8080.
