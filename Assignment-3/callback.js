// input.js (ES6 version with callbacks)
import { readFile } from 'fs';

function readUserFile(callback) {
    readFile('user.json', 'utf8', (err, data) => {
        if (err) return callback(err);
        callback(null, JSON.parse(data));
    });
}

readUserFile((err, user) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('User:', user);
    }
});
