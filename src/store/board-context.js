import { createContext } from "react";

const BoardContext = createContext(
    {
        selectedTool: '',
        elements: [],
        boardMouseDownHandler: () => {},
        handleSetSelectedTool: () => {},
    }
);

export default BoardContext;
