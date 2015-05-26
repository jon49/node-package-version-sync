# package-version-sync

Automate the updating of your version number of your package with tools. CLI or straight node.

## Installation

`npm install package-version-sync --save-dev`

OR

`npm install package-version-sync -g`

## CLI

`-f` relative file path
`-M` major version number
`-m` minor version number
`-p` patch version number

```
// get the package version
./package_version_sync/bin/package-version-sync -f ./package_version_sync/tests/package.json

// => (I didn't create the switch that stops the rewrite of the original version number)
// New version number: 1.5.123
// Written to: ...file/path

// update the version number, bump major by 1, minor by 2 and patch by 3
package-version-sync -f ... -Mmmppp

// => Anytime a higher version number is set it automatically zeroes out lower numbers.
// New version number: 2.2.3
```

## Node

Note that I'm using newer style node ES6 with TypeScript

```js
import {version, Version, bumpVersionNumber, updateStringVersionNumber, bumpFileVersion} from 'version'

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