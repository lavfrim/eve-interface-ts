interface Text {
    [index: string]: string | object;
    app: {
        name: string;
        description: string;
        autor: {
            name: string;
        }
    };
    loading: string;
    buttons: {
        forward: string;
        backward: string;
        close: string;
    };
    factions: string;
    card: {
        ceoName: string;
        description: string;
        system: string;
        corporationName: string;
        memberCount: string;
        birthday: string;
        race: string;
    };
    footer: {
        created: string;
    }
};

export const text: Text = {
    app: {
        name: 'EVE interface',
        description: 'Interview task (with TypeScpipt)',
        autor: {
            name: 'Lazarau Aliaksandr',
        }
    },
    loading: 'Loading...',
    buttons: {
        forward: '>',
        backward: '<',
        close: 'X',
    },
    factions: 'Factions',
    card: {
        ceoName: 'CEO name:',
        description: 'Description:',
        system: 'System:',
        corporationName: 'Corporation name:',
        memberCount: 'Member count:',
        birthday: 'Birthday:',
        race: 'Race:',
    },
    footer: {
        created: 'Created by:',
    }
};

interface PopUpStage {
    [index: string]: number;
}

export const popUpStage: PopUpStage = {
    basic: 0,
    cliked: 1,
    returned: -1,
};