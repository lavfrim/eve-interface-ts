interface Url {
    [index: string]: string;
    sourseURL: string;
    universe: string;
    fractions: string;
    systems: string;
    races: string;
    corporations: string;
    characters: string;
};

interface Options {
    [index: string]: string | number;
    id: number;
};

const url: Url = {
    sourseURL: 'https://esi.evetech.net/dev/',
    universe: 'universe', 
    fractions: 'factions',
    systems: 'systems',
    races: 'races',
    corporations: 'corporations',
    characters: 'characters',
};


export const createURL = (adress: string, options?: Options | undefined): string => {
    let fullURL: string = url.sourseURL;
    adress.split('/').forEach((urlPart: string): void => {
        if (!url[urlPart]) {
            throw new Error('wrong url part');
        }
        fullURL += `${url[urlPart]}/`;
    });

    if (options) {
        if (options.id) {
            fullURL += `${options.id}`;
        }
    }

    return fullURL;
}
