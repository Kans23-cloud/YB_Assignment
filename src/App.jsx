import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [bio, setBio] = useState({
    name: "Kanthasamy K N",
    age: 19,
    college: "National Engineering College",
    year: "3rd",
  });

  const [about, setAbout] = useState({
    photo: null,
    description: `
      Hello  i am kanthasamy.`
  });

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#f0f0f0",
          padding: "10px 20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/about" style={{ marginRight: "15px" }}>About</Link>
          <Link to="/form">Update Info</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage bio={bio} />} />
          <Route path="/about" element={<AboutPage about={about} />} />
          <Route path="/form" element={<FormPage bio={bio} setBio={setBio} about={about} setAbout={setAbout} />} />
        </Routes>
      </div>
    </Router>
  );
}
function HomePage({ bio }) {
  return (
    <div>
      <h2>My Bio Data</h2>
      <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>{bio.name}</td>
          </tr>
          <tr>
            <td><strong>Age</strong></td>
            <td>{bio.age}</td>
          </tr>
          <tr>
            <td><strong>College</strong></td>
            <td>{bio.college}</td>
          </tr>
          <tr>
            <td><strong>Year</strong></td>
            <td>{bio.year}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function AboutPage({ about }) {
  return (
    <div>
      <h2>About Me</h2>
      {about.photo && (
        <img
          src={about.photo}
          alt="profile"
          style={{ display: "block", marginTop: "10px", marginBottom: "10px", width: "150px", height: "150px" }}
        />
      )}
      <p>{about.description}</p>
    </div>
  );
}

function FormPage({ bio, setBio, about, setAbout }) {
  const [name, setName] = useState(bio.name);
  const [age, setAge] = useState(bio.age);
  const [college, setCollege] = useState(bio.college);
  const [year, setYear] = useState(bio.year);

  const [description, setDescription] = useState(about.description);
  const [photoFile, setPhotoFile] = useState(about.photo);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhotoFile(reader.result);
    reader.readAsDataURL(file);
  };

  const updateInfo = (e) => {
    e.preventDefault();
    setBio({ name, age, college, year });
    setAbout({ photo: photoFile, description });
  };

  return (
    <div>
      <h2>Edit Bio & About Info</h2>
      <form onSubmit={updateInfo} style={{ marginTop: "10px" }}>
        <h3>Bio Data</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
        <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} /><br/>
        <input placeholder="College" value={college} onChange={e => setCollege(e.target.value)} /><br/>
        <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} /><br/>

        <h3 style={{ marginTop: "20px" }}>About Info</h3>
        <input type="file" accept="image/*" onChange={handlePhotoChange} /><br/>
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: "300px", height: "80px", marginTop: "5px" }}
        /><br/>

        <button type="submit" style={{ marginTop: "10px" }}>Update Info</button>
      </form>

      {photoFile && (
        <div style={{ marginTop: "10px" }}>
          <strong>Photo Preview:</strong><br/>
          <img src={photoFile} alt="preview" style={{ width: "150px", height: "150px", marginTop: "5px" }} />
        </div>
      )}
    </div>
  );
}