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