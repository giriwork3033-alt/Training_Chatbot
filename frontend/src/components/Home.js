import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: "800px",
      margin: "auto",
      padding: "20px",
      textAlign: "center",
      marginTop: "60px"
    }}>

      <h1>Welcome to Tech Training 🚀</h1>

      <p>Learn coding, crack interviews, and build projects</p>

      <div style={{ marginTop: "20px" }}>

        <button
          onClick={() => navigate("/courses")}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
          style={{
            padding: "10px 20px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer"
          }}
        >
          Explore Courses
        </button>

        <button
          onClick={() => navigate("/consultancy")}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
          style={{
            padding: "10px 20px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Get Consultancy
        </button>

      </div>

    </div>
  );
}