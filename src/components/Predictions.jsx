import Calculator from './Calculator';
import './Predictions.css';

const Predictions = ({ props }) => {
  const { matches, userScores } = props;
  // const handlePoints = (points) => {
  //   console.log('points:', points);
  // };

  return (
    <section className="predictions-section">
      {/* <h2>Predictions</h2> */}
      {userScores.length > 0 ? (
        <Calculator props={{ matches, userScores }} />
      ) : (
        <h3>You don&#39;t have Predictions</h3>
      )}
    </section>
  );
};
export default Predictions;
