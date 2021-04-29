const fs = require("fs");
const csv = require('csv-parser');
const path = require("path");

const holeSchema = require("./holes-schema");

const TAG = "HOLE-CSV";



/**
 * Returns Hole Objects
 * Required Options:  
 * Directory: directory where the csv file live in relation to hound data dir  
 * Filename: name of the csv file  
 * @param {Object} options Options for csv loader  
 * @param {Function} callback 
 */
const load = (callback) => {
    const results = [];

    const filePath = path.join(__dirname, "data", "course_pridge.csv");
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            callback(process(results));
        });
}


const process = (data) => {

    console.log(TAG + " hole data: ", data.length)
    data.forEach((hole) => {
        console.log(hole);
    })

    return data;

}

module.exports = {
    load
}