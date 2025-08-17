# Aus-k12-Outreach
Organize K12 Outrech events in Austin

## Data
This project trackes K12 outreach events (like school career days) and contacts in the outreach space. The source of data is https://docs.google.com/spreadsheets/d/1jQ-Rou08NcR_7GLK1twpi4rGgp0L1DHTIOdJdI2nF-A and can be viewed and edited in the Google Sheet. The Google Sheet will contain the most up to data data.

The "data" folder of this project will pull this data from Google Sheets and make it available for use in the app. New data added to the sheet must be pulled and a new version of the site must then be published

## App
The app section of this project will use the data pulled from the Google Sheet and present it in various ways for easy purusal, such as in a list or a map

## How to Build
1) Update  https://docs.google.com/spreadsheets/d/1jQ-Rou08NcR_7GLK1twpi4rGgp0L1DHTIOdJdI2nF-A 
1) Pull the data ```npm run build-data```
1) Build the app ```npm run build-app```
1) Deploy the app ```npm run deploy```

### The full flow to update and deploy the app with the latest data can be performed with ```npm run build-all-deploy```
Note that it can take up to 10 minutes for the app to update on the server