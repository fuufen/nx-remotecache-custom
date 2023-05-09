"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRemoteCacheRetrieve = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const promises_2 = require("stream/promises");
const tar_1 = require("tar");
const get_file_name_from_hash_1 = require("./get-file-name-from-hash");
const COMMIT_FILE_EXTENSION = ".commit";
const COMMIT_FILE_CONTENT = "true";
const extractFolder = async (stream, destination) => {
    await (0, promises_1.mkdir)(destination, { recursive: true });
    return await (0, promises_2.pipeline)(stream, (0, tar_1.extract)({
        C: destination,
        strip: 1,
    }));
};
const writeCommitFile = (destination) => {
    const commitFilePath = destination + COMMIT_FILE_EXTENSION;
    return (0, promises_1.writeFile)(commitFilePath, COMMIT_FILE_CONTENT);
};
const createRemoteCacheRetrieve = (safeImplementation) => async (hash, cacheDirectory) => {
    const implementation = await safeImplementation;
    if (!implementation) {
        return false;
    }
    const file = (0, get_file_name_from_hash_1.getFileNameFromHash)(hash);
    const { fileExists, retrieveFile } = implementation;
    const isFileCached = await fileExists(file);
    if (!isFileCached) {
        return false;
    }
    const stream = await retrieveFile(file);
    const destination = (0, path_1.join)(cacheDirectory, hash);
    if (!stream) {
        return false;
    }
    await extractFolder(stream, destination);
    await writeCommitFile(destination);
    return true;
};
exports.createRemoteCacheRetrieve = createRemoteCacheRetrieve;
