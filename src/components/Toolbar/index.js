import React from 'react';
import classes from './index.module.css';
import cx from 'classnames';
import {LuRectangleHorizontal} from 'react-icons/lu';
import { useContext } from 'react';
import BoardContext from '../../store/board-context';
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
  FaEraser,
  FaUndoAlt,
  FaRedoAlt,
  FaFont,
  FaDownload,
}from 'react-icons/fa';

function Toolbar() {

  const {selectedTool,handleSetSelectedTool} = useContext(BoardContext);

  return (
    <div className={classes.container}>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'BRUSH'})} 
        onClick={()=>handleSetSelectedTool("BRUSH")}><FaPaintBrush /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'LINE'})} 
        onClick={()=>handleSetSelectedTool("LINE")}><FaSlash /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'RECTANGLE'})}
        onClick={()=>handleSetSelectedTool("RECTANGLE")}><LuRectangleHorizontal /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'CIRCLE'})} 
        onClick={()=>handleSetSelectedTool("CIRCLE")}><FaRegCircle /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'ARROW'})}
        onClick={()=>handleSetSelectedTool("ARROW")}><FaArrowRight /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'ERASER'})}
        onClick={()=>handleSetSelectedTool("ERASER")}><FaEraser /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'TEXT'})}
        onClick={()=>handleSetSelectedTool("TEXT")}><FaFont /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'UNDO'})}
        onClick={()=>handleSetSelectedTool("UNDO")}><FaUndoAlt /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'REDO'})}
        onClick={()=>handleSetSelectedTool("REDO")}><FaRedoAlt /></div>

      <div className={cx(classes.toolItem, {[classes.active]: selectedTool === 'SAVE'})}
        onClick={()=>handleSetSelectedTool("SAVE")}><FaDownload /></div>

    </div>
  );
}

export default Toolbar;
