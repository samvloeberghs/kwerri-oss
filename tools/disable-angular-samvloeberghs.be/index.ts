import { existsSync, readFileSync, rmSync, cpSync, writeFileSync } from 'fs';
import { join } from 'path';

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
