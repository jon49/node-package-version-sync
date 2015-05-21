/// <reference path="typings/typings.d.ts" />
var fs = require('fs');
var _ = require('lodash');
var JSON_FILE_PATH = '../package.json';
var package = JSON.parse(require(JSON_FILE_PATH));
(function (Version) {
    Version[Version["Major"] = 0] = "Major";
    Version[Version["Minor"] = 1] = "Minor";
    Version[Version["Patch"] = 2] = "Patch";
})(exports.Version || (exports.Version = {}));
var Version = exports.Version;
exports.updateStringVersionNumber = function (versionToIncrement, version) {
    var delimiter = '.';
    var v = package.version.split(delimiter);
    // increment and reset version numbers
    v[versionToIncrement]++;
    if (versionToIncrement === Version.Major) {
        v[1] = 0;
        v[2] = 0;
    }
    else if (versionToIncrement === Version.Minor) {
        v[2] = 0;
    }
    return v.join(delimiter);
};
exports.bumpVersionNumber = function (versionToIncrement, obj) {
    return _.assign({ version: exports.updateStringVersionNumber(versionToIncrement, obj.version) }, obj);
};
exports.bumpFileVersion = function (versionToIncrement, fileName) {
    var p = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    var json = JSON.stringify(exports.bumpVersionNumber(versionToIncrement, p));
    fs.writeFileSync(fileName, json, { encoding: 'utf8' });
};
if (!module.parent) {
    var cli = require('commander');
    cli
        .option('-f --filename <filename>', 'File to increment version number')
        .option('-M --major', 'Increment major version in package.json', exports.bumpVersionNumber.bind(null, Version.Major))
        .option('-m --minor', 'Increment minor version in package.json', exports.bumpVersionNumber.bind(null, Version.Minor))
        .option('-p --patch', 'Increment patch version in json file', exports.bumpVersionNumber.bind(null, Version.Patch))
        .parse(process.argv);
    console.log(fs.readFileSync(cli.filename, 'utf8'));
    var x = JSON.parse(fs.readFileSync(cli.filename, 'utf8'));
    var y = _.reduce(_.map(_.keys(Version), function (v) { return v.toLowerCase(); }), function (acc, v) { return cli[v] ? cli[v](acc) : acc; }, x);
    fs.writeFileSync(cli.filename, JSON.stringify(y), { encoding: 'utf8' });
}
//# sourceMappingURL=version.js.map