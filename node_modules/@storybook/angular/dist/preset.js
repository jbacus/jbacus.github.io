"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescript = exports.core = exports.previewAnnotations = exports.addons = void 0;
const path_1 = require("path");
const wrapForPnP = (input) => (0, path_1.dirname)(require.resolve((0, path_1.join)(input, 'package.json')));
exports.addons = [
    require.resolve('./server/framework-preset-angular-cli'),
    require.resolve('./server/framework-preset-angular-ivy'),
    require.resolve('./server/framework-preset-angular-docs'),
];
const previewAnnotations = (entries = []) => [
    ...entries,
    require.resolve('./client/config'),
];
exports.previewAnnotations = previewAnnotations;
const core = async (config, options) => {
    const framework = await options.presets.apply('framework');
    return {
        ...config,
        builder: {
            name: wrapForPnP('@storybook/builder-webpack5'),
            options: typeof framework === 'string' ? {} : framework.options.builder || {},
        },
    };
};
exports.core = core;
const typescript = async (config) => {
    return {
        ...config,
        skipBabel: true,
    };
};
exports.typescript = typescript;
