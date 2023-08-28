import Calculator from './Calculator';
import './Predictions.css';

const Predictions = ({ props }) => {
  const { matches, userScores, finals } = props;

  return (
    <section className="predictions-section">
      {userScores.length > 0 ? (
        <Calculator props={{ matches, userScores, finals }} />
      ) : (
        <h3>You don&#39;t have Predictions</h3>
      )}
    </section>
  );
};
export default Predictions;
