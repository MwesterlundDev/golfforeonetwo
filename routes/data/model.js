const holeCsv = require('./holes/holes-csv');
const roundsCsv = require('./rounds/rounds-csv');

const holes = [];
const holeMap = {};
const rounds = [];
const players = [];
const teams = [];

const pingTest = () => {
    return "HELLO FROM MODEL!";
}

const load = () => {

    let loadCount = 2;

    const completed = () => {
        if (loadCount === 0) {
            // do processing

            processData();

        }
    }

    holeCsv.load((data) => {
        data.forEach((hole) => {
            hole.scores = [];

            hole.par = Number(hole.par);

            holeMap[hole.number] = hole;
            holes.push(hole)
        })

        loadCount--;
        completed();
    })

    roundsCsv.load((data) => {
        data.forEach((round) => {
            round.round = Number(round.round);
            rounds.push(round)
        })

        loadCount--;
        completed();
    })


}

const processData = () => {

    rounds.forEach((round) => {
        if (players.indexOf(round.player) < 0) {
            players.push(round.player);
        }

        if (teams.indexOf(round.player) < 0) {
            teams.push(round.player);
        }


        round.scores.forEach((score) => {
            let hole = getHole(score.hole);

            score.net = score.gross - hole.par;

            hole.scores.push({
                player: round.player,
                team: round.team,
                round: round.round,
                gross: score.gross,
                net: score.net,
                type: getType(score.net)
            })
        })


    })

    holes.forEach((hole) => {
        let average = 0;
        let total = 0;
        let counts = {
            eagle: 0,
            birdie: 0,
            par: 0,
            bogey: 0,
            doubleBogey: 0,
            tripleBogey: 0,
        }

        hole.scores.forEach((score) => {
            total += score.gross;

            switch (score.net) {
                case - 2:
                    counts.eagle++;
                    break;
                case -1:
                    counts.birdie++;
                    break;
                case 0:
                    counts.par++;
                    break;
                case 1:
                    counts.bogey++;
                    break;
                case 2:
                    counts.doubleBogey++;
                    break;
                default:
                    counts.tripleBogey++;
                    break;
            }
        })

        hole.average = total / hole.scores.length;
        hole.averageNet = hole.average - hole.par;
        hole.counts = counts;

    })



}

const getHoleData = (number) => {
    return holes;
}

const getHole = (number) => {
    for (let i = 0; i < holes.length; i++) {
        if (holes[i].number === number) {
            return holes[i];
        }
    }
}

const getRoundData = (number) => {
    return rounds;
}

const getPlayers = (number) => {
    return players;
}

const getTeams = (number) => {
    return teams;
}

const getType = (net) => {
    switch (net) {
        case -3:
            return "Double Eagle";
        case -2:
            return "Eagle";
        case -1:
            return "Birdie";
        case 0:
            return "Par";
        case 1:
            return "Bogey";
        case 2:
            return "Double Bogey";
        default:
            return "Triple Bogey";
    }
}

load();

module.exports = {
    pingTest,
    getHoleData,
    getRoundData,
    getPlayers,
    getTeams
}