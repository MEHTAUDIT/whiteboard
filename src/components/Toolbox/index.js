import React from "react";
import classes from './index.module.css';
import { COLORS } from "../../constants";
import cx from 'classnames';
import { useContext } from "react";
import ToolboxContext from "../../store/toolbox-context";
import BoardContext from "../../store/board-context";
import { STROKE_TOOL_TYPES } from "../../constants";
import { FILL_TOOL_TYPES } from "../../constants";

function Toolbox() {

    const {toolboxState,ColorChange,FillChange} = useContext(ToolboxContext);
    const {selectedTool} = useContext(BoardContext);

    const selectedToolState = toolboxState[selectedTool]?.stroke;
    const selectedFillState = toolboxState[selectedTool]?.fill;

    function handleColorChange(selectedTool,color) {
        console.log(color);
        ColorChange(selectedTool,color);
    }

    function handleFillChange(selectedTool,color) {
        console.log(color);
        FillChange(selectedTool,color);
    }

    return <div className={classes.container}>

        { STROKE_TOOL_TYPES.includes(selectedTool) && <div className={classes.selectOptionContainer}>
              <div className={classes.toolBoxLabel}>Stroke</div><div className={classes.colorsContainer}>
                {Object.keys(COLORS).map((k, index) => (

                    <div key={index} className={cx(classes.colorBox, { [classes.activeColorBox]: selectedToolState === COLORS[k] })}
                        style={{ backgroundColor: COLORS[k] }} onClick={() => handleColorChange(selectedTool, COLORS[k])}></div>
                ))}
            </div>
            
            
        </div>
        }
        

        {FILL_TOOL_TYPES.includes(selectedTool) && <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Fill Color</div>
            <div className={classes.colorsContainer}>
                {
                    Object.keys(COLORS).map((k,index)=>(
                        
                        <div key={index} className={cx(classes.colorBox , { [classes.activeColorBox] :selectedFillState === COLORS[k] } )} 
                            style={{backgroundColor: COLORS[k]}} onClick={()=>handleFillChange(selectedTool,COLORS[k])} ></div>
                    ))
                }
            </div>
        </div>}

    </div>;
}

export default Toolbox;

