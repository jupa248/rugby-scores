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
    // console.log('handle-props:', matchKey);
    dispatch(uiActions.togglePrediction(props));
  };
  // console.log(status);
  // Object.entries(scores.scores).map((sc) => console.log(sc[1]));
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
        Object.entries(scores.scores)
          .filter(
            (score) =>
              score[1].scoreId === id && score[1].user === userData.userId,
          )
          .map((score, index) => {
            const { homeScore, awayScore } = score[1];
            const matchKey = score[0];
            return (
              <div key={index} className="user-score">
                <p className="user-score_name">
                  {userData.username}{' '}
                  {status === 'Not Started' ? 'predicts' : 'predicted'}
                </p>
                <button onClick={() => handlePredictionPopup(props)}>
                  Edit
                </button>
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
      {!props.hasPrediction && status === 'Not Started' && home !== 'TBC' && (
        <button
          className="btn-predict"
          onClick={() => handlePredictionPopup(props)}
        >
          Predict score
        </button>
      )}
      {!props.hasPrediction && status !== 'Not Started' && (
        <p className="closed">Predictions closed</p>
      )}
    </article>
  );
};
export default MatchCard;
