#!/bin/bash
#cat merger/core.js > inquirer-full.js
#cat inquirer.js >>inquirer-full.js
curl -X POST -s --data-urlencode 'input@merger/core.js' https://javascript-minifier.com/raw > inquirer.min.js
curl -X POST -s --data-urlencode 'input@inquirer.js' https://javascript-minifier.com/raw >> inquirer.min.js