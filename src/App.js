import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import BoardProvider from "./store/board-provider";
import ToolboxProvider from "./store/toolbox-provider";
import Toolbox from "./components/Toolbox";

function App() {

  return (
    <BoardProvider>
      <ToolboxProvider>
        <Toolbar />
        <Board />
        <Toolbox/>
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;
