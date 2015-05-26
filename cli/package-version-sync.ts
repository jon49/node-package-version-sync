/// <reference path="..\typings\commander\commander.d.ts" />

import {getObjFromFile} from '../version'
import fs = require('fs')
import path = require('path')

import commander = require('commander')

module Version {
    interface BumpFile {(obj: {version: string}): any}
    export interface CLI extends commander.IExportedCommand {
        filename: string
        major?: BumpFile
        minor?: BumpFile
        patch?: BumpFile
    }
}

var addToVersionNumber = [0, 0, 0]

const major = () => addToVersionNumber[0]++
const minor = () => addToVersionNumber[1]++
const patch = () => addToVersionNumber[2]++

var cli: Version.CLI = require('commander')
cli
    .option('-f --filename <filename>', 'File to increment version number')
    .option('-M --major', 'Increment major version in package.json', major)
    .option('-m --minor', 'Increment minor version in package.json', minor)
    .option('-p --patch', 'Increment patch version in json file', patch)
    .parse(process.argv)

const fullFilePath = path.join(process.cwd(), cli.filename)
const filePath = path.relative(__dirname, fullFilePath)
var obj = getObjFromFile(filePath)

var version: number[] = obj.version.split('.').map(Number)
if (addToVersionNumber[0] > 0)
{
    version[0] += addToVersionNumber[0]
    version[1] = 0
    version[2] = 0
}

if (addToVersionNumber[1] > 0)
{
    version[1] += addToVersionNumber[1]
    version[2] = 0
}

if (addToVersionNumber[2] > 0)
{
    version[2] += addToVersionNumber[2]
}

obj.version = version.join('.')
console.log('New version number:', obj.version, '\nWritten to:', fullFilePath)

const json = JSON.stringify(obj, null, '\t')
fs.writeFileSync(fullFilePath, json, {encoding: 'utf8'})