import { useContext, useEffect,useRef,useLayoutEffect } from "react";
import rough from 'roughjs';
import BoardContext from "../../store/board-context";
import toolboxContext from "../../store/toolbox-context";

function Board() {

  const canvasRef = useRef();
  const {elements,boardMouseDownHandler,boardMouseMove,toolactiontype,boardMouseUpHandler} = useContext(BoardContext);   
  const {toolboxState} = useContext(toolboxContext);

  useEffect(() => {

    const canvas=canvasRef.current;
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  }, []);

  useLayoutEffect(() => {
    const canvas=canvasRef.current;
    const context=canvas.getContext('2d');
    context.save();
    const roughCanvas = rough.canvas(canvas);
    // const gen = rough.generator();

    elements.forEach((element) => {
        // const roughEle = gen.line(element.x1, element.y1, element.x2, element.y2);
        roughCanvas.draw(element.roughEle);
    });

    return () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

  },[elements]);

  function handleMouseDown(event) {
    console.log(event.clientX,event.clientY);
    // console.log('boardMouseDownHandler',boardMouseDownHandler);
    boardMouseDownHandler(event,toolboxState);
  }

  function handleMouseMove(event) {
    console.log(event.clientX,event.clientY);
    if(toolactiontype === 'DRAWING')
      boardMouseMove(event);
  }

  function handleMouseUp(event) {
    console.log('Mouse Up');
    boardMouseUpHandler(event);
  }

  return (

    <canvas ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}/>

  );
}

export default Board;
