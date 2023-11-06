import { Link } from "react-router-dom";

const RegisterSucces = () => {
  return (
    <div className="register-succes">
      <div className="succes-card">
        <h1>You have succesfully registered! 🟢</h1>
        <p>Please, wait until Admin adds you to customers</p>
        <Link to="/">Back to home ←</Link>
      </div>
    </div>
  );
}

export default RegisterSucces