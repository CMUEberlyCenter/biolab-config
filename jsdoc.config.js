'use strict';
module.exports = {
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
    },
    "source": {
        "include": [
            "package.json",
            "README.md",
            "src/sketch.js"
        ],
        "exclude": [
             "node_modules",
             "docs"
        ]
    },
    "plugins": [
        "plugins/markdown"
    ],
    "opts": {
        "destination": "docs",
        "tutorials": "tutorials",
        "verbose": true,
        "recurse": false
    }
}
