
const http = require("https");
const fs = require("fs");

const plugins = [
    { "name": "elementor", "version": "3.6.2" },
    { "name": "WooCommerce", "version": "latest-stable" },
    { "name": "survey-maker", "version": "2.3.0" },
    { "name": "Jetpack", "version": "10.6" }
];

plugins.forEach((plugin) => {
    const { name, version } = plugin;
    const file = fs.createWriteStream(`./plugins/${name}-${version}.zip`);
    const request = http.get(`https://downloads.wordpress.org/plugin/${name}.${version}.zip`, response => {
       response.pipe(file);
    
       // after download completed close filestream
       file.on("finish", () => {
           file.close();
           console.log("Download Completed");
       });
    });
});
