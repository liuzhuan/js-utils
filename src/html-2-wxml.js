#!/usr/bin/env node

/**
 * This util function is used to transform html into wxml format.
 * And it also supports some Vue-flavored attribute, such as v-if, @click,
 * and so on.
 */

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
        .replace(/<\/(ul|ol|li|p|strong|h[1-6])\b/g, '</view')
        .replace(/(<\/?)span\b/g, '$1text')
        .replace(/<br\s*>/g, '<view class="br"></view>')
        .replace(/<img\b([^>]+)\/?>/g, '<image$1/>')
        .replace(/@click/g, 'bindtap')
        .replace(/@change/g, 'bindinput')
        .replace(/v-(if|show)="([^"]+)"/g, 'wx:if="{{ $2 }}"')
        .replace(/v-(if|show)='([^']+)'/g, 'wx:if="{{ $2 }}"')
        .replace(/v-else-if="([^"]+)"/g, 'wx:elif="{{ $1 }}"')
        .replace(/v-else-if='([^']+)'/g, 'wx:elif="{{ $1 }}"')
        .replace(/\bv-else\b/g, 'wx:else')
        .replace(/v-model([^=]+)="([^"]+)"/g, 'data-name="$2"')
        .replace(/\bv-([^=]+)='([^']+)'/g, "data-$1='$2'")
        .replace(/\bv-([^=]+)="([^"]+)"/g, 'data-$1="$2"')
}

function usage() {
    console.log('usage: html-2-wxml source.html target.wxml');
}