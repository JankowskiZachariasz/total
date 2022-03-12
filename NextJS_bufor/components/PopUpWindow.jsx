import React, { Component } from "react";
import styles from "./PopUpWindow.module.css";

class PopUpWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.window}>{this.props.children}</div>
      </div>
    );
  }
}

export default PopUpWindow;
