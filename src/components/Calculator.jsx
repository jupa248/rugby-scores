import './Calculator.css';
import userIcon from '../assets/images/user.svg';

const Calculator = ({ props }) => {
  const { matches, userScores } = props;
  const userLogged = localStorage.getItem('user');
  const user = JSON.parse(userLogged).username;
  const total = {};

  const calculate = (userScore, matchResult) => {
    let matchTotal = {
      winner: 0,
      sameScore: 0,
      pointsDiff: 0,
      sameDiff: 0,
      matchPoints: 0,
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
      matchTotal.winner += 5;
      matchTotal.matchPoints += 5;
    }
    if (
      userScore.homeScore === matchResult.home_score ||
      userScore.awayScore === matchResult.away_score
    ) {
      matchTotal.sameScore += 10;
      matchTotal.matchPoints += 10;
    }
    if (
      userScore.homeScore === matchResult.home_score &&
      userScore.awayScore === matchResult.away_score
    ) {
      matchTotal.sameScore += 10;
      matchTotal.matchPoints += 10;
    }
    if (
      Math.abs(userScore.homeScore - matchResult.home_score) <= 3 &&
      userScore.homeScore !== matchResult.home_score
    ) {
      matchTotal.pointsDiff += 3;
      matchTotal.matchPoints += 3;
    }
    if (
      Math.abs(userScore.awayScore - matchResult.away_score) <= 3 &&
      userScore.awayScore - matchResult.away_score
    ) {
      matchTotal.pointsDiff += 3;
      matchTotal.matchPoints += 3;
    }
    if (
      Math.abs(userScore.homeScore - userScore.awayScore) ===
        Math.abs(matchResult.home_score - matchResult.away_score) &&
      winner !== 'Draw'
    ) {
      matchTotal.sameDiff += 5;
      matchTotal.matchPoints += 5;
    }
    return matchTotal;
  };

  userScores.forEach((score, index) => {
    const match = matches.find((match) => match.id === score[1].scoreId);

    if (match) {
      const matchTotal = calculate(score[1], match);

      if (!total[score[1].scoreId]) {
        total[score[1].scoreId] = {
          winner: 0,
          sameScore: 0,
          pointsDiff: 0,
          sameDiff: 0,
          matchPoints: 0,
        };
      }
      if (match.status === 'Result') {
        total[score[1].scoreId].winner += matchTotal.winner;
        total[score[1].scoreId].sameScore += matchTotal.sameScore;
        total[score[1].scoreId].pointsDiff += matchTotal.pointsDiff;
        total[score[1].scoreId].sameDiff += matchTotal.sameDiff;
        total[score[1].scoreId].matchPoints += matchTotal.matchPoints;
      }
    }
  });

  const calculateTotalPoints = (total) => {
    let totalPoints = 0;
    for (const id in total) {
      if (total.hasOwnProperty(id)) {
        totalPoints += total[id].matchPoints;
      }
    }
    return totalPoints;
  };

  const totalPoints = calculateTotalPoints(total);

  return (
    <>
      <div className="user">
        <h4 className="user-name">
          <span className="user-icon" />
          {user}
        </h4>
        <h3>Total Points: {totalPoints}</h3>
      </div>

      <div className="references"></div>
      {userScores &&
        matches &&
        userScores.map((scores, index) => {
          const id = scores[1].scoreId;
          const score = scores[1];
          const match = matches.find((match) => match.id === score.scoreId);
          let bgClass = total[id]?.matchPoints > 0 ? 'bg-green' : 'bg-red';
          return (
            <article key={index} className="points-container">
              <h3 className="bg-blue">{match?.status}</h3>
              <div className="match-score">
                <p>
                  {match?.home}
                  <span
                    className={
                      match?.home_score > match?.away_score ? 'winner' : ''
                    }
                  />
                </p>
                <div>
                  <p>{match?.home_score}</p>
                  <span>-</span>
                  <p>{match?.away_score}</p>
                </div>
                <p>
                  <span
                    className={
                      match?.home_score < match?.away_score ? 'winner' : ''
                    }
                  />
                  {match?.away}
                </p>
              </div>

              <h4 className={match?.status === 'Result' ? bgClass : 'bg-blue'}>
                Your prediction
              </h4>

              <div className="match-score">
                <p>
                  {score.home}
                  <span
                    className={
                      score.homeScore > score.awayScore ? 'winner' : ''
                    }
                  />
                </p>
                <div>
                  <p>{score.homeScore}</p>
                  <span>-</span>
                  <p>{score.awayScore}</p>
                </div>
                <p>
                  <span
                    className={
                      score.homeScore < score.awayScore ? 'winner' : ''
                    }
                  />
                  {score.away}
                </p>
              </div>
              {total[id] && (
                <table className="points-table">
                  {/* <caption className="bg-blue">
                  Your points for this match
                </caption> */}
                  <thead>
                    <tr className="bg-blue">
                      <th>MR</th>
                      <th>SS</th>
                      <th>CS</th>
                      <th>SD</th>
                      <th>MT</th>
                    </tr>
                  </thead>
                  <tbody className="bg-grey">
                    <tr>
                      <td>{total[id].winner}</td>
                      <td>{total[id].sameScore}</td>
                      <td>{total[id].pointsDiff}</td>
                      <td>{total[id].sameDiff}</td>
                      <td>{total[id].matchPoints}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </article>
          );
        })}
      <div className="references">
        <small>
          <strong>* Points Reference:</strong>
        </small>
        <small>
          <strong>MR</strong> - Match Result: <em>(winner / draw)</em> 10pts.
        </small>
        <small>
          <strong>SS</strong> - Same Score: <em>(home / away)</em> 10pts each.
          <em>(both: +10)</em>
        </small>
        <small>
          <strong>CS:</strong> Close Score <em>(up to 3 pts. difference)</em>{' '}
          3pts each.
        </small>
        <small>
          <strong>SD:</strong> Same Difference{' '}
          <em>(between home and away teams)</em> 5pts.
        </small>
        <small>
          <strong>MT:</strong> Match Total{' '}
          <em>(total points for this match prediction.)</em>
        </small>
      </div>
    </>
  );
};

export default Calculator;
