import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../store/popup-slice';
import './MatchCard.css';

const MatchCard = ({ props }) => {
  const dispatch = useDispatch();
  const { home, away, id, status, home_score, away_score, date, venue } =
    props.match;

  const scores = useSelector((state) => state.scores);
  const userData = props.userData;
  const event = new Date(date);
  const parseDate = event.toUTCString().split('2023')[0];
  const hour = event.getHours();
  const minutes = event.getMinutes();
  const parseHours = `${hour}:${minutes === 0 ? '00' : minutes}`;
  // console.log('scores', scores);
  const userScores = Object.values(scores.scores).filter((score) => {
    return score.user === userData?.userId;
  });

  // console.log('userScores-match', userScores.length === 0 ? 'yes' : 'no');
  const handlePredictionPopup = (props) => {
    // console.log('handle-props:', props);
    dispatch(popupActions.togglePrediction(props));
  };

  return (
    <article className="match-card">
      <div className="grid-container">
        <div className="country">
          <div
            className={`bg-flag ${home.toLowerCase().replace(' ', '-')}`}
          ></div>
          <h3>{home}</h3>
        </div>
        {status === 'Not Started' ? (
          <div>
            <p>{parseDate}</p>
            <p>{parseHours}</p>
            <h4>vs</h4>
            <h2>{id}</h2>
            <h2>{userData?.userId}</h2>
            <p>{venue}</p>
          </div>
        ) : (
          <div>
            <p>{status}</p>
            <div className="score">
              <p>{home_score}</p>
              <span> - </span>
              <p>{away_score}</p>
            </div>
          </div>
        )}
        <div className="country">
          <div
            className={`bg-flag ${away.toLowerCase().replace(' ', '-')}`}
          ></div>
          <h3>{away}</h3>
        </div>
      </div>
      {userScores.length > 0 &&
        userScores.map(
          (score, index) =>
            score.scoreId === id && (
              <div key={index} className="user-score">
                {console.log(score.scoreId === id)}
                <p className="user-score_name">{userData.username} predicts:</p>
                <div className="team-score user-score_home">
                  <p>
                    {home}
                    <span className="winner" />
                  </p>
                  <p>{score.homeScore}</p>
                </div>
                <div className="team-score user-score_away">
                  <p>
                    {away}
                    <span className="winner" />
                  </p>
                  <p>{score.awayScore}</p>
                </div>
              </div>
            ),
        )}
    </article>
  );
};
export default MatchCard;
{
  /* <button
key={index}
className="btn-predict"
onClick={() => handlePredictionPopup(props)}
>
Predict score
</button> */
}
// .filter((score) => score.scoreId === id)
