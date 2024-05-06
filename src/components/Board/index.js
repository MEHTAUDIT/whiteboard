import { useContext, useEffect,useRef } from "react";
import rough from 'roughjs';
import  BoardContext  from "../../store/board-provider";

function Board() {

  const canvasRef = useRef();
  const {elements,boardMouseDownHandler} = useContext(BoardContext);
  
  useEffect(() => {

    const canvas=canvasRef.current;
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas=canvasRef.current;
    let roughCanvas = rough.canvas(canvas);
    const context=canvas.getContext('2d');
    context.save();
    elements.forEach((element) => {
        roughCanvas.draw(element);
    });

    return () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

  },[elements]);

  function handleMouseDown(event) {
    console.log(event.clientX,event.clientY);

    const clientX = event.clientX;
    const clientY = event.clientY;

    const canvas=canvasRef.current;
    boardMouseDownHandler({clientX,clientY,canvas});
  }

  return (

    <canvas ref={canvasRef} onMouseDown={handleMouseDown}/>

  );
}

export default Board;
