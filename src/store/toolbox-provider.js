import React from 'react';
import ToolboxContext from './toolbox-context';
import {useReducer } from 'react';
import { COLORS } from '../constants';
import { TOOL_ITEMS } from '../constants';

function toolboxReducer(state, action) {

    switch(action.type) {
        case 'CHANGE_STROKE':

            const newstate = {...state};
            newstate[action.payload.tool].stroke = action.payload.stroke;
            return newstate;

        case 'CHANGE_FILL':
                
            const newstate2 = {...state};
            newstate2[action.payload.tool].fill = action.payload.fill;
            return newstate2;

        default:
            return state;
    }
}

const initialState = {
    [TOOL_ITEMS.LINE]: {
        stroke: COLORS.BLACK,
        fill: null,
        size: 1,
    },
    [TOOL_ITEMS.RECTANGLE]: {
        stroke: COLORS.YELLOW,
        fill: null,
        size: 1,
    },
    [TOOL_ITEMS.CIRCLE]: {
        stroke: COLORS.GREEN,
        fill: null,
        size: 1,
    },
    [TOOL_ITEMS.ARROW]: {
        stroke: COLORS.RED,
        size: 1,
    },
};

function ToolboxProvider({children}) {
 
    const [toolboxState,dispatch] = useReducer(toolboxReducer,initialState);

    const toolboxContext={
        toolboxState,
        ColorChange,
        FillChange,
    };

    function ColorChange(tool,stroke) {

        dispatch({
            type: 'CHANGE_STROKE',
            payload: {
                tool,
                stroke,

            }
        });

    }

    function FillChange(tool,fill) {

        dispatch({
            type: 'CHANGE_FILL',
            payload: {
                tool,
                fill,
            }
        });

    }

    return (
        <ToolboxContext.Provider value={toolboxContext}>
            {children}
        </ToolboxContext.Provider>
    );
}

export default ToolboxProvider;
