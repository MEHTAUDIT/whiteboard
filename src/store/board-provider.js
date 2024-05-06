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
          const newele={
            id:state.elements.length,
            x1:action.payload.clientX,
            y1:action.payload.clientY,
            x2:action.payload.clientX,
            y2:action.payload.clientY,
            roughElement:gen.line(action.payload.clientX, action.payload.clientY, action.payload.clientX, action.payload.clientY),

          }
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
    
    const {clientX, clientY} = event;

    const roughElement = gen.line(clientX, clientY, clientX, clientY);
    
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
