#!/bin/bash
#cat merger/core.js > inquirer-full.js
#cat inquirer.js >>inquirer-full.js
MY_PATH="`dirname \"$0\"`"
NOW=`date`
cd "$MY_PATH"
echo ">>> $NOW" >> inq.log.txt
echo " Writing header" >> inq.log.txt
echo "Starting minification"
echo "//Inquirer Minified file (C) XWolfOverride 2016"> inquirer.min.js
echo "//MIT License and details on github https://github.com/XWolfOverride/Inquirer">> inquirer.min.js
echo "//">> inquirer.min.js
echo " Writing Merger.js" >> inq.log.txt
uglifyjs --compress --mangle -- Merger.js >> inquirer.min.js
echo " Writing Inquirer.js" >> inq.log.txt
uglifyjs --compress --mangle -- Inquirer.js >> inquirer.min.js
NOW=`date`
echo "<<< $NOW" >> inq.log.txt
echo Done!
