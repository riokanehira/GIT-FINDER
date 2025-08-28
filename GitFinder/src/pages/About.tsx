//import { ROUTES } from "../const";
import icon from "../assets/icon.png"

export default function About() {
  return (
    <div className="card" style={{padding:"40px",}}>
      <div>
        <h2>My Profile</h2>

        <h2 style={{paddingTop:"10px",fontSize:"30px"}}>Rio Kanehira</h2>
      </div>
      <img 
      src={icon}
      style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",       // 丸く切り抜き
          objectFit: "cover",
          margin: "60px",
          float:"right",
          
        }}
       />


      <div style={{paddingTop:"30px",fontSize:"20px"}}>
        <p>Chiba Institute of Technology</p>
        Department of Advanced Media<br/>
        <i style={{color:"#7d7d7d"}}>Media engineering, knowledge engineering, and information design</i>
        


      </div>
    </div>
  )
}
