/** Darkmode */
const darkmodeSwitch = document.getElementById("darkmodeSwitch");
const darkmode = document.getElementById("darkmode");
const darkmodePref = localStorage.getItem("darkmode");

if (darkmodePref === null) {
	if (window.matchMedia) {
		darkmode.disabled = window.matchMedia('(prefers-color-scheme: dark)').matches !== true;
	}
}
else {
	darkmode.disabled = darkmodePref !== "true";
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
	if (darkmodePref === null && window.matchMedia) {
		darkmode.disabled = window.matchMedia('(prefers-color-scheme: dark)').matches !== true;
	}
});

darkmodeSwitch.addEventListener('click', () => {
	darkmode.disabled = !darkmode.disabled;
	localStorage.setItem("darkmode", !darkmode.disabled)
});

/** Generate chart function */
function generateChart(bindto, columns, color) {
	c3.generate({
		bindto: bindto,
		point: {
			r: 4
		},
		legend: {
			position: 'bottom'
		},
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

/** Generate charts from data.json */
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
			"orange");

		generateChart(
			"#openPRsChart",
			[
				dateColumn,
				['Open PRs', ...d.map(x => x["openPRs"])]
			],
			"lightblue");

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
