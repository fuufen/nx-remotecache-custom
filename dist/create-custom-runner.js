"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomRunner = void 0;
const default_1 = __importDefault(require("@nx/workspace/tasks-runners/default"));
const create_remote_cache_retrieve_1 = require("./create-remote-cache-retrieve");
const create_remote_cache_store_1 = require("./create-remote-cache-store");
const get_safe_remote_cache_implementation_1 = require("./get-safe-remote-cache-implementation");
const createRemoteCache = (implementation, options) => {
    const safeImplementation = (0, get_safe_remote_cache_implementation_1.getSafeRemoteCacheImplementation)(implementation, options);
    return {
        retrieve: (0, create_remote_cache_retrieve_1.createRemoteCacheRetrieve)(safeImplementation),
        store: (0, create_remote_cache_store_1.createRemoteCacheStore)(safeImplementation),
    };
};
const createCustomRunner = (setup) => (tasks, options, context) => (0, default_1.default)(tasks, {
    ...options,
    remoteCache: createRemoteCache(setup(options), options),
}, context);
exports.createCustomRunner = createCustomRunner;
