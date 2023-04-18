const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("Function convertHandler.getNum(input)", () => {

        test("Whole Number Input", (done) => {
          let input = "32L";
          assert.equal(convertHandler.getNum(input), 32);
          done();
        });

        test("Decimal Input", (done) => {
            let input = "32.5L";
            assert.equal(convertHandler.getNum(input), 32.5);
            done();
        });

        test("Fractional Input", (done) => {
            let input = "32/8L";
            assert.equal(convertHandler.getNum(input), 32/8);
            done();
        });

        test("Fractional Input With Decimal", (done) => {
            let input = "32.5/8L";
            assert.equal(convertHandler.getNum(input), 32.5/8);
            done();
        });

        test("Double Fraction", (done) => {
            let input = "32/8/2L";
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test("No Number Input", (done) => {
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

    })

    suite("function convertHandler.getUnit(input)", () => {

        test("Unit Input", (done) => {
            let input = [ "gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG" ];
            let testInput = [ "gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg" ];
            console.log(testInput)
            input.forEach((item, index) => {
                assert.equal(convertHandler.getUnit(item), testInput[index]);
            })
            done();
        });

        test("Invalid Unit Input", (done) => {
            let input = "32kaygee"
            assert.equal(convertHandler.getUnit(input), undefined);
            done();
            })
        });

        suite("function convertHandler.getReturnUnit(initUnit)", () => {
            test("Return Unit", (done) => {
                let input = ["gal", "L", "mi", "km", "lbs", "kg"];
                let testInput = ["L", "gal", "km", "mi", "kg", "lbs"];
                input.forEach((item, index) => {
                    assert.equal(convertHandler.getReturnUnit(item), testInput[index])
                })
                done();
            })
        })

        suite("function convertHandler.spellOutUnit(unit)", () => {
            test("Spelled Out String Unit", (done) => {
                let input = ["gal", "L", "mi", "km", "lbs", "kg"];
                let testInput = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
                input.forEach((item, index) => {
                    assert.equal(convertHandler.spellOutUnit(item), testInput[index])
                })
                done();
            })
        })

        suite("function convertHandler.convert(initNum, initUnit)", () => {
            test("Gal to L", (done) => {
                const galToL = 3.78541;
                let input = [5, "gal"];
                let convertedNumber = 18.9271
                assert.approximately(convertHandler.convert(input[0], input[1]), convertedNumber, 0.1);
                done();
            })

            test("L To Gal", (done) => {
                const galToL = 3.78541;
                let input = [32, "L"];
                let convertedNumber = 32 / galToL
                assert.approximately(convertHandler.convert(input[0], input[1]), convertedNumber, 0.1)
                done();
            })

            test("Km To Mi", (done) => {
                const miToKm = 1.60934;
                let input = [32, "km"];
                let convertedNumber = 32 / miToKm
                assert.approximately(convertHandler.convert(input[0], input[1]), convertedNumber, 0.1)
                done();
            })

            test("Mi To Km", (done) => {
                const miToKm = 1.60934;
                let input = [32, "mi"];
                let convertedNumber = 32 * miToKm
                assert.approximately(convertHandler.convert(input[0], input[1]), convertedNumber, 0.1)
                done();
            })

            test("Kg To Lbs", (done) => {
                const lbsToKg = 0.453592;
                let input = [32, "kg"];
                let convertedNumber = 32 / lbsToKg
                assert.approximately(convertHandler.convert(input[0], input[1]), convertedNumber, 0.1);
                done();
            })

            test("Lbs To Kg", (done) => {
                const lbsToKg = 0.453592;
                let input = [32, "lbs"];
                let convertedNumber = 32 * lbsToKg
                assert.approximately(convertHandler.convert(input[0], input[1]), convertedNumber, 0.1);
                done();
                })    
            })
        })
 