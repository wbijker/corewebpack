var path = require('path');

function getChunkName(src) {
    // Extract filename of src and use as chunkName
    var parsed = path.parse(src);
    return parsed.name
}

function Entry(src, chunk) {
    this.entry = src
    this.chunkName = chunk ? chunk : getChunkName(src)
    this.extracts = []
    this.commons = []
    this.css = null
}

Entry.prototype.extract = function(modules, name) {
    // Extract the given modules or libraries for the given enty
    // into a simular chunk. This does utitlize the CommonsChunk library
    this.extracts.push({
        modules: modules,
        name: name
    })
    return this;
}

Entry.prototype.common = function(name, manifest = true) {
    // Group common code across reference chunk
    this.commons.push({
        name: name,
        manifest: manifest
    })
    return this;
}

Entry.prototype.extractCSS = function(chunkName) {
    // Extract all CSS into seperate chunkName
    // This method can only be called once
    this.css = chunkName
    return this;
}

module.exports = Entry