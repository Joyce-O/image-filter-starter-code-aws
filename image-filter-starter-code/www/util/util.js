"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const Jimp = require("jimp");
const JPEG = require('jpeg-js');
const directory = path_1.default.join(__dirname, '/tmp/');
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
function filterImageFromURL(inputURL) {
    return __awaiter(this, void 0, void 0, function* () {
        const outpath = '/tmp/filtered' + Math.floor(Math.random() * 2000) + '.jpg';
        // add support for very large image files in order to prevent memory exceeded error
        // This idea was gotten from a suggested solution on Jimp issues tab on github
        // https://github.com/oliver-moran/jimp/issues/915
        Jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, {
            maxMemoryUsageInMB: 7000,
            maxResolutionInMP: 600
        });
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
    });
}
exports.filterImageFromURL = filterImageFromURL;
// getAllFilePaths 
//Helper function to get list of files from the newly created folder 
function getAllFilePaths() {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_1.readdirSync(directory);
    });
}
exports.getAllFilePaths = getAllFilePaths;
// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
function deleteLocalFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let file of files) {
            fs_1.default.unlinkSync(directory + file);
        }
    });
}
exports.deleteLocalFiles = deleteLocalFiles;
//# sourceMappingURL=util.js.map