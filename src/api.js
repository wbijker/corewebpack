var Entry = require('./entry.js')

var api = {
    _entries: [],
    entry: function(src) {
        return this.entries.push(new Entry(src));
    }
}

module.exports = api
