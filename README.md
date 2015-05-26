# package-version-sync

Automate the updating of your version number of your package with tools.

[![Build Status](https://travis-ci.org/jon49/node-package-version-sync.png?branch=master)](https://travis-ci.org/jon49/node-package-version-sync)

Note that for those interested in a cli version I have one built. Let me know
if you want it published

## Installation

`npm install package-version-sync --save-dev`

## Usage

Note that I'm using newer style node ES6 with TypeScript

```js
import {version, Version, bumpVersionNumber, updateStringVersionNumber,
bumpFileVersion} from 'version'

const PACKAGE_PATH = './package.json'

version('./static.json') // => '0.0.0'

bumpVersionNumber(Version.Major, {version: '0.1.1'})) // => {version: '1.0.0'}

updateStringVersionNumber(Version.Major, '1.2.3')) // => '2.0.0'
updateStringVersionNumber(Version.Minor, '1.2.3')) // => '1.3.0'
updateStringVersionNumber(Version.Patch, '1.2.3')) // => '1.2.4'

var vOld = version(PACKAGE_PATH) // => 0.1.2

bumpFileVersion(PACKAGE_PATH, Version.Major)) // => 1.0.0

bumpFileVersion(PACKAGE_PATH, Version.Minor)) // => 1.1.0

bumpFileVersion(PACKAGE_PATH, Version.Patch)) // => 1.1.1
```