const fs = require("fs");
const csv = require('csv-parser');
const path = require("path");

const holeSchema = require("./holes-schema");

const TAG = "HOLE-CSV";

const HOLE = "Hole";
const YARDS = "Yards";
const PAR = "Par";
const AVERAGE = "Average";
const RANK = "Rank";
const EAGLES = "Eagles";
const BIRDIES = "Birdies";
const PARS = "Pars";
const BOGEYS = "Bogeys";
const DOUBLE_BOGIES = "D.Bogeys";
const OTHERS = "Others";

const csvConverter = {}
    csvConverter[HOLE] = holeSchema.HOLE;
    csvConverter[YARDS] = holeSchema.YARDS;
    csvConverter[PAR] = holeSchema.PAR;
    csvConverter[AVERAGE] = holeSchema.AVERAGE;
    csvConverter[RANK] = holeSchema.RANK;
    csvConverter[EAGLES] = holeSchema.EAGLES;
    csvConverter[BIRDIES] = holeSchema.BIRDIES;
    csvConverter[PARS] = holeSchema.PARS;
    csvConverter[BOGEYS] = holeSchema.BOGEYS;
    csvConverter[DOUBLE_BOGIES] = holeSchema.DOUBLE_BOGIES;
    csvConverter[OTHERS] = holeSchema.OTHERS;


/**
 * Returns Hound WAMI Objects  
 * Required Options:  
 * Directory: directory where the csv file live in relation to hound data dir  
 * Filename: name of the csv file  
 * @param {Object} options Options for csv loader  
 * @param {Function} callback 
 */
const load = (callback) => {
    const results = [];

    const filePath = path.join(__dirname, "data", "course-statistics-04272021.csv");
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            callback(process(results));
        });
}


const process = (data) => {

    console.log(TAG + " hole data: ", data.length)

    let processed = data.map((hole) => {
        const newHole = {}
        for (let prop in hole) {
            // console.log("prop: ", prop)
            // console.log("csvConverter[prop]: ", csvConverter[prop])
            newHole[csvConverter[prop]] = hole[prop];
        }

        return newHole;
    })

    return processed;

}

module.exports = {
    load
}