import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../../store/popup-slice';

const Popup = (props) => {
  const showPopup = useSelector((state) => state.popup.showPopup);
  const dispatch = useDispatch();
  const { type, value, placeholder, onClick, onChange, header, btnText } =
    props;
  const inputs = [];
  inputs.push(props.placeholder);

  const toggleHandler = () => {
    dispatch(popupActions.togglePopup());
  };

  return (
    <Modal onClose={toggleHandler}>
      <h2>{header}</h2>
      <form onSubmit={onClick}>
        {inputs.map((input, index) => {
          return (
            <input
              key={index}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
            />
          );
        })}
      </form>
      <button onClick={onClick}>{btnText}</button>
    </Modal>
  );
};
export default Popup;
