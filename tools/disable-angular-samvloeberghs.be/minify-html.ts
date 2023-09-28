import { minify, Options } from 'html-minifier-terser';

const minifyOptions: Options = {
    caseSensitive: true,
    removeComments: true,
    collapseWhitespace: true,
    decodeEntities: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    // don't remove attribute quotes, not all social media platforms can parse this over-optimization
    removeAttributeQuotes: false,
    // don't remove optional tags, like the head, not all social media platforms can parse this over-optimization
    removeOptionalTags: false,
    ignoreCustomComments: [],
    // error when parsing the `<pre>` tags, so we ignore them
    ignoreCustomFragments: [
        /<pre[\s\S]*?<\/pre>/,
    ],
};

export const minifyHtml = (html: string): Promise<string> => {
    return minify(html, minifyOptions);
};
