import React, { useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Authentication({ isLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "http://localhost:5000/api/login" : "http://localhost:5000/api/register";
      const data = isLogin ? { email, password } : { name, email, password };

      const response = await axios.post(url, data);
      console.log(response.data);

      if (isLogin) {
        navigate("/dashboard"); // Redirect after login
      } else {
        navigate("/"); // Redirect to login after register
      }
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Registration"} failed:`, error.response ? error.response.data : error.message);
    }
  };

  return (
    <MDBContainer fluid className="d-flex flex-column justify-content-center align-items-center vh-100">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol col="12">
          <MDBCard className="bg-white mx-auto" style={{ borderRadius: "1rem", maxWidth: "400px" }}>
            <MDBCardBody className="p-4">
              <h2 className="fw-bold mb-2 text-center">{isLogin ? "Sign In" : "Register"}</h2>

              {!isLogin && (
                <MDBInput wrapperClass="mb-3" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              )}

              <MDBInput wrapperClass="mb-3" label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass="mb-3" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              {isLogin && <MDBCheckbox name="rememberMe" id="rememberMe" className="mb-3" label="Remember me" />}

              <MDBBtn className="w-100 mb-2" onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</MDBBtn>

              <p className="text-center">
                {isLogin ? "Not a user?" : "Already have an account?"}{" "}
                <a href={isLogin ? "/register" : "/"}>{isLogin ? "Register" : "Login"}</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Authentication;
