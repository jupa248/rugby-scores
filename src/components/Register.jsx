import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/user-actions';

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  return (
    <div>
      <h1>Sign up</h1>
      <input
        type="text"
        placeholder="Username"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
};
export default Register;
