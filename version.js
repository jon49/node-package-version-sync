/// <reference path="typings/typings.d.ts" />
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var stripBom = require('strip-bom');
var filePath = function (fileName) { return path.join(path.dirname(module.parent.filename), fileName); };
exports.getObjFromFile = function (fileName) { return JSON.parse(stripBom(fs.readFileSync(filePath(fileName), 'utf8'))); };
(function (Version) {
    Version[Version["Major"] = 0] = "Major";
    Version[Version["Minor"] = 1] = "Minor";
    Version[Version["Patch"] = 2] = "Patch";
})(exports.Version || (exports.Version = {}));
var Version = exports.Version;
exports.updateStringVersionNumber = function (versionToIncrement, version) {
    var delimiter = '.';
    var v = version.split(delimiter);
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
    return _.assign(obj, { version: exports.updateStringVersionNumber(versionToIncrement, obj.version) });
};
exports.version = function (fileName) { return exports.getObjFromFile(fileName).version; };
exports.bumpFileVersion = function (fileName, versionToIncrement) {
    var p = exports.getObjFromFile(fileName);
    var v = exports.bumpVersionNumber(versionToIncrement, p);
    var json = JSON.stringify(v, null, '\t');
    fs.writeFileSync(filePath(fileName), json, { encoding: 'utf8' });
    return v.version;
};
//# sourceMappingURL=version.js.map