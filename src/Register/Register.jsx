import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./register.module.css";
// regex statements: user regex - used for username validation
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,23}$/;

export default function Register() {
  //user referance
  const userRef = useRef();
  //error referance
  const errRef = useRef();
  //state for the user field
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  //whether user focused on input field or not
  const [userFocus, setUserFocus] = useState(false);
  //state for the password field
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  //whether user focused on input field or not
  const [pwdFocus, setPwdFocus] = useState(false);
  //state for the matching password field
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  //whether user focused on input field or not
  const [matchFocus, setMatchFocus] = useState(false);
  //state for an error message
  const [errMsg, setErrMsg] = useState("");
  //state if user successfully submitted the form or not
  const [success, setSuccess] = useState(false);

  //setting the focus on the username input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);
  //validating the username
  useEffect(() => {
    //testing user state against the regex
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);
  //validating the password
  useEffect(() => {
    //testing password state against the regex
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    //comparing password to the match and returning boolean value
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);
  //error message state
  useEffect(() => {
    setErrMsg("");
    //whenever the user changes the information/state of these states inside the dependency array (user, pwd, matchPwd), then the error message will be cleared out, because user has already read error message
  }, [user, pwd, matchPwd]);

  return (
    <section>
      {/*if error exists it will display a message*/}
      <p
        ref={errRef}
        className={errMsg ? styles.errmsg : styles.offscreen}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
        {/*USER INPUT*/}
        <label htmlFor="username">
          Username:
          <span className={validName ? styles.valid : styles.hide}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? styles.hide : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        {/*if name is not valid, this message will come up*/}
        <p
          id="uidnote"
          className={
            userFocus && user && !validName
              ? styles.instructions
              : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        {/*PASSWORD INPUT*/}
        <label htmlFor="password">
          Password:
          <span className={validPwd ? styles.valid : styles.hide}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? styles.hide : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        {/*if password is not valid, this message will come up*/}
        <p
          id="pwdnote"
          className={
            pwdFocus && pwd && !validPwd
              ? styles.instructions
              : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          6 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <label htmlFor="confirm_pwd">
          Confirm Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPwd ? "hide" : "invalid"}
          />
        </label>
        {/*PASSWORD CONFIRMATION INPUT*/}
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={
            matchFocus && !validMatch ? styles.instructions : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button
          disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>
    </section>
  );
}
