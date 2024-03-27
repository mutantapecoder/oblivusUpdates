# Oblivus Machine Updates:

### Sends email notifications on machine statuses using Oblivus API.

### Steps:

* Create a new Gmail account (used to send emails from)
* Add 2FA to account
* Search for app passwords in google account search bar and create a new app password (used later in code)
* Git clone this repo
* Run `npm i` to install packages.
* Add a .env file and populate it with your Oblivus `API_KEY` and `API_TOKEN` and also Gmail `EMAIL_USER` and `EMAIL_PASSWORD`
* In App.js add the ID's of the machine you want to exclude from this in the `exeptionList` var
*  run `node app` in terminal to run app.
*  the default code will run every 5 minutes. to test use the commented out code under it which will run every 10 seconds.