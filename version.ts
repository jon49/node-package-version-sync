/// <reference path="typings/typings.d.ts" />

import fs = require('fs')
import path = require('path')
import _ = require('lodash')

const stripBom = require('strip-bom')

const filePath = (fileName: string) => path.join(path.dirname(module.parent.filename), fileName)
export const getObjFromFile = (fileName: string) => JSON.parse(stripBom(fs.readFileSync(filePath(fileName), 'utf8')))

export enum Version {Major, Minor, Patch}

export const updateStringVersionNumber = (versionToIncrement: Version, version: string) => {
    const delimiter = '.'
    var v = <number[]><any> version.split(delimiter)

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
    _.assign(obj, {version: updateStringVersionNumber(versionToIncrement, obj.version)})

export const version = (fileName: string) => getObjFromFile(fileName).version

export const bumpFileVersion = (fileName: string, versionToIncrement: Version) => {
    var p = <{version: string}> getObjFromFile(fileName)
    var v = <{version: string}> bumpVersionNumber(versionToIncrement, p)
    const json = JSON.stringify(v, null, '\t')
    fs.writeFileSync(filePath(fileName), json, {encoding: 'utf8'})
    return v.version
}