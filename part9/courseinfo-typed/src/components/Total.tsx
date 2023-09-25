import { CoursePart } from "../types";

import { Box } from '@mui/material';

interface TotalProps {
    parts: CoursePart[];
}

const Total = (props: TotalProps) => {
    return (
      <div>
        <Box fontFamily="Roboto, sans-serif" style={{ color: "darkgreen", marginTop: "0.5em" }}>
          Number of exercises{" "}
          {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </Box>
      </div>
    )
}

export default Total;