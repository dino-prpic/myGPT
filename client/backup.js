
// open a file from ../api/backup/query.json
// read the file

const fs = require('fs');
const path = require('path');

const backups = {
    load: function(id) {
        const queryPath = path.join(__dirname, `../api/backup/${id}.json`);
        const query = JSON.parse(fs.readFileSync(queryPath, 'utf8'));
        return query;
    },
    list: function() {
        const queryPath = path.join(__dirname, `../api/backup/`);
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
    }
}

module.exports = backups;