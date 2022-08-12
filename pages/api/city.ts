// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

type CityEntry = {
    id: number,
    name: string,
    lowerCasedName: string,
    countryCode: string,
    latitute: number,
    longitude: number,
    timezone: string,
    ranking: number
}

type SuccessResponse = {
    status: 'success'
    cities: CityEntry[]
}

type ErrorResponse = {
    status: 'error'
    error: string
}

type Response = SuccessResponse | ErrorResponse

type CityRequest = {
    name: string
}

function getCity(req: NextApiRequest): string | undefined {
    const { name } = req.query as CityRequest
    return name
}

type State = {
    initialized: boolean,
    cities: CityEntry[]
}

const state: State = {
    initialized: false,
    cities: []
}

if (!state.initialized) {
    state.initialized = true
    initCityApi()
}

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


export function initCityApi() {
    const p = path.resolve(__dirname, '../../../../ressources/cities15000.txt')
    const data = fs.readFileSync(p, 'utf8');

    data.split('\n').forEach(line => {
        const [
            geonameid,
            name,
            asciiname,
            alternatenames,
            latitude,
            longitude,
            featureClass,
            featureCode,
            countryCode,
            cc2,
            admin1Code,
            admin2Code,
            admin3Code,
            admin4Code,
            population,
            elevation,
            dem,
            timezone,
            modificationDate
        ] = line.split('\t')

        if (!line) return

        //console.log(`foreach ${geonameid} ${name} ${countryCode} ${latitude} ${longitude} ${timezone}`)

        state.cities.push({
            id: parseInt(geonameid),
            name,
            lowerCasedName: name.toLowerCase(),
            countryCode,
            latitute: parseFloat(latitude),
            longitude: parseFloat(longitude),
            timezone,
            ranking: parseInt(population)
        })

    })

    state.cities.sort((a, b) => b.ranking - a.ranking)

    console.log(`Loaded ${state.cities.length} cities`)
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
    const cityName = getCity(req)?.toLowerCase()
    if (!cityName) {
        res.status(400).json({
            status: 'error',
            error: 'name QUERY parameter is required'
        })
        return
    }



    const results = state.cities.filter(city => city.lowerCasedName.includes(cityName))

    console.log(`Found ${results.length} cities from ${state.cities.length}`)

    res.status(200).json({
        status: 'success',
        cities: results.slice(0, 20)
    })
}
