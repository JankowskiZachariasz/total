import React, { Component } from "react";
import styles from "./InlineForm.module.css";

class InlineForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
       
    }
    
    render() {
      
      if(this.props.red == true)
      return (

      <div  className={styles.rowInlineForm}>
         <div style={{color:"red", fontWeight:"bold"}} className={styles.formDescriptor}>{this.props.text}</div>
       <div className={styles.limitWidth}>{this.props.children}</div>
      </div>);
      else return (

        <div className={styles.rowInlineForm}>
           <div className={styles.formDescriptor}>{this.props.text}</div>
         <div className={styles.limitWidth}>{this.props.children}</div>
        </div>);
    }
  }
  
  export default InlineForm;
  