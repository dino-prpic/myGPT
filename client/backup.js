
// open a file from ./backup/query.json
// read the file

const fs = require('fs');
const path = require('path');

const backups = {
    load: function(id) {
        const queryPath = path.join(__dirname, `./backup/${id}.json`);
        const query = JSON.parse(fs.readFileSync(queryPath, 'utf8'));
        return query;
    },
    list: function() {
        const queryPath = path.join(__dirname, `./backup/`);
        let queries;
        try {
            queries = fs.readdirSync(queryPath);
        } catch (error) {
            console.error('backup folder not found');
            return [];
        }
        // remove the .json extension
        queries.forEach((query, index) => {
            queries[index] = parseInt(query.slice(0, -5));
        });
        queries.sort((a, b) => b + a);
        return queries;
    },
    save: function(query) {
        if (!query.id) return;
        // if folder does not exist, create it
        const queryPath = path.join(__dirname, `./backup/`);
        if (!fs.existsSync(queryPath)) {
            fs.mkdirSync(queryPath);
        }
        // write the file
        const queryFile = path.join(queryPath, `${query.id}.json`);
        fs.writeFileSync(queryFile, JSON.stringify(query), 'utf8');
    }
}

module.exports = backups;