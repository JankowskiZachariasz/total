import React, { Component } from "react";
import {FormControl, Select, MenuItem,} from "@material-ui/core";



function DropDown({ classes, label, required, opt, index, setIndex }) {
    const [open, setOpen] = React.useState(false);
    const [options, setoptions] = React.useState(new Array());
    // if (opt)
    // console.log(opt)
    // setoptions(opt);


    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    const onChange = (event) => {

        setIndex(event.target.value);
       
    };
  
    return (
      
        <FormControl fullWidth>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={onChange}
            value={index}
          >
           
        

              {
                
                (opt.map((m,i)=>{
                  return <MenuItem key={i} value={m.value}>{m.text}</MenuItem>;
                }))
              }
            
            
            
          </Select>
        </FormControl>
     
    );
  }

  
  export default DropDown;