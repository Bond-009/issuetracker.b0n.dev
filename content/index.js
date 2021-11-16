function generateChart(bindto, columns, color) {
    c3.generate({
        bindto: bindto,
        data: {
            x: 'x',
            columns: columns
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        },
        color: {
            pattern: [color]
        }
    });
}

fetch(`data.json`)
    .then(res => res.json())
    .then(d => {
        var dateColumn = ['x'].concat(d.map(x => x["date"]));

        generateChart(
            "#openIssuesChart",
            [
                dateColumn,
                ['Open Issues', ...d.map(x => x["openIssues"])]
            ],
            "red");

        generateChart(
            "#closedIssuesChart",
            [
                dateColumn,
                ['Closed Issues', ...d.map(x => x["closedIssues"])]
            ],
            "blue");

        generateChart(
            "#openPRsChart",
            [
                dateColumn,
                ['Open PRs', ...d.map(x => x["openPRs"])]
            ],
            "orange");

        generateChart(
            "#closedPRsChart",
            [
                dateColumn,
                ['Closed PRs', ...d.map(x => x["closedPRs"])]
            ],
            "green");
    });
