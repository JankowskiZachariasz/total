import React, { Component } from "react";
import styles from "./TextInputBox.module.css"
import {FormControl, Input} from "@material-ui/core";



function TextInputBox({ placeholder, type,change,value, error }) {

  
    return (
      
        <FormControl fullWidth>
        <Input
          error={error}
          value={value}
          onChange={change}
          required={true}
          type={type}
          multiline={false}
          placeholder={placeholder}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
     
    );
  }

  
  export default TextInputBox;