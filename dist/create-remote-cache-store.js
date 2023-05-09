"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRemoteCacheStore = void 0;
const stream_1 = require("stream");
const tar_1 = require("tar");
const get_file_name_from_hash_1 = require("./get-file-name-from-hash");
const archiveFolder = (cwd, folder) => stream_1.Readable.from((0, tar_1.create)({ gzip: true, C: cwd }, [folder]));
const createRemoteCacheStore = (safeImplementation) => async (hash, cacheDirectory) => {
    const implementation = await safeImplementation;
    if (!implementation) {
        return false;
    }
    const file = (0, get_file_name_from_hash_1.getFileNameFromHash)(hash);
    const { storeFile } = implementation;
    const stream = archiveFolder(cacheDirectory, hash);
    await storeFile(file, stream);
    return true;
};
exports.createRemoteCacheStore = createRemoteCacheStore;
