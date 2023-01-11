import "../Styles/UserCard.css";
import img from "./464.png";

const UserCard = ({ id, title, image, type }) => {
  const { history } = id;
  const style = `card ${type}`;
  const circleStyle = `${type}cardCircle`;
  const text = `${type}text`;
  return (
    // <div className="background">
    <div className={style}>
      <div className="charID">{/* <p className="IDtext">#{id}</p> */}</div>
      <div className="image">
        <div className={circleStyle}>
          <img className="cardImg" src={img} alt="" />
        </div>
      </div>
      <div className="info">
        <div className="name">
          <p>{title}</p>
        </div>
        <div className="typeName">
          <p className={text}>{type}</p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default UserCard;
