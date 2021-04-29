'use strict'

const HoleTable = function() {

    // temporary
    const selectedBackgroundColor = (glShark.model.getMobile()) ? d3.rgb(20, 20, 20) : d3.rgb(40, 40, 40);
    const selectedBorderColor = d3.rgb(255, 255, 255);
    const selectedPlainTextColor = d3.rgb(255, 255, 255);

    const baseBorderColor = d3.rgb(220, 220, 220);
    const basePlainTextColor = d3.rgb(220, 220, 220);

    const blueColor = d3.rgb(0, 174, 239);
    const whiteColor = d3.rgb(220, 220, 220);

    const columns = [
        {
            name: "Hole",
            key: "hole",
            isMobile: true,
            width: 200,
        },
        {
            name: "Yards",
            key: "yards",
            isMobile: true,
            width: 200,
        },
        {
            name: "Par",
            key: "par",
            isMobile: true,
            width: 200,
        },
        {
            name: "Average",
            key: "average",
            isMobile: true,
            width: 200,
        },{
            name: "Net +/-",
            key: "net",
            isMobile: true,
            width: 200,
        }
    ]

    const init = () => {
        console.log("INIT HOLE TABLE");

        const header = d3.select("#hole-table-header");

        const headerRow = header.selectAll(".ht-header-col")
            .data(columns)
            .enter();
        
        headerRow.append("div")
            .classed("ht-header-col", 1)
            .style("width", (d) => {
                return (100 / columns.length) + "%";
            })
            .text((d) => {
                return d.name;
            })

        update();

    }

    const update = () => {

        const holes = glShark.model.getHoles();

        console.log("update hole table: ", holes)

        const tableBody = d3.select("#hole-table-body");

        tableBody.selectAll(".hole-table-row").remove();

        const selectedHole = glShark.selection.getSelectedHole();
        let blues = (glShark.model.getTees() === glShark.model.BLUE_TEES);

        console.log("table-selectedHole: ", selectedHole)

        const tableRows = tableBody.selectAll(".hole-table-row")
            .data(holes, (d) => {
                return d.number
            })
            .enter()


        const tableRowDiv = tableRows.append("div")
            .classed("hole-table-row", 1)
            .style("background", (d) => {
                return (selectedHole && d.number === selectedHole.number) ? selectedBackgroundColor : "transparent";
            })
            .style("border-color", (d) => {
                return (selectedHole && d.number === selectedHole.number) ? selectedBorderColor : baseBorderColor;
            })
            .style("color", (d) => {
                return (selectedHole && d.number === selectedHole.number) ? selectedPlainTextColor : basePlainTextColor;
            })
            .on('click', (d) => {
                glShark.selection.select(d.number, glShark.selection.HOLE)
            })
            
        tableRowDiv.append("div")
            .classed("hole-table-col", 1)
            .classed("hole-number-col", 1)
            .style("width", (d) => {
                return (100 / columns.length) + "%";
            })
            .text((d) => {
                return d.number;
            })

        tableRowDiv.append("div")
            .classed("hole-table-col", 1)
            .style("width", (d) => {
                return (100 / columns.length) + "%";
            })
            .style("color", (blues) ? blueColor : whiteColor)
            .text((d) => {
                return (blues) ? d.blueYards : d.whiteYards;
            })

        tableRowDiv.append("div")
            .classed("hole-table-col", 1)
            .style("width", (d) => {
                return (100 / columns.length) + "%";
            })
            .text((d) => {
                return d.par;
            })

        tableRowDiv.append("div")
            .classed("hole-table-col", 1)
            .style("width", (d) => {
                return (100 / columns.length) + "%";
            })
            .text((d) => {
                return Number(d.average).toFixed(2);
            })

        tableRowDiv.append("div")
            .classed("hole-table-col", 1)
            .style("width", (d) => {
                return (100 / columns.length) + "%";
            })
            .text((d) => {
                return ((d.averageNet > 0) ? "+" : "") +  Number(d.averageNet).toFixed(2);
            })
    }


    return {
        init,
        update
    }
}