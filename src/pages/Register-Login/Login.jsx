import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../api/axios.js";
import { login } from "../../redux/auth/actions.js";
function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();

  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [mail, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email: mail, password: pwd };
      const response = await dispatch(login({ loginData }));
      console.log("login forumda", response.accessToken);
      const accessToken = response.accessToken;
      localStorage.setItem("accessToken", accessToken);
      setMail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  async function handleSub() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("/test", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("response login.jsx: ", response.status);
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        console.log(
          "Token expired or unauthorized, attempting to refresh token..."
        );
        const refreshResponse = await axios.get("/refresh", {
          withCredentials: true,
        });
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        response = await axios.get("/test", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
      }
    }
  }

  async function handleLogout() {
    console.log("entered");
    console.log({
      accessToken: localStorage.getItem("accessToken"),
    });
    const response = await axios.post(
      "/logout",
      {},
      {
        withCredentials: true,
      }
    );
    console.log(response);

    if (response.status(200)) localStorage.removeItem("accessToken");
  }

  return (
    <>
      {/* {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : ( */}
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button className="btn">Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <a href="#">Sign Up</a>
          </span>
        </p>
        <label onClick={handleSub}>
          User Name: Test{" "}
          {localStorage.getItem("accessToken") != "" ? "1" : "0"}
        </label>
        <button className="btn" onClick={handleLogout}>
          {" "}
          Sign out
        </button>
      </section>
    </>
  );
}

export default Login;
