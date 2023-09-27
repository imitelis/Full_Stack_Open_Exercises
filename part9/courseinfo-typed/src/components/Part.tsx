import { CoursePart } from "../types";

import { Typography, Box, Link } from '@mui/material';

interface PartProps {
    part: CoursePart;
}

const Part = (props: PartProps) => {
    let content: JSX.Element | null = null;

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
    
    switch (props.part.kind) {
        case "basic":
            content = <div><Typography variant="h6" style={{ color: "green", marginTop: "0.5em" }}>{props.part.name} {props.part.exerciseCount}</Typography><Box component="span" fontFamily="Roboto, sans-serif"><em>{props.part.description}</em></Box></div>
            break;
        case "group":
            content = <div><Typography variant="h6" style={{ color: "green", marginTop: "0.5em" }}>{props.part.name} {props.part.exerciseCount}</Typography><Box component="span" fontFamily="Roboto, sans-serif">project exercises {props.part.groupProjectCount}</Box></div>
            break;
        case "background":
            content = <div><Typography variant="h6" style={{ color: "green", marginTop: "0.5em" }}>{props.part.name} {props.part.exerciseCount}</Typography><Box component="span" fontFamily="Roboto, sans-serif"><em>{props.part.description}</em><br/>submit to <Link href={props.part.backgroundMaterial} color="#696969">{props.part.backgroundMaterial}</Link></Box></div>
            break;
        case "advanced":
            content = <div><Typography variant="h6" style={{ color: "green", marginTop: "0.5em" }}>{props.part.name} {props.part.exerciseCount}</Typography><Box component="span" fontFamily="Roboto, sans-serif"><em>{props.part.description}</em><br/>required skills: {props.part.requirements.join(", ")}</Box></div>
            break;
        default:
            assertNever(props.part)
            break;
      }

      return (
        <div>
          {content}
        </div>
      )
  }

export default Part;