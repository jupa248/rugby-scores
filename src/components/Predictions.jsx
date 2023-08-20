//   console.log(matches);

const Calculator = ({ props }) => {
  const { matches, userScores } = props;

  const calculate = (userScore, matchResult) => {
    let matchTotal = 0;
    let winner;
    if (matchResult.home_score > matchResult.away_score) {
      winner = matchResult.home;
    }
    if (matchResult.home_score < matchResult.away_score) {
      winner = matchResult.away;
    }
    if (matchResult.home_score === matchResult.away_score) {
      winner = 'Draw';
    }
    if (userScore.winner === winner) {
      matchTotal += 10;
    }
  };

  return userScores.map((score, index) => (
    <div key={index}>
      <div>
        <p>{score.home}</p>
        <p>{score.homeScore}</p>
        <p>{score.away}</p>
        <p>{score.awayScore}</p>
      </div>
      {matches
        .filter((match) => match.id === score.scoreId)
        .map((match, index) => (
          <div key={index}>
            {match.status !== 'Not Started' ? (
              <div style={{ background: 'red' }}>
                <p>{match.status}</p>
                <p>{match.home}</p>
                <p>{match.home_score}</p>
                <p>{match.away}</p>
                <p>{match.away_score}</p>
                {calculate(score, match)}
              </div>
            ) : (
              <p>Match not started</p>
            )}
          </div>
        ))}
    </div>
  ));
};
const Predictions = ({ props }) => {
  const { matches, userScores } = props;
  return (
    <>
      <h2>Predictions</h2>
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
    </>
  );
};
export default Predictions;
