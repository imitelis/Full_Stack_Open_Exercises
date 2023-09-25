import { Typography } from '@mui/material';

interface HeaderProps {
    name: string;
}

const Header = (props: HeaderProps) => {
    return (
      <div>
        <Typography variant="h3" style={{ marginTop: "0.5em", color: "green" }}>
          Course Info
        </Typography>
        <Typography variant="h4" style={{ marginTop: "0.25em", color: "green" }}>
          {props.name}
        </Typography>
      </div>
    )
  }

export default Header;