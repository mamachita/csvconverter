#!/usr/bin/env node

var fs = require('fs');

if (process.argv.length <= 2) {
	console.log('Usage: csvconverter.js *.csv');

} else {
	process.argv.slice(2).forEach(function (fileName) {
		if (fileName.toLowerCase().indexOf(".csv") > -1) {
			var out = fs.createWriteStream(fileName.replace(/\.csv/i, '-freeagent.csv'),
				{ encoding: "utf8" });
			var text = fs.readFileSync(fileName, "utf8");

			text.split(/\r?\n/).forEach(function (line) {
				if (!!line) {
					// Split line at , and print parts
					var parts = line.split(',');
					if (!!parts[0] && parts.length >= 18) {
						// date, seperated by slashes
						out.write(parts[0].replace(/-/g, '/') + ',');
						// amount in Euro
						out.write(parts[10] + ',');
						// description
						if (!!parts[3]) {
							out.write(parts[3] + ' - ');
						}
						out.write(parts[17].replace(/\'/g, '').replace(/,/g, '.'));
						out.write('\n');
					}
				}
			});

			out.end();
		}

	});
}

