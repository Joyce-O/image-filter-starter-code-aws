import fs, { readdirSync } from 'fs';
import path from 'path';
import Jimp = require('jimp');

const directory = path.join(__dirname, '/tmp/');
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string) {
    const outpath = '/tmp/filtered' + Math.floor(Math.random() * 2000) + '.jpg';

    // add support for very large image files
    const JPEG = require('jpeg-js')
    Jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, {
        maxMemoryUsageInMB: 6144,
        maxResolutionInMP: 600
    })

    return Jimp.read(inputURL)
        .then(image => {
            image
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .write(__dirname + outpath, (img) => {
                });
            return (__dirname + outpath);
        })
        .catch(err => {
            return err;
        });
}
// getAllFilePaths 
//Helper function to get list of files from the newly created folder 
export async function getAllFilePaths() {
    return readdirSync(directory);
}
// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        fs.unlinkSync(directory + file);
    }
}