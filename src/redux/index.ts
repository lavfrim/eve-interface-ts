import { createStore } from 'redux';


export interface ReduxState {
    message: string | null;
    arrayComponents: JSX.Element[] | null
};

const initialState: ReduxState = {
    message: null,
    arrayComponents: null
}


export const SET_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_ARRAY_COMPONENTS = 'SET_ARRAY_COMPONENTS';


interface SetMessage {
    type: typeof SET_MESSAGE
    payload: string
}

interface SetArrayComponents {
    type: typeof SET_ARRAY_COMPONENTS
    payload: JSX.Element[]
}


export function setMessage(message: string): SetMessage {
    return {
        type: SET_MESSAGE,
        payload: message,
    };
};

export function setArrayComponents(array: JSX.Element[]): SetArrayComponents {
    return {
        type: SET_ARRAY_COMPONENTS,
        payload: array,
    };
};

export type Action = SetMessage | SetArrayComponents


export default function reducer(state = initialState, action: Action): ReduxState {
    switch (action.type) {
      case SET_MESSAGE: return ({...state, message: action.payload});
      case SET_ARRAY_COMPONENTS: return ({...state, arrayComponents: action.payload});
      default: return state;
    }
}

export const store = createStore(
    reducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)