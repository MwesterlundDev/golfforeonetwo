const fs = require("fs");
const csv = require('csv-parser');
const path = require("path");
const e = require("express");

const TAG = "ROUND-CSV";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
const dates = ['date']


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

    const filePath = path.join(__dirname, "data", "rounds_04272021.csv");
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            callback(process(results));
        });
}


const process = (data) => {
    var processedData = [];

    console.log(TAG + " rounds data: ", data.length)
    data.forEach((round) => {
        var newObject = {}
        newObject.scores = [];

        for (let prop in round) {
            if (numbers.indexOf(prop) >= 0) {
                var value = Number(round[prop]);
                // throw away anything that is a 0 score
                if (value > 0) {
                    newObject[prop] = value;
                    newObject.scores.push({hole: prop, gross: value});
                }
            } else if (dates.indexOf(prop) >= 0) {
                newObject[prop] = new Date(round[prop]);
            } else {
                newObject[prop] = round[prop];
            }

        }

        console.log(newObject);
        processedData.push(newObject)
    })

    return processedData;

}

module.exports = {
    load
}