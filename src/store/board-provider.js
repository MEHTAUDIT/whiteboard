import React from 'react';
import BoardContext from './board-context';
import { TOOL_ITEMS } from '../constants';
import {useReducer } from 'react';
import rough from 'roughjs/bin/rough';

const gen=rough.generator();

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

          const newele={
            id:state.elements.length,
            x1:clientX,
            y1:clientY,
            x2:clientX,
            y2:clientY,
            roughEle:gen.line(clientX, clientY, clientX, clientY),
          };
          return {
            ...state,
            elements: [...state.elements,newele],
          };

        default:
            return state;
    }
}

const initialState = {
  selectedTool: TOOL_ITEMS.LINE,
  elements: [],
};

function BoardProvider({children}) {

  const [boardState,dispatch] = useReducer(boardReducer,initialState);

  function handleSetSelectedTool(tool) {
    // setSelectedTool(tool);
    dispatch({
      type: 'CHANGE_TOOL',
      payload: {
        selectedTool: tool,
      },
    });
  }

  function boardMouseDownHandler(event) {
    
    const clientX = event.clientX;
    const clientY = event.clientY;

    dispatch({
      type: 'DRAW_DOWN',
      payload: {
        clientX,
        clientY,
      },
    })
  } 

  const boardContext = {
    selectedTool: boardState.selectedTool,
    handleSetSelectedTool,
    elements: boardState.elements,
    boardMouseDownHandler,
  };

  return (
    <BoardContext.Provider value={boardContext}>
      {children}
    </BoardContext.Provider>
  );
}

export default BoardProvider;
