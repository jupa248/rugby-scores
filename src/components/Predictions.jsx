import Calculator from './Calculator';

const Predictions = ({ props }) => {
  const { matches, userScores } = props;
  // const handlePoints = (points) => {
  //   console.log('points:', points);
  // };

  return (
    <section>
      {/* <h2>Predictions</h2> */}
      {userScores.length > 0 ? (
        <Calculator props={{ matches, userScores }} />
      ) : (
        // userScores.map((score, index) => (
        //   <div key={index}>
        //     <div>
        //       <p>{score.home}</p>
        //       <p>{score.homeScore}</p>
        //       <p>{score.away}</p>
        //       <p>{score.awayScore}</p>
        //     </div>
        //     {matches
        //       .filter((match) => match.id === score.scoreId)
        //       .map((match, index) => (
        //         <div key={index}>
        //           <p>{match.home}</p>
        //           <p>{match.home_score}</p>
        //           <p>{match.away}</p>
        //           <p>{match.away_score}</p>
        //         </div>
        //       ))}
        //   </div>
        // ))
        <p>No Predictions</p>
      )}
    </section>
  );
};
export default Predictions;
