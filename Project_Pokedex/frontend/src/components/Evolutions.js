import "../Styles/Evolutions.css";
import img from "../components/464.png";

const Evolutions = () => {
  return (
    <div className="evolutionsBody">
      <div className="evolution1">
        <div className="evocharacterImg">
          <div id="evocircle">
            <img className="evoimg" src={img} alt="" />
          </div>
        </div>
        <p>#116</p>
        <p>Horsea</p>
      </div>
      <div className="evolution2">
        <div className="evocharacterImg">
          <div id="evocircle">
            <img className="evoimg" src={img} alt="" />
          </div>
        </div>
        <p>#117</p>
        <p>Seadra</p>
      </div>
      <div className="evolution3">
        <div className="evocharacterImg">
          <div id="evocircle">
            <img className="evoimg" src={img} alt="" />
          </div>
        </div>
        <p>#230</p>
        <p>Kingdra</p>
      </div>
    </div>
  );
};

export default Evolutions;
