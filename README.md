# Driftrocking
- Node.js
- ES6 Javascript
- Axios for API requests
- Async for asynchronous functions
- lodash for manipulating the data sets
- Mocha for testing
- Moxios for mocking out API responses
- Sinon to spy on functions
- make-runnable npm package to allow application to be run on command line

## Installation

- clone this repository
- download Node.js for your system (https://nodejs.org/en/download/)
- in the root of the directory run npm install from the command line

## Usage

- Run the three commands from the command line interface with the following:
```node App.js most_loyal```
```node App.js most_sold```
```node App.js total_spend userEmail - E.G node App.js total_spend langosh.tierra@erdman.co```
- Note the total_spend command requires a user email passed as an argument to run.
- Note I chose to keep the commands in App.js snake case as per the instructions in tech test, normally for JavaScript I would have used the standard camel case syntax which runs through the rest of the application

## Testing
## Tests ran in Mocha, using package.json file the test script looks for all files with the expressions **.spec.js.
## Using packages such as Mocha, Moxios & Sinon
![Imgur](https://imgur.com/ip2Z5El.png)

## Screenshots
## Services folder Contains the Api Call service function which is used through out this application.

![Imgur](https://imgur.com/HhK5VaH.png)

## A config.json file is used in the application to dictate parameters such as baseUrl, pageNumber and perPageAmount so that if these parameters are changed they only need to be adjusted in the config file rather than in each individual file they would appear.
![Imgur](https://imgur.com/oSJYlsY.png)

## Designed in an OO style; both Users class and Purchases Class hit their respective API's.  Using while loops they continue to make the API request until the response length is less than the perPageAmount value.
![Imgur](https://imgur.com/aGGHJz8.png)
![Imgur](https://imgur.com/uie5sIB.png)

## Data class compares the data recieved from both the user class and purchases class and performs a mix of lodash, for and if loops to get the correct output for the three functions runnable on the command line.
![Imgur](https://imgur.com/aCzhO0W.png)

## Fully tested application using a mix of mocha, sinon and moxios to stub the requests using realistic stub.json data in stub files.

![Imgur](https://imgur.com/MkU2iaE.png)
![Imgur](https://imgur.com/IRqjNcL.png)
![Imgur](https://imgur.com/P1PySsP.png)

## Retrospective

- OO design patterns means code in places does not follow the DRY principle.  However if the purchases class was eventually to do more than user class in terms of functionality this would be a good design choice I believe.
- Data compare functions possibly could be more optimal
- Fully functioning application that is well tested that I am happy with.
