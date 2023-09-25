import { CoursePart } from "../types";

import Part from "./Part"

interface ContentProps {
    parts: CoursePart[];
}

const Content = (props: ContentProps) => {
    return (
      <div>
        {props.parts.map((part, index) => 
        <Part key={index} part={part}/>
        )}
      </div>
    )
  }

export default Content;