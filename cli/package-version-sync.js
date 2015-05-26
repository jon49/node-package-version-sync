/// <reference path="..\typings\commander\commander.d.ts" />
var version_1 = require('../version');
var fs = require('fs');
var path = require('path');
var addToVersionNumber = [0, 0, 0];
var major = function () { return addToVersionNumber[0]++; };
var minor = function () { return addToVersionNumber[1]++; };
var patch = function () { return addToVersionNumber[2]++; };
var cli = require('commander');
cli
    .option('-f --filename <filename>', 'File to increment version number')
    .option('-M --major', 'Increment major version in package.json', major)
    .option('-m --minor', 'Increment minor version in package.json', minor)
    .option('-p --patch', 'Increment patch version in json file', patch)
    .parse(process.argv);
var fullFilePath = path.join(process.cwd(), cli.filename);
var filePath = path.relative(__dirname, fullFilePath);
var obj = version_1.getObjFromFile(filePath);
var version = obj.version.split('.').map(Number);
if (addToVersionNumber[0] > 0) {
    version[0] += addToVersionNumber[0];
    version[1] = 0;
    version[2] = 0;
}
if (addToVersionNumber[1] > 0) {
    version[1] += addToVersionNumber[1];
    version[2] = 0;
}
if (addToVersionNumber[2] > 0) {
    version[2] += addToVersionNumber[2];
}
obj.version = version.join('.');
console.log('New version number:', obj.version, '\nWritten to:', fullFilePath);
var json = JSON.stringify(obj, null, '\t');
fs.writeFileSync(fullFilePath, json, { encoding: 'utf8' });
//# sourceMappingURL=package-version-sync.js.map