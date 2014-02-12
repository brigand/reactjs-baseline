Opinionated Baseline for ReactJS Projects
==========================================

**this is a living work in progress, please keep that in mind**

As I do more projects with [ReactJS](http://facebook.github.io/react/) I started to extract a baseline to use when starting new projects. This is **very** opinionated and I change my opinion from time to time. This is by no ways perfect and in **your** opinion most likely wrong :).. which is why I love github

I encourage you to fork, and make it *right* and submit a pull request!

My current opinion is using tools like [Grunt](http://gruntjs.com/), [Browserify](http://browserify.org/), [Bower](http://bower.io/), [Stylus](learnboost.github.io/stylus/), and mutiple grunt plugins to get the job done.  

How to Use
----------

Given the tool chain I have outlined above, you need the following things installed. I wont bother instructing you how, I am sure you know or already have what is needed

1. [NodeJS](http://nodejs.org/) 
2. [NPM](http://npmjs.org)  (*some node distro's include this*)

This is how I go about using my baseline


First, lets clone the repo 

```
git clone https://github.com/brigand/reactjs-baseline.git new_project_name
cd new_project_name
```

**note** at this point, do your normal steps for a new git repo and adding the remote

Make sure grunt-cli is installed globally

```
sudo npm install -g grunt-cli
```

Now lets install dependencies

```
npm install
bower install
``` 

Now Edit package.json and replace the content as you see fit. The grunt scripts use the 'name' from package.json for naming files (ie: css, js, etc)


Development
-----------

```
grunt
```

Will build the development (self contained) instance into ./development. CSS and JS are not uglified or minified to help with debugging.

Distribution
------------

```
grunt dist
```

Will build the production (self contained) instance into ./dist. CSS and JS are uglified and minified as appropriate

## File Structure

## Aliases for easy development

`require("common/button")`  is aliased to `require("./src/common/button/button.jsx")`, and this works with api too.  No more `require("../../common/button/button/button.jsx")` nonsense!

- src/
    - [common/](https://github.com/brigand/reactjs-baseline/tree/master/src/common)
        - put reusable components here
    - [jsx/](https://github.com/brigand/reactjs-baseline/tree/master/src/jsx)
        - put application specific components here
    - [api/](https://github.com/brigand/reactjs-baseline/tree/master/src/api)
        - put utility functions, server apis, and data persistance code here
    - index.html
        - the main HTML file
    - index.jsx
        - this is the root of your application, it's a good place to set
        up routes, Corpus, etc.



Other Things
------------

To run [JSXhint](https://github.com/CondeNast/JSXHint) over your code, just do 

```
npm run jsxhint
```

Todos
-----

1. Concat vendor js into a single file
1. Add some tests
1. Use pkg.version when naming files

Original Repo
------------

This is a fork of the [react-baseline](https://github.com/intabulas/reactjs-baseline) repo.  Most of
the code was made by the two mentioned contributiers.  It's all liscensed under the MIT.
