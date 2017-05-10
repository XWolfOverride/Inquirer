#!/bin/bash
#cat merger/core.js > inquirer-full.js
#cat inquirer.js >>inquirer-full.js
MY_PATH="`dirname \"$0\"`"
cd "$MY_PATH"
echo "Starting minification"
echo "//Inquirer Minified file (C) XWolfOverride 2016"> inquirer.min.js
echo "//MIT License and details on github https://github.com/XWolfOverride/Inquirer">> inquirer.min.js
echo "//">> inquirer.min.js
curl -X POST -s --data-urlencode 'input@Merger.js' https://javascript-minifier.com/raw >> inquirer.min.js
curl -X POST -s --data-urlencode 'input@Inquirer.js' https://javascript-minifier.com/raw >> inquirer.min.js
echo Done!
