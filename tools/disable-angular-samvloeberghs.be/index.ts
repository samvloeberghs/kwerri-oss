import { existsSync, readFileSync, rmSync, cpSync, writeFileSync } from 'fs';
import { join } from 'path';
import { minifyHtml } from './minify-html';

const JSON5 = require('json5');
const {
    globSync,
} = require('glob')

const distFolder = './dist/apps/samvloeberghs.be/browser';
const outputFolder = './dist/apps/samvloeberghs.be/angular-disabled';

const escapeRegExp = (text: string): string => {
    // $& means the whole matched string
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getAssets = (): string[] => {

    const statsJsonPath = join(distFolder, 'stats.json');
    const statsJsonPathExists = existsSync(statsJsonPath);

    if (!statsJsonPathExists) {
        const noStatsJsonError = `A stats.json is required for the 'disableAngular' plugin.
Please run 'ng build' with the '--stats-json' flag`;
        console.error(noStatsJsonError);
        throw new Error(noStatsJsonError);
    }

    let assets: any[] = [];
    try {
        assets = JSON5.parse(readFileSync(statsJsonPath, { encoding: 'utf8' }).toString()).assets;
    } catch (e: any) {
        console.error(e);
        throw new Error(e);
    }

    let assetsList: string[] = assets
        .map(entry => entry['name'])
        .filter(entry => entry.includes('.js'));

    assetsList = [...assetsList, ...assetsList.map(asset => {
        return asset.includes('-es5') ?
            asset.replace('-es5', '-es2015') :
            asset.replace('-es2015', '-es5');
    })];
    return assetsList;
}

const disableAngularForGivenRoute = (html: string, assetsList: string[], removeState = true): string => {

    assetsList.forEach(entry => {
        const regex = new RegExp(`<script src="?${escapeRegExp(entry)}"?( type="?module"?)?( nomodule(="")?)?( defer(="")?)?><\/script>`, 'gmi');
        html = html.replace(regex, '');
    });

    if (removeState) {
        // TODO: check
        const regex = new RegExp('<script id="ScullyIO-transfer-state">([\\S\\s]*?)<\\/script>');
        html = html.replace(regex, '');
    }

    return html;
};

// get lists of assets
const assetsList: string[] = getAssets();

// move all to outputFolder
cpSync(distFolder, outputFolder, { recursive: true });

// remove all js files that have a hash in their name
assetsList.forEach(asset => rmSync(`${ outputFolder }/${ asset }`, { force: true }));
assetsList.forEach(asset => rmSync(`${ outputFolder }/${ asset }.map`, { force: true }));

// remove all js file references from all the `index.html` files found
const htmlFiles: string[] = globSync(`${ outputFolder }/**/*.html`)
htmlFiles.forEach(async (file: string) => {
    const disabledHtml = disableAngularForGivenRoute(readFileSync(file).toString(), assetsList);
    const minifiedHtml = await minifyHtml(disabledHtml);
    writeFileSync(file, minifiedHtml);
});

// remove all unneeded files before deployment
rmSync(`${ outputFolder }/stats.json`, { force: true });
rmSync(`${ outputFolder }/3rdpartylicenses.txt`, { force: true });
rmSync(`${ outputFolder }/index.original.html`,{ force: true });

