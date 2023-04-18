
let stringOrNumber = (input) => {

  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0] 

  return [number[0], string]
}

let handleDivision = (input) => {
  let num = input.split('/');
  return num.length > 2 ? false : num;
}


function ConvertHandler() {
  
  this.getNum = function(input) {

    let result =  stringOrNumber(input)[0];
    let numbers = handleDivision(result);
    console.log(numbers)

    if (!numbers) {
      return undefined
    } 

    let numOne = numbers[0];
    let numTwo = numbers[1] || "1"

    if (isNaN(numOne) || isNaN(numTwo)) {
      return undefined
    }

    result = parseFloat(numOne) / parseFloat(numTwo)
    
    return result;
  };
  
  this.getUnit = function(input) {
 
    let result =  stringOrNumber(input)[1].toLowerCase();

    switch(result) {
      case "km":
        return "km";
      case "mi" :
        return "mi";
      case "gal" :
        return "gal";
      case "l":
        return "L";
      case "lbs":
        return "lbs";
      case "kg":
        return "kg";
      default:
        return undefined;            
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit
    switch (result) {
      case "km":
        return "mi";
      case "mi":
        return "km";
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default: return undefined;            
    }
  };

  this.spellOutUnit = function(unit) {
    let result = unit;
    switch (result) {
      case "km":
        return "kilometers";
      case "mi":
        return "miles";
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default: return undefined;            
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let unit = initUnit;
    let num = initNum;
    
    switch (unit) {
      case "km":
        result = num / miToKm;
        break;
      case "mi":
        result = num * miToKm;
        break;
      case "gal":
        result = num * galToL;
        break;
      case "L":
        result = num / galToL;
        break;
      case "lbs":
        result = num * lbsToKg;
        break;
      case "kg":
        result = num / lbsToKg;
        break;
      default: 
      result = undefined;            
    }
    return parseFloat(result.toFixed(5))
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) { 
    console.log(returnUnit)
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
