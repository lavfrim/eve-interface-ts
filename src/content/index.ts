interface Text {
    [index: string]: string | object;
    appName: string;
    loading: string;
    buttons: {
        forward: string;
        backward: string;
        close: string;
    };
    card: {
        ceoName: string;
        description: string;
        system: string;
        corporationName: string;
        memberCount: string;
        birthday: string;
        race: string;
    };
};

export const text = {
    appName: 'EVE interface / interview task',
    loading: 'Loading...',
    buttons: {
        forward: '>',
        backward: '<',
        close: 'X',
    },
    card: {
        ceoName: 'CEO name:',
        description: 'Description:',
        system: 'System:',
        corporationName: 'Corporation name:',
        memberCount: 'Member count:',
        birthday: 'Birthday:',
        race: 'Race:',
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