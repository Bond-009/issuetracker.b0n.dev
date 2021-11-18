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
                },
                padding: { left: 0 }
            },
            y: {
                tick: {
                    format: function (e) {
                        if (Math.floor(e) != e || e < 0) {
                            return;
                        }
                        return e;
                    }
                },
                padding: { bottom: 0 }
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
        var dateColumn = ['x', ...d.map(x => x["date"])];

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

        generateChart(
            "#mergedPRsChart",
            [
                dateColumn,
                ['Merged PRs', ...d.map(x => x["mergedPRs"])]
            ],
            "purple");
    });
