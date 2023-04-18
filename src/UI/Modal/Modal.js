import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {/* <h3 style={{ color: "white" }}> Sign In</h3>
        <input text="Email or PhoneNumber"></input>
        <input text="Password"></input>
        <button style={{ backgroundColor: "red" }}>
          <NavLink to="/movies">SIGN IN</NavLink>
  </button> */}
        {props.children}
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
