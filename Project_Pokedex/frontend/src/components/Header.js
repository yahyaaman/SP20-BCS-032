import "../Styles/Header.css";
import "../Styles/Buttons.scss";
import { Link } from "react-router-dom";
import MyPokemons from "../pages/MyPokemons";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
// import pixel from "../images/pixel.png";
const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div className="header">
      <Link className="btn" to={`/`}>
        <div className="logo-container">
          <img
            src={
              "https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"
            }
            width="40px"
          />
        </div>
      </Link>

      <div className="heading">{/* <p>Pokedex</p> */}</div>

      {!isLoggedIn && (
        <Link
          onClick={() => dispath(authActions.logout())}
          to="/login"
          id="animated-btn"
        >
          Login
        </Link>
      )}

      {isLoggedIn && (
        <>
          <Link id="animated-btn" to="/mypokemons">
            My Profile
          </Link>

          <Link
            onClick={() => dispath(authActions.logout())}
            to="/login"
            id="animated-btn"
          >
            Logout
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
