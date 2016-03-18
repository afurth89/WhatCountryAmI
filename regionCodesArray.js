// From https://developers.google.com/chart/interactive/docs/gallery/geochart#continent-hierarchy-and-codes

var regionCodesArray = [
  {
    africa: {
                //  Northern Africa DZ, EG, EH, LY, MA, SD, TN
                "015": ["DZ", "EG", "EH", "LY", "MA", "SD", "TN"],  
                // Western Africa  BF, BJ, CI, CV, GH, GM, GN, GW, LR, ML, MR, NE, NG, SH, SL, SN, TG
                "011": ["BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG"],
                // Middle Africa AO, CD, ZR, CF, CG, CM, GA, GQ, ST, TD
                "017": ["AO", "CD", "ZR", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"],
                // Eastern Africa BI, DJ, ER, ET, KE, KM, MG, MU, MW, MZ, RE, RW, SC, SO, TZ, UG, YT, ZM, ZW
                "014": ["BI", "DJ", "ER", "ET", "KE", "KM", "MG", "MU", "MZ", "RE", "RW", "SC", "SO", "TZ", "UG", "YT", "ZM", "ZW", ""],
                // Southern Africa BW, LS, NA, SZ, ZA
                "018": ["BW", "LS", "NA", "SZ", "ZA"]},
  },{
    europe: {
                // Northern Europe GG, JE, AX, DK, EE, FI, FO, GB, IE, IM, IS, LT, LV, NO, SE, SJ
                "154": ["GG", "JE", "AX", "DK", "EE", "FI", "FO", "GB", "IE", "IM", "IS", "LT", "LV", "NO", "SE", "SJ"],  
                // Western Europe  AT, BE, CH, DE, DD, FR, FX, LI, LU, MC, NL
                "155": ["AT", "BE", "CH", "DE", "DD", "FR", "FX", "LI", "LU", "MC", "NL"],
                //  Eastern Europe  BG, BY, CZ, HU, MD, PL, RO, RU, SU, SK, UA
                "151": ["BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SU", "SK", "UA"],
                //Southern Europe AD, AL, BA, ES, GI, GR, HR, IT, ME, MK, MT, CS, RS, PT, SI, SM, VA, YU
                "039": ["AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "CS", "RS", "PT", "SI", "SM", "VA", "YU"]},
  },{
    americas: {
                // Northern America  BM, CA, GL, PM, US
                "021": ["BM", "CA", "GL", "PM", "US"],  
                // Caribbean AG, AI, AN, AW, BB, BL, BS, CU, DM, DO, GD, GP, HT, JM, KN, KY, LC, MF, MQ, MS, PR, TC, TT, VC, VG, VI
                "029": ["AG", "AI", "AN", "AW", "BB", "BL", "BS", "CU", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "TC", "TT", "VC", "VG", "VI"],
                // Central America BZ, CR, GT, HN, MX, NI, PA, SV
                "013": ["BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"],
                // South America  AR, BO, BR, CL, CO, EC, FK, GF, GY, PE, PY, SR, UY, VE
                "005": ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE"]},
  },{
    asia: {
                // Central Asia  TM, TJ, KG, KZ, UZ
                "143": ["TM", "TJ", "KG", "KZ", "UZ"],  
                // Eastern Asia CN, HK, JP, KP, KR, MN, MO, TW
                "030": ["CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"],
                // Southern Asia AF, BD, BT, IN, IR, LK, MV, NP, PK
                "034": ["AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"],
                // South-Eastern Asia  BN, ID, KH, LA, MM, BU, MY, PH, SG, TH, TL, TP, VN
                "035": ["BN", "ID", "KH", "LA", "MM", "BU", "MY", "PH", "SG", "TH", "TL", "TP", "VN"],
                // Western Asia  AE, AM, AZ, BH, CY, GE, IL, IQ, JO, KW, LB, OM, PS, QA, SA, NT, SY, TR, YE, YD
                "145": ["AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "NT", "SY", "TR", "YE", "YD"]},
  },{
    ocenaia: {
                // Australia and New Zealand  AU, NF, NZ
                "053": ["AU", "NF", "NZ"],  
                // Melanesia  FJ, NC, PG, SB, VU
                "054": ["FJ", "NC", "PG", "SB", "VU"],
                // Micronesia FM, GU, KI, MH, MP, NR, PW
                "057": ["FM", "GU", "KI", "MH", "MP", "NR", "PW"],
                // Polynesia  AS, CK, NU, PF, PN, TK, TO, TV, WF, WS
                "061": ["AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"]}
  }
];


var countryCodesList = {"BD": "AS", "BE": "EU", "BF": "AF", "BG": "EU", "BA": "EU", "BB": "NA", "WF": "OC", "BL": "NA", "BM": "NA", "BN": "AS", "BO": "SA", "BH": "AS", "BI": "AF", "BJ": "AF", "BT": "AS", "JM": "NA", "BW": "AF", "WS": "OC", "BQ": "NA", "BR": "SA", "BS": "NA", "JE": "EU", "BY": "EU", "BZ": "NA", "RU": "EU", "RW": "AF", "RS": "EU", "TL": "OC", "RE": "AF", "TM": "AS", "TJ": "AS", "RO": "EU", "TK": "OC", "GW": "AF", "GU": "OC", "GT": "NA", "GR": "EU", "GQ": "AF", "GP": "NA", "JP": "AS", "GY": "SA", "GG": "EU", "GF": "SA", "GE": "AS", "GD": "NA", "GB": "EU", "GA": "AF", "SV": "NA", "GN": "AF", "GM": "AF", "GL": "NA", "GI": "EU", "GH": "AF", "OM": "AS", "TN": "AF", "JO": "AS", "HR": "EU", "HT": "NA", "HU": "EU", "HK": "AS", "HN": "NA", "VE": "SA", "PR": "NA", "PS": "AS", "PW": "OC", "PT": "EU", "SJ": "EU", "PY": "SA", "IQ": "AS", "PA": "NA", "PF": "OC", "PG": "OC", "PE": "SA", "PK": "AS", "PH": "AS", "PN": "OC", "PL": "EU", "PM": "NA", "ZM": "AF", "EH": "AF", "EE": "EU", "EG": "AF", "ZA": "AF", "EC": "SA", "IT": "EU", "VN": "AS", "SB": "OC", "ET": "AF", "SO": "AF", "ZW": "AF", "SA": "AS", "ES": "EU", "ER": "AF", "ME": "EU", "MD": "EU", "MG": "AF", "MF": "NA", "MA": "AF", "MC": "EU", "UZ": "AS", "MM": "AS", "ML": "AF", "MO": "AS", "MN": "AS", "MH": "OC", "MK": "EU", "MU": "AF", "MT": "EU", "MW": "AF", "MV": "AS", "MQ": "NA", "MP": "OC", "MS": "NA", "MR": "AF", "IM": "EU", "UG": "AF", "TZ": "AF", "MY": "AS", "MX": "NA", "IL": "AS", "FR": "EU", "IO": "AS", "SH": "AF", "FI": "EU", "FJ": "OC", "FK": "SA", "FM": "OC", "FO": "EU", "NI": "NA", "NL": "EU", "NO": "EU", "NA": "AF", "VU": "OC", "NC": "OC", "NE": "AF", "NF": "OC", "NG": "AF", "NZ": "OC", "NP": "AS", "NR": "OC", "NU": "OC", "CK": "OC", "XK": "EU", "CI": "AF", "CH": "EU", "CO": "SA", "CN": "AS", "CM": "AF", "CL": "SA", "CC": "AS", "CA": "NA", "CG": "AF", "CF": "AF", "CD": "AF", "CZ": "EU", "CY": "EU", "CX": "AS", "CR": "NA", "CW": "NA", "CV": "AF", "CU": "NA", "SZ": "AF", "SY": "AS", "SX": "NA", "KG": "AS", "KE": "AF", "SS": "AF", "SR": "SA", "KI": "OC", "KH": "AS", "KN": "NA", "KM": "AF", "ST": "AF", "SK": "EU", "KR": "AS", "SI": "EU", "KP": "AS", "KW": "AS", "SN": "AF", "SM": "EU", "SL": "AF", "SC": "AF", "KZ": "AS", "KY": "NA", "SG": "AS", "SE": "EU", "SD": "AF", "DO": "NA", "DM": "NA", "DJ": "AF", "DK": "EU", "VG": "NA", "DE": "EU", "YE": "AS", "DZ": "AF", "US": "NA", "UY": "SA", "YT": "AF", "UM": "OC", "LB": "AS", "LC": "NA", "LA": "AS", "TV": "OC", "TW": "AS", "TT": "NA", "TR": "AS", "LK": "AS", "LI": "EU", "LV": "EU", "TO": "OC", "LT": "EU", "LU": "EU", "LR": "AF", "LS": "AF", "TH": "AS", "TG": "AF", "TD": "AF", "TC": "NA", "LY": "AF", "VA": "EU", "VC": "NA", "AE": "AS", "AD": "EU", "AG": "NA", "AF": "AS", "AI": "NA", "VI": "NA", "IS": "EU", "IR": "AS", "AM": "AS", "AL": "EU", "AO": "AF", "AS": "OC", "AR": "SA", "AU": "OC", "AT": "EU", "AW": "NA", "IN": "AS", "AX": "EU", "AZ": "AS", "IE": "EU", "ID": "AS", "UA": "EU", "QA": "AS", "MZ": "AF"};



// console.log(regionCodesArray[0].africa[015][3])
// LY

function findRegionCode(val, array) {
  //Iterate through the entire array
  for (var i = 0; i < array.length; i++) {
    //Access the outer key (continent) in that array element
    for (var continent in array[i]) {
      // Iterate over the keys within that outer key
      for (var region in array[i][continent]) {
        console.log(region); // returns "015", "011", ...
        //Iterate through each element in the value array
        for (var j = 0; j < array[i][continent][region].length; j++) {
          //In each element, search through the object's value-array for the "val" parameter
          if (val === array[i][continent][region][j]) {
            //When found, return the key
            return region;
          }
        }
      }
    }
  }
}

function createCountriesObject(countriesObj, countryCodesList) {
  var masterCountriesObj = {};
  for (var keys in countryCodesList) {
    masterCountriesObj[keys] = {
      region: findRegionCode(keys, regionCodesArray)
    };
  }
  return masterCountriesObj;
}

createCountriesObject(regionCodesArray, countryCodesList);


