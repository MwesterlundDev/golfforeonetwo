const holeCsv = require('./holes/holes-csv');

const holes = []

const pingTest = () => { 
    return "HELLO FROM MODEL!";
}

const load = () => {
    holeCsv.load((data) => {
        data.forEach((hole) => {
            holes.push(hole)
        })
    })
}

const getHoleData = (number) => {

    return holes;

}

load();

module.exports = {
    pingTest,
    getHoleData
}