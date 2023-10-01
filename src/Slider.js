import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

var rounds;

function DSlider() {
  const [value, setValue] = React.useState(1);
  rounds=value;

  function handleChange(event, value){
    setValue(value);
    rounds=value;
  };
  
  return (
    <Box className="horizontal-slider">
      <Slider
        // aria-label="Temperature"
        defaultValue={1}
        valueLabelDisplay="on"
        step={1}
        marks={true}
        min={1}
        max={10}
        value={value} 
        onChange={handleChange}
        sx={{
          width: 300,
          color: "black",
        }}
      />
    </Box>
  );
}

export default DSlider;
export {rounds};