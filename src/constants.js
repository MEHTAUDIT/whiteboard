export const TOOL_ITEMS = {
    BRUSH: "BRUSH",
    LINE: "LINE",
    RECTANGLE: "RECTANGLE",
    CIRCLE: "CIRCLE",
    ARROW: "ARROW",
    ERASER: "ERASER",
    TEXT: "TEXT",
};

export const BOARD_ACTIONS = {
    CHANGE_TOOL: "CHANGE_TOOL",
    DRAW_DOWN: "DRAW_DOWN",
    DRAW_MOVE: "DRAW_MOVE",
    DRAW_UP: "DRAW_UP",
    UNDO: "UNDO",
    REDO: "REDO",
    SAVE: "SAVE",
};

export const TOOL_ACTION_TYPES = {
    NONE: "NONE",
    DRAWING: "DRAWING",

};

export const ARROW_LENGTH = 20;

export  const COLORS ={
    BLACK: 'black',
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
    YELLOW: 'yellow',
};

export const FILL_TOOL_TYPES = [TOOL_ITEMS.RECTANGLE, TOOL_ITEMS.CIRCLE];
export const STROKE_TOOL_TYPES = [TOOL_ITEMS.LINE, TOOL_ITEMS.ARROW,TOOL_ITEMS.RECTANGLE, TOOL_ITEMS.CIRCLE];

