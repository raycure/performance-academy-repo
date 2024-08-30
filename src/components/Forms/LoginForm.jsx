import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../../pages/api/axios.js";
import { login } from "../../redux/auth/actions.js";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import logo from "../../assets/LesmillsLogo.png";
import "./Form.css";
function LoginForm() {
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

    if (response.status === 200) {
      localStorage.removeItem("accessToken");
    }
  }
  // BENIM DEGIL
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
      <form onSubmit={handleSubmit} className="authentication-form">
        <img alt="logo" className="logo" src={logo}></img>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Giriş Yapın</h1>
        <div className="centerLineAnimation">
          <input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
            required
            placeholder="Email"
          />
        </div>
        <div className="centerLineAnimation">
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            placeholder="Şifre"
          />
        </div>
        <div className="authentication-button-container">
          <Button>Giriş Yapın</Button>
          <Link to="/register" className="fs-400 text-align-right">
            Bir hesabınız yok mu? <br />
            Buradan kaydolun!
          </Link>
        </div>
        <label onClick={handleSub}>
          <br /> User Name: Test{" "}
          {localStorage.getItem("accessToken") != "" ? "1" : "0"}
        </label>
        <Button onClick={handleLogout}>Çıkış Yapın</Button>
      </form>
    </>
  );
}

export default LoginForm;
