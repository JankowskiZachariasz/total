import React, { Component } from "react";
import styles from "./ArrowButton.module.css";
import Arrow from "../graphics/Arrow.jsx";
import arrow from "../graphics/arrow.svg";
import arrowFaded from "../graphics/arrowFaded.svg";

class ArrowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.enabled ? (
          <div onClick={this.props.zalogujClicked} className={styles.butttonArrowcontainer}>
            <div className={styles.buttonText}>{this.props.text}</div>
            <div className={styles.buttonArrow}>
            {this.props.noArrow?(""):(<Arrow enabled></Arrow>)}
            </div>
          </div>
        ) : (
          <div onClick={this.props.zalogujClicked} className={styles.butttonArrowcontainerFaded}>
            <div className={styles.buttonTextFaded}>{this.props.text}</div>
            <div className={styles.buttonArrow}>
            {this.props.noArrow?(""):(<Arrow ></Arrow>)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ArrowButton;
