import { createContext } from "react";

const BoardContext = createContext(
    {
        selectedTool: '',
        toolactiontype: '',
        elements: [],
        boardMouseDownHandler: () => {},
        handleSetSelectedTool: () => {},
        boardMouseMove: () => {},
    }
);

export default BoardContext;
