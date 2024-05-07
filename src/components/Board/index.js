import { useContext, useEffect,useRef } from "react";
import rough from 'roughjs';
import  BoardContext  from "../../store/board-provider";

function Board() {

  const canvasRef = useRef();
  // const {elements} = useContext(BoardContext);
    const boardContext =  useContext(BoardContext) || null ;
    const elements = boardContext ? boardContext.elements : [];
    const boardMouseDownHandler = boardContext ? boardContext.boardMouseDownHandler : () => {};

  useEffect(() => {

    const canvas=canvasRef.current;
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  }, []);

  useEffect(() => {
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

    boardMouseDownHandler(event);
  }

  return (

    <canvas ref={canvasRef} onMouseDown={handleMouseDown}/>

  );
}

export default Board;
