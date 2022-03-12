import React, { Component } from "react";
import styles from "./Prompt.module.css";
const cross = "./graphics/cross.svg";


class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
     
            <div className={this.props.showPrompt?("loginPrompt"):("loginPrompt promptHide")}>
                    <div className={styles.inlinePrompt}>{this.props.prompttext}</div>
                    <div className={styles.inlinePrompt}><img onClick={()=>this.props.hidePrompt()} src={cross} className={styles.cross} alt="logo" height="15" /></div>
            </div>
      

    );
  }
}

export default Prompt;
