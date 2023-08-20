import { useState } from 'react';
import PointsTable from './PointsTable';
import { useDispatch, useSelector } from 'react-redux';

const Calculator = ({ props }) => {
  const [totalPoints, setTotalPoints] = useState([]);
  const { matches, userScores } = props;
  const total = {};

  const calculate = (userScore, matchResult) => {
    let matchTotal = {
      winner: 0,
      pointsDiff: 0,
    };
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
      matchTotal.winner += 10;
    }
    if (Math.abs(userScore.homeScore - matchResult.home_score) < 3) {
      matchTotal.pointsDiff += 5;
    }
    return matchTotal;
  };

  userScores.forEach((score, index) => {
    const match = matches.find((match) => match.id === score.scoreId);
    if (match) {
      const matchTotal = calculate(score, match);
      // Accumulate points in the total object
      if (!total[score.scoreId]) {
        total[score.scoreId] = {
          winner: 0,
          pointsDiff: 0,
        };
      }
      total[score.scoreId].winner += matchTotal.winner;
      total[score.scoreId].pointsDiff += matchTotal.pointsDiff;
    }
  });
  // setTotalPoints(total);

  //   getPoints();

  //   Object.values(total).map((points) => console.log(points));
  console.log('total', total);

  return (
    <div>
      <p>CALCULATOR</p>
      {userScores.map((score, index) => {
        const id = score.scoreId;
        return (
          <div key={index}>
            <p>home:{score.home}</p>
            <p>away:{score.away}</p>
            <h3>{total[id]?.winner}</h3>
          </div>
        );
      })}
    </div>
  );

  //   return userScores.map((score, index) => (
  //     <div key={index}>
  //       <div>
  //         <p>{score.home}</p>
  //         <p>{score.homeScore}</p>
  //         <p>{score.away}</p>
  //         <p>{score.awayScore}</p>
  //       </div>
  //       {matches
  //         .filter((match) => match.id === score.scoreId)
  //         .map((match, index) => (
  //           <div key={index}>
  //             {calculate(score, match)}
  //             {match.status !== 'Not Started' ? (
  //               <div style={{ background: 'red' }}>
  //                 <p>{match.status}</p>
  //                 <p>{match.home}</p>
  //                 <p>{match.home_score}</p>
  //                 <p>{match.away}</p>
  //                 <p>{match.away_score}</p>
  //                 {/* <PointsTable total={total} /> */}
  //               </div>
  //             ) : (
  //               <p>Match not started</p>
  //             )}
  //           </div>
  //         ))}
  //     </div>
  //   ));
};

export default Calculator;
