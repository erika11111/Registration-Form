import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  //setting focus on user input when component loads
  const userRef = useRef();
  //setting focus for error for screenreader to read if an error occurs
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // set focus on first input when component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);
  //emty out any error messages if user changes the user state or the password state
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  //asynchronous function receives an event and then prevents the default behaviour of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser("");
    setPwd("");
    setSuccess(true);
  };
  return (
    <>
      {/*Checking success state, if its true, the page will show this section element, if its false then it will show form page*/}
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home Page</a>
          </p>
        </section>
      ) : (
        <section>
          {/*error message display */}
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            {/*USERNAME FORM */}
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            {/*PASSWORD INPUT */}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an account? <br />
            <span className="line">
              <Link to="/">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}
