import {version, Version, bumpVersionNumber, updateStringVersionNumber, bumpFileVersion} from '../version'

describe('version object', () => {

    const PACKAGE_PATH = './package.json'

    it('#version', () => {
        expect(version('./static.json')).toEqual('0.0.0')
    })

    it('#bumpVersionNumber', () => {
        expect(bumpVersionNumber(Version.Major, {version: '0.1.1'})).toEqual({version: '1.0.0'})
    })

    it('#updateStringVersionNumber', () => {
        expect(updateStringVersionNumber(Version.Major, '0.2.3')).toEqual('1.0.0')
        expect(updateStringVersionNumber(Version.Minor, '1.2.3')).toEqual('1.3.0')
        expect(updateStringVersionNumber(Version.Patch, '1.2.3')).toEqual('1.2.4')
    })

    it('#bumpFileVersion', () => {
        let vOld = version(PACKAGE_PATH)

        vOld = updateStringVersionNumber(Version.Major, vOld)
        expect(bumpFileVersion(PACKAGE_PATH, Version.Major)).toEqual(vOld)

        vOld = updateStringVersionNumber(Version.Minor, vOld)
        expect(bumpFileVersion(PACKAGE_PATH, Version.Minor)).toEqual(vOld)

        vOld = updateStringVersionNumber(Version.Patch, vOld)
        expect(bumpFileVersion(PACKAGE_PATH, Version.Patch)).toEqual(vOld)
    })
})