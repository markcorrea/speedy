# Speedy API

This project is also published on Heroku on the link:
- http://marcusbackend.herokuapp.com/api/html



Project overview:

Speedy API is a project that automates the funcionality of two other APIs to reach an objective. It is an API project. However, it can be accessible by a browser, clicking on the link above.

It joins two APIs, being them:

- TALAIKIS: Generates quotes and inspirational sentences, with the author's name;
- VOICEBUNNY: (on this project) Voicebunny makes possible to provide a project with a script and receive a voice over in high quality, very fast.

The main objective of this project is to retrieve the script from Talaikis and automatically send it to Voicebunny, requesting a new voice over. Once the voice over gets back, it is saved on a database and then a new updated list is shown on an HTML page, ordered by data, the recents first. Every time the page is reloaded, a new script is generated and sent to Voicebunny, saved on the dabatase and added to the list. The most recent is always displayed on the bigger box (Jumbotron) on top of the page.

Again, I've chosen to use NodeJS with Expresss, for being the easiest to configure an environment, once the time runs fast for this project. For the same reason I've chosen for MongoDB and mongoose, which doesn't require a DUMP file to build a database. On the first POST, the tables are automatically created by the inner model on the project. Babel makes everything easier, allowing me to use EcmaScript 6.

# Technologies:

NPM
- Node Package Manager - a library that manages the available packages of node.

ECMASCRIPT 6 (2015)
- JavaScript recent updates on language, released in 2015.

MONGO DB
- JSON based database, all data is treated as objects

MONGOOSE
- Library, allows connection to Mongo DB

BABEL
- Once EcmaScript6 was so recently released, many browsers still doesn't have support for its new features. So Babel is a translator, which converts all the code to simple EcmaScript5.

AXIOS
- Promise based HTTP client for the browser and node.js.

EXPRESS
- Node JS library structure to make Web and API applications.

BODY-PARSER
- When data comes from the backend, its format has to be treated to JSON.

MOMENT
- Easy way to work with Date and Time.

GIT
- Version control system, aiming on performance.

# Project Installation:

This project is installed using Node's Package Manager (NPM). If you don't have it on your machine yet, you can download it here: https://nodejs.org/en/;

To do so, you have to use Linux or MAC's Terminal. If you are using Windows, the command prompt won't work. I recommend downloading Git Bash.

This project contains a package.json file, which means that the necessary libraries will be installes once you type the specified command. Being so, please go to the Terminal and access the root file of your project. Once done, run "npm install".

All libraries will be installed inside the node_modules folder.

Once done, go to the terminal again and run "npm start".

the project will be available on http://localhost:3000.

# API accesses:

Requests a new script to Talaikis, and retrieves a JSON with the author, the script and the author's opinion about cats.
- type: GET
- header: { "Content-Type": "application/json" }
- endpoint: https://talaikis.com/api/quotes/random/
-------

Requests a list of all the voice overs saved on the database.
- type: GET
- header: { "Content-Type": "application/json" }
- endpoint: https://marcusbackend.herokuapp.com/api/voices
------

Requests a new script to Talaikis and posts it as a project to Voicebunny. After it receives the voice over, joins with the script data and saves to the database. Then it brings a list of all the voice overs saved and returns an HTML with the info. Accessible thru browser.
- type: GET
- header: { "Content-Type": "application/json" }
- endpoint: https://marcusbackend.herokuapp.com/api/html