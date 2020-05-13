

# Introduction

This app is used as a reminder app that maintains a database of the users and the list of reminders created by each user. Each reminder has a cadance attribute, in hours, denoting how often each reminder will be sent. For example, a reminder with a cadance of 5 means that a message will be sent every 5 hours. 

## Approach

My approach was that each time an event happens on react, there will be an event handler that makes a request to a specific route to the backend(express) to fetch related information or to post some information. Express handles everything related to the database and passes the information to the frontend.

## project structure

`src` contains index.js and all the react components.
`router` contains the api router and the account router
`models` contains the MongoDB data models
`server.js` is the main express file
`checkMessage.js` is the file that is meant to be executed once every hour. When executed,it makes a check on whether a text reminder should be sent.


## `npm start` 
This starts the application. The default express port is 5000 and the default react port is 3000.


# 
I couldn't get my project to work on heroku because of porting issues.
