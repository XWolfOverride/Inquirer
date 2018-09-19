#!/bin/bash
#cat merger/core.js > inquirer-full.js
#cat inquirer.js >>inquirer-full.js
MY_PATH="`dirname \"$0\"`"
echo "My Path: $MY_PATH"

#NOW=`date`
#cd "$MY_PATH"
#echo ">>> $NOW" >> inquirer.log.txt
#echo " Writing header" >> inquirer.log.txt
#echo "Starting minification"
#echo "//Inquirer Minified file (C) XWolfOverride 2016"> inquirer.min.js
#echo "//MIT License and details on github https://github.com/XWolfOverride/Inquirer">> inquirer.min.js
#echo "//">> inquirer.min.js
#echo " Writing Merger.js" >> inquirer.log.txt
#uglifyjs --compress --mangle -- Merger.js >> inquirer.min.js
#echo " Writing Inquirer.js" >> inquirer.log.txt
#uglifyjs --compress --mangle -- Inquirer.js >> inquirer.min.js
#NOW=`date`
#echo "<<< $NOW" >> inquirer.log.txt
#ln -s /var/www/web/log/inquirer.txt inq.log.txt 
#echo Done!
