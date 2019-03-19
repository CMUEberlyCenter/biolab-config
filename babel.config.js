const { aliases } = require('./alias.config.js');
const path = require('path');
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
    "plugins": [
        [
            "module-resolver", {
                "alias": aliases,
            }
        ]
    ]
};
