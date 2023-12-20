let formatNumberMinorPart = (value, len) => {
    while (value.length < len)
        value = `${value}0`

    return value.substr(0, len)
}

let formatNumberMajorPart = value => {
    let result = ''
    value = value.split('').reverse().join('')
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 3 === 0)
            result = `${result} `
        result = `${result}${value[i]}`
    }

    if (result.length && result[result.length - 1] === ' ')
        result = result.substr(0, result.length - 1)

    return result.split('').reverse().join('')
}

let decimalToString = value => {
    if (value === null || value === undefined)
        return "";

    let major = value.toString();
    let commaIndex = major.replace(",", ".").indexOf(".");

    // minor part
    let minor = "";
    if (commaIndex > -1) {
        minor = major.substr(commaIndex + 1);
        major = major.substr(0, commaIndex);
    }

    major = formatNumberMajorPart(major)
    minor = formatNumberMinorPart(minor, 2)

    return `${major}.${minor}`
}

let decimalNoTrim = value => {
    if (value === null || value === undefined)
        return "";

    let major = value.toString();
    let commaIndex = major.replace(",", ".").indexOf(".");

    // minor part
    let minor = "";
    if (commaIndex > -1) {
        minor = major.substr(commaIndex + 1);
        major = major.substr(0, commaIndex);
    }

    major = formatNumberMajorPart(major)

    if (minor.length === 0)
        return major

    minor = formatNumberMinorPart(minor, minor.length)
    return `${major}.${minor}`
}

let ceilDecimalToString = value => {
    if (value === null || value === undefined)
        return "";

    let major = value.toString();
    let commaIndex = major.replace(",", ".").indexOf(".");

    if (commaIndex > -1)
        major = major.substr(0, commaIndex);

    major = formatNumberMajorPart(major)

    return major
}

let stringToNumber = (val) => {
    return parseInt(val);
}

let stringToBoolean = (val) => {
    return val === 'true'
}

export default  {
    decimalToString: decimalToString,
    ceilDecimalToString: ceilDecimalToString,
    decimalNoTrim: decimalNoTrim,
    stringToNumber: stringToNumber,
    stringToBoolean: stringToBoolean,
}