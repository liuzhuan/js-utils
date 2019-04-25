#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

if (process.argv.length < 4) {
    console.log('missing source or target');
    usage();
    process.exit(1);
}

const [source, target] = process.argv.slice(2, 4);

readFile(source, (data) => {
    fs.writeFile(target, data, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Write success into ' + target + '!');
    })
});

function readFile(path, next) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        // console.log(data);
        const output = transform(data);
        // console.log(output);
        next(output);
    })
}

/**
 * transform html into wxml
 * 
 * @param {string} content 
 */
function transform(content) {
    return content.replace(/(<\/?)div\b/g, '$1view')
        .replace(/<(ul|ol|li|p|strong|h[1-6])\b/g, '<view class="$1"')
        .replace(/<\/(ul|ol|li|p|strong|h[1-6])/g, '</view')
        .replace(/@click/g, 'bindtap')
        .replace(/<br\s*>/g, '<view class="br"></view>')
}

function usage() {
    console.log('usage: html-2-wxml source.html target.wxml');
}