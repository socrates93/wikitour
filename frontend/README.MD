> **This README assumes that you already have Docker and NodeJS installed on your computer**.

# Instructions

To run this project as standalone you need to do the following:

0. Create an .env file following the .env.template file.
1. From the root folder of the project, install modules with the command `npm install`.
2. Run the project with `npm run dev`.

And that's it! You can start using the frontend app by [clicking here](http://localhost:5173/).

## Run on mobile with Capacitor

You can also run this project on Android/IOS devices. You can do this by doing the following:

- run `npm install -g @ionic/cli` to install ionic cli globally. Make sure that the cli works before continue.
- run `npm run build`.
- run `npm run capacitor:sync`.
- run `npm run open-android` or `npm run open-ios`.

After the native editor finish its building process, hit play, select your device and start using the app.

### NOTE:

In order for the mobile application to communicate successfully with the backend, the following must be considered:

- The backend service needs to be running.
- You need to modify the `VITE_API_URL` env variable as follows: **<MY_IP_ADDRESS>:3000**.
