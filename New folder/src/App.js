import './App.css';
import axios from './axios';
import { useEffect, useState } from 'react';
function App() {
  
  const [lang, setLang] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchLangs(){
      const getLangs = await axios.get('/lang');
      setLang(getLangs.data)
    }
    async function fetchSkills(){
      const getSkills = await axios.get('/skills')
      setSkills(getSkills.data)
    }

    fetchLangs()
    fetchSkills()
  }, [])
  console.log(lang)
  console.log(skills)
  
  return (
    <div class="container">
        
        <div class="cvPage">
            
            <div class="header">
                <div class="infoContainer">
                    <h3>Rohaan <span>Farooq</span></h3>
                    <div class="horizontalLine"></div>
                    <p>Full Stack Developer</p>
                </div>
                <img src={require('./picture.jpg')}/>
                <div class="verticalLine"></div>
                <div class="blackBox"></div>
            </div>

            <div class="cvBody">
                
                <div class="leftSection">
                    
                    <div class="infoBar">
                        <div class="phoneContainer">
                            <h5>Phone</h5>
                            <p>0900-78601</p>
                        </div>
                        <div class="emailContainer">
                            <h5>Email</h5>
                            <p>abc@xyz.com</p>
                        </div>
                        <div class="addressContainer">
                            <h5>Address</h5>
                            <p>Lahore, Punjab, Pakistan</p>
                        </div>
                    </div>
                    
                    <div class="contentContainer">
                        <h3 class="bodyTitle">Profile</h3>
                        <p>A full stack developer specializing in MERN Stack, and a team player who makes sure that every project gets completed with the utmost level of hardwork and effort.</p>
                    </div>
                    
                    <div class="contentContainer">
                        <h3 class="bodyTitle">Experience</h3>
                        <div class="experinceContainer">
                            <h5>Head of Development - Present</h5>
                        <h5>ABC Software House</h5>
                        <p>Currently leading the Development department at ABC Software House</p>
                        </div>
                        <div class="experinceContainer">
                            <h5>MERN Stack Developer - 2019</h5>
                        <h5>XYZ Soft</h5>
                        <p>Worked at XYZ Soft till 2019 as their mainstream MERN Stack developer </p>
                        </div>
                    </div>

                    <div class="contentContainer">
                        <h3 class="bodyTitle">Reference</h3>
                        <div class="referenceContainer">
                            <div class="referenceOne">
                                <h5 class="designation">CEO</h5>
                                <h5 class="name">Mr. Ali Ahmad</h5>
                                <h5 class="company">ABC Software House</h5>
                            </div>
                            <div class="referenceTwo">
                                <h5 class="designation">General Manager</h5>
                                <h5 class="name">Mr. M. Ahmad Ali</h5>
                                <h5 class="company">XYZ Soft</h5>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="rightSection">
                    
                    <div class="contentContainer">
                        <h3 class="bodyTitle">Education</h3>
                        <div class="educationContainer">
                            <h5 class="designation">2014-2016</h5>
                                <h5 class="name">Matriculation</h5>
                                <h5 class="company">Crescent Model School</h5>
                        </div>
                        <div class="educationContainer">
                            <h5 class="designation">2017-2019</h5>
                                <h5 class="name">FSc. Pre-Engineering</h5>
                                <h5 class="company">GCU, Lahore</h5>
                        </div>
                    </div>

                    <div class="contentContainer">
                        <h3 class="bodyTitle">Languages</h3>
                        <ul>
                            {lang.map(item => (
                              <li>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div class="contentContainer">
                        <h3 class="bodyTitle">Skills</h3>
                        <ul>
                            {skills.map(item => (
                              <li>{item.name}</li>
                            ))}
                        </ul>
                    </div>

                </div>
                
            </div>

        </div>

    </div>
  );
}

export default App;
