import { dirname, join } from 'path';
const wrapForPnP = (input) => dirname(require.resolve(join(input, 'package.json')));
export const addons = [
    require.resolve('./server/framework-preset-angular-cli'),
    require.resolve('./server/framework-preset-angular-ivy'),
    require.resolve('./server/framework-preset-angular-docs'),
];
export const previewAnnotations = (entries = []) => [
    ...entries,
    require.resolve('./client/config'),
];
export const core = async (config, options) => {
    const framework = await options.presets.apply('framework');
    return {
        ...config,
        builder: {
            name: wrapForPnP('@storybook/builder-webpack5'),
            options: typeof framework === 'string' ? {} : framework.options.builder || {},
        },
    };
};
export const typescript = async (config) => {
    return {
        ...config,
        skipBabel: true,
    };
};
