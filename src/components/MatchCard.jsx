import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';
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

  const handlePredictionPopup = (props) => {
    // console.log('handle-props:', props);
    dispatch(uiActions.togglePrediction(props));
  };

  return (
    <article className="match-card">
      <div className="grid-container">
        <div className="country">
          <div
            className={`bg-flag ${home.toLowerCase().replace(' ', '-')}`}
          ></div>
          <p>{home}</p>
        </div>
        {status === 'Not Started' ? (
          <div>
            <p>{parseDate}</p>
            <p>{parseHours}</p>
            <h4>vs</h4>
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
          <p>{away}</p>
        </div>
      </div>

      {props.hasPrediction &&
        Object.values(scores.scores)
          .filter(
            (score) => score.scoreId === id && score.user === userData.userId,
          )
          .map((score, index) => {
            const { homeScore, awayScore } = score;
            return (
              <div key={index} className="user-score">
                <p className="user-score_name">{userData.username} predicts:</p>
                <div className="team-score user-score_home">
                  <p>
                    {home}
                    <span className={homeScore > awayScore ? 'winner' : ''} />
                  </p>
                  <p className="score-number">{homeScore}</p>
                </div>
                <div className="team-score user-score_away">
                  <p>
                    {away}
                    <span className={homeScore < awayScore ? 'winner' : ''} />
                  </p>
                  <p className="score-number">{awayScore}</p>
                </div>
              </div>
            );
          })}
      {!props.hasPrediction && (
        <button
          className="btn-predict"
          onClick={() => handlePredictionPopup(props)}
        >
          Predict score
        </button>
      )}
    </article>
  );
};
export default MatchCard;
