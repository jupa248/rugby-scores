import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const Error = ({ err }) => {
  console.log(err);
  return (
    <div className="error-container">
      <div className="error-icon"></div>
      <p>{err}</p>
    </div>
  );
};
export default Error;
