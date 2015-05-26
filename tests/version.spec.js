var version_1 = require('../version');
describe('version object', function () {
    var PACKAGE_PATH = './package.json';
    it('#version', function () {
        expect(version_1.version('./static.json')).toEqual('0.0.0');
    });
    it('#bumpVersionNumber', function () {
        expect(version_1.bumpVersionNumber(version_1.Version.Major, { version: '0.1.1' })).toEqual({ version: '1.0.0' });
    });
    it('#updateStringVersionNumber', function () {
        expect(version_1.updateStringVersionNumber(version_1.Version.Major, '0.2.3')).toEqual('1.0.0');
        expect(version_1.updateStringVersionNumber(version_1.Version.Minor, '1.2.3')).toEqual('1.3.0');
        expect(version_1.updateStringVersionNumber(version_1.Version.Patch, '1.2.3')).toEqual('1.2.4');
    });
    it('#bumpFileVersion', function () {
        var vOld = version_1.version(PACKAGE_PATH);
        vOld = version_1.updateStringVersionNumber(version_1.Version.Major, vOld);
        expect(version_1.bumpFileVersion(PACKAGE_PATH, version_1.Version.Major)).toEqual(vOld);
        vOld = version_1.updateStringVersionNumber(version_1.Version.Minor, vOld);
        expect(version_1.bumpFileVersion(PACKAGE_PATH, version_1.Version.Minor)).toEqual(vOld);
        vOld = version_1.updateStringVersionNumber(version_1.Version.Patch, vOld);
        expect(version_1.bumpFileVersion(PACKAGE_PATH, version_1.Version.Patch)).toEqual(vOld);
    });
});
//# sourceMappingURL=version.spec.js.map