import { createContext } from "react";

const toolboxContext = createContext(
    {
        toolboxState: {},
        ColorChange: () => {},
        FillChange: () => {},
    }
);

export default toolboxContext;