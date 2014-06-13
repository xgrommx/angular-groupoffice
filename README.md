# angular-groupoffice — A simple GroupOffice client with AngularJS and Bootstrap

This project is an example of how to build a [Group-Office](https://www.group-office.com) client with [AngularJS](http://angularjs.org/)

It uses [Bootstrap](http://getbootstrap.com) for styling.

It currently only features a Notes app.


## Development notes

Get all the required NPM modules my navigating to the project directory and run:

$ npm install

I used [grunt](http://gruntjs.com/) to maintain the scripts in index.html. It 
automatically puts all javascript and css files in the index.html file. 
Additionally it can build a distribution with minified scripts.

Run:

$ grunt watch

to keep it up to date.

Run grunt with no command to create a distribution release:

$ grunt
