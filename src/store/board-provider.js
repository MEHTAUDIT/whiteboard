import React from 'react';
import BoardContext from './board-context';
import { TOOL_ITEMS,TOOL_ACTION_TYPES } from '../constants';
import {useReducer } from 'react';
import { createroughelement } from '../components/utils/element';


function boardReducer(state, action) {

    switch(action.type) {
        case 'CHANGE_TOOL':
            return {
                ...state,
                selectedTool: action.payload.selectedTool,
            };
        case 'DRAW_DOWN':
          const clientX = action.payload.clientX;
          const clientY = action.payload.clientY;
          const strock = action.payload.strock;
          const fill = action.payload.fill;
          const newele= createroughelement(state.elements.length,clientX,clientY,clientX,clientY,
            {type:state.selectedTool,strock:strock,fill:fill});

          console.log(newele);
          return {
            ...state,
            toolactiontype:TOOL_ACTION_TYPES.DRAWING,
            elements: [...state.elements,newele],
          };

        case 'DRAW_MOVE':
          const clientX2 = action.payload.clientX;
          const clientY2 = action.payload.clientY;
          const elements = state.elements;
          const temp=[...elements];
          const index=elements.length-1;
        
          if(index>=0)
          {
            const ele = createroughelement(index,temp[index].x1, temp[index].y1, clientX2, clientY2,
              {type:state.selectedTool,strock:temp[index].strock,fill:temp[index].fill});
            temp[index]=ele;
          }
          

          return {
            ...state,
            elements: temp,
          };

        case 'DRAW_UP':
          return {
            ...state,
            toolactiontype:TOOL_ACTION_TYPES.NONE,
          };
        default:
            return state;
    }
}

const initialState = {
  selectedTool: TOOL_ITEMS.LINE,
  elements: [],
  toolactiontype:TOOL_ACTION_TYPES.NONE ,
};

function BoardProvider({children}) {

  const [boardState,dispatch] = useReducer(boardReducer,initialState);

  function handleSetSelectedTool(tool) {
    dispatch({
      type: 'CHANGE_TOOL',
      payload: {
        selectedTool: tool,
      },
    });
  }

  function boardMouseMove(event) {
    console.log('boardMouseMove');

    const clientX = event.clientX;
    const clientY = event.clientY;

    dispatch({
      type: 'DRAW_MOVE',
      payload: {
        clientX,
        clientY,
      },
    })

  }

  function boardMouseUpHandler(event) {
    console.log('boardMouseUpHandler');

    const clientX = event.clientX;
    const clientY = event.clientY;

    dispatch({
      type: 'DRAW_UP',
      payload: {
        clientX,
        clientY,
      },
    })

  }

  function boardMouseDownHandler(event,toolboxState) {
    
    const clientX = event.clientX;
    const clientY = event.clientY;

    dispatch({
      type: 'DRAW_DOWN',
      payload: {
        clientX,
        clientY,
        strock: toolboxState[boardState.selectedTool]?.stroke,
        fill: toolboxState[boardState.selectedTool]?.fill,
      },
    })
  } 

  const boardContext = {
    selectedTool: boardState.selectedTool,
    handleSetSelectedTool,
    elements: boardState.elements,
    boardMouseDownHandler,
    boardMouseMove,
    toolactiontype: boardState.toolactiontype,
    boardMouseUpHandler,
  };

  return (
    <BoardContext.Provider value={boardContext}>
      {children}
    </BoardContext.Provider>
  );
}

export default BoardProvider;
