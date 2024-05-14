import { ARROW_LENGTH, TOOL_ITEMS } from "../../constants";
import rough from 'roughjs/bin/rough';
import { arrowpoint } from "./math";

const gen=rough.generator();

export const createroughelement = (id,x1,y1,x2,y2,{type,stroke,fill}) => {
    const element = {
        id,
        x1,
        y1,
        x2,
        y2,
    };

    let options={
        seed:id+1,
    }

    if(stroke)
        options.stroke=stroke;
    if(fill)
        options.fill=fill;

    switch (type) {
        case TOOL_ITEMS.LINE:
            
            element.roughEle = gen.line(x1, y1, x2, y2,options);
            return element;
        
        case TOOL_ITEMS.RECTANGLE:
            element.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1,options);
            return element;

        case TOOL_ITEMS.CIRCLE:
            const cx=(x1+x2)/2;
            const cy=(y1+y2)/2;
            const rx=x2-x1;
            const ry=y2-y1;
            element.roughEle = gen.ellipse(cx, cy, rx, ry,options);
            return element;

        case TOOL_ITEMS.ARROW:
            const {x3,y3,x4,y4} = arrowpoint(x1, y1, x2, y2, ARROW_LENGTH);

            const points = [
                [x1, y1],
                [x2, y2],
                [x3, y3],
                [x2, y2],
                [x4, y4],
            ];

            element.roughEle = gen.linearPath(points,options);
            return element;
        default:
            break;
    }
}
