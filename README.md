# ODM Scraper


ODM Scraper is a tool that allows the parsing of support information based on reported ODM errors.

It parses out relevant information from each ODM request and displays the relevant information on to a spreadsheet view.



## Table of Contents

- [Getting Started](#getting-started)


### Getting Started
ODM Scraper is a node application that utilizes the scraping capabilities of puppeteer.

To get started:
- Clone the repo
- Add or export the following environment variables
  - IMEDIDATA_USER_NAME: to store your iMedidata username
  - IMEDIDATA_PASSWORD: to store your password
  - > This tool should handle authentication
- Execute `yarn` to install libraries
- Execute `yarn start` or `npm run start` to deploy application via `localhost` `port 3000`
  - In the future, port change should be more flexible
  - Voila

To run the app:
- Open `localhost:3000`
- Add One or more comma delimeted ODM UUIDs
- Click button
  - Wait awhile
  - Animation is forthcoming
- A new table is generated that only contains the ODM you need to investigate.
