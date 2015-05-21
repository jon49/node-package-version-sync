/// <reference path="typings/typings.d.ts" />

import fs = require('fs')
import path = require('path')
import _ = require('lodash')

module Version {
    interface BumpFile {(obj: {version: string}): any}
    export interface CLI extends commander.IExportedCommand {
        filename: string
        major?: BumpFile
        minor?: BumpFile
        patch?: BumpFile
    }
}

const JSON_FILE_PATH = '../package.json'
var package = JSON.parse(require(JSON_FILE_PATH))
export enum Version {Major, Minor, Patch}

export const updateStringVersionNumber = (versionToIncrement: Version, version: string) => {
    const delimiter = '.'
    var v = package.version.split(delimiter)

    // increment and reset version numbers
    v[versionToIncrement]++
    if (versionToIncrement === Version.Major) {
        v[1] = 0
        v[2] = 0
    }
    else if (versionToIncrement === Version.Minor) {
        v[2] = 0
    }

    return v.join(delimiter)
}

export const bumpVersionNumber = (versionToIncrement: Version, obj: {version: string}) =>
    _.assign({version: updateStringVersionNumber(versionToIncrement, obj.version)}, obj)

export const bumpFileVersion = (versionToIncrement: Version, fileName: string) => {
    var p = JSON.parse(fs.readFileSync(fileName, 'utf8'))
    const json = JSON.stringify(bumpVersionNumber(versionToIncrement, p))
    fs.writeFileSync(fileName, json, {encoding: 'utf8'})
}

if (!module.parent) {
    var cli: Version.CLI = require('commander')
    cli
        .option('-f --filename <filename>', 'File to increment version number')
        .option('-M --major', 'Increment major version in package.json', bumpVersionNumber.bind(null, Version.Major))
        .option('-m --minor', 'Increment minor version in package.json', bumpVersionNumber.bind(null, Version.Minor))
        .option('-p --patch', 'Increment patch version in json file', bumpVersionNumber.bind(null, Version.Patch))
        .parse(process.argv)

    console.log(fs.readFileSync(cli.filename, 'utf8'))
    var x = JSON.parse(fs.readFileSync(cli.filename, 'utf8'))
    var y = _.reduce(
        _.map(_.keys(Version), (v) => v.toLowerCase()),
        (acc, v) => cli[v]? cli[v](acc): acc,
        x)
    fs.writeFileSync(cli.filename, JSON.stringify(y), {encoding: 'utf8'})
}