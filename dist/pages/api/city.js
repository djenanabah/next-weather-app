"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCityApi = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function getCity(req) {
    var name = req.query.name;
    return name;
}
var state = {
    cities: []
};
// The main 'geoname' table has the following fields :
// ---------------------------------------------------
// geonameid         : integer id of record in geonames database
// name              : name of geographical point (utf8) varchar(200)
// asciiname         : name of geographical point in plain ascii characters, varchar(200)
// alternatenames    : alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table, varchar(10000)
// latitude          : latitude in decimal degrees (wgs84)
// longitude         : longitude in decimal degrees (wgs84)
// featureClass     : see http://www.geonames.org/export/codes.html, char(1)
// featureCode      : see http://www.geonames.org/export/codes.html, varchar(10)
// countryCode      : ISO-3166 2-letter country code, 2 characters
// cc2               : alternate country codes, comma separated, ISO-3166 2-letter country code, 200 characters
// admin1Code       : fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(20)
// admin2Code       : code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80) 
// admin3Code       : code for third level administrative division, varchar(20)
// admin4Code       : code for fourth level administrative division, varchar(20)
// population        : bigint (8 byte int) 
// elevation         : in meters, integer
// dem               : digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat.
// timezone          : the iana timezone id (see file timeZone.txt) varchar(40)
// modificationDate : date of last modification in yyyy-MM-dd format
function initCityApi() {
    console.log('initCityApi 0');
    var p = path_1.default.resolve(__dirname, '../../../ressources/cities15000.txt');
    var data = fs_1.default.readFileSync(p, 'utf8');
    console.log('initCityApi A');
    data.split('\n').forEach(function (line) {
        var _a = line.split('\t'), geonameid = _a[0], name = _a[1], asciiname = _a[2], alternatenames = _a[3], latitude = _a[4], longitude = _a[5], featureClass = _a[6], featureCode = _a[7], countryCode = _a[8], cc2 = _a[9], admin1Code = _a[10], admin2Code = _a[11], admin3Code = _a[12], admin4Code = _a[13], population = _a[14], elevation = _a[15], dem = _a[16], timezone = _a[17], modificationDate = _a[18];
        if (!line)
            return;
        //console.log(`foreach ${geonameid} ${name} ${countryCode} ${latitude} ${longitude} ${timezone}`)
        state.cities.push({
            id: parseInt(geonameid),
            name: name,
            lowerCasedName: name.toLowerCase(),
            countryCode: countryCode,
            latitute: parseFloat(latitude),
            longitude: parseFloat(longitude),
            timezone: timezone
        });
    });
    console.log('initCityApi B');
    console.log("Loaded ".concat(state.cities.length, " cities"));
}
exports.initCityApi = initCityApi;
function handler(req, res) {
    var _a;
    var cityName = (_a = getCity(req)) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!cityName) {
        res.status(400).json({
            status: 'error',
            error: 'name QUERY parameter is required'
        });
        return;
    }
    var results = state.cities.filter(function (city) { return city.lowerCasedName.includes(cityName); });
    console.log("Found ".concat(results.length, " cities from ").concat(state.cities.length));
    res.status(200).json({
        status: 'success',
        cities: results.slice(0, 20)
    });
}
exports.default = handler;
