'use strict'

const HoleTable = function() {

    // temporary
    let selectedHole = null;

    const selectedBackgroundColor = (glShark.model.getMobile()) ? d3.rgb(20, 20, 20) : d3.rgb(40, 40, 40);
    const selectedBorderColor = d3.rgb(255, 255, 255);
    const selectedPlainTextColor = d3.rgb(255, 255, 255);

    const baseBorderColor = d3.rgb(220, 220, 220);
    const basePlainTextColor = d3.rgb(220, 220, 220);

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
            name: "Net",
            key: "net",
            isMobile: true,
            width: 200,
        },{
            name: "+/-",
            key: "strokesGained",
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

        const tableRows = tableBody.selectAll(".hole-table-row")
            .data(holes, (d) => {
                return d.hole
            })
            .enter()


        const tableRowDiv = tableRows.append("div")
            .classed("hole-table-row", 1)
            .style("background", (d) => {
                return (d.hole === selectedHole) ? selectedBackgroundColor : "transparent";
            })
            .style("border-color", (d) => {
                return (d.hole === selectedHole) ? selectedBorderColor : baseBorderColor;
            })
            .style("color", (d) => {
                return (d.hole === selectedHole) ? selectedPlainTextColor : basePlainTextColor;
            })
            .on('click', (d) => {

                if (selectedHole == d.hole) {
                    selectedHole = null;
                } else {
                    selectedHole = d.hole;
                }

                update();
            })
            
        tableRowDiv.append("div")
            .classed("hole-table-col", 1)
            .classed("hole-number-col", 1)
            .style("width", (d) => {
                return (100 / columns.length) + "%";
            })
            .text((d) => {
                return d.hole;
            })

        tableRowDiv.append("div")
            .classed("hole-table-col", 1)
            .style("width", (d) => {
                return (100 / columns.length) + "%";
            })
            .text((d) => {
                return d.yards;
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
                return d.average;
            })
    }


    return {
        init,
        update
    }
}