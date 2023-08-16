import { useSelector } from 'react-redux/es/hooks/useSelector';
import './MatchCard.css';
import Predictions from './Predictions';

const MatchCard = ({ props }) => {
  //   console.log(match);
  const { home, away, id, status, home_score, away_score, date, venue } =
    props.match;

  const userData = props.userData;
  const event = new Date(date);
  const parseDate = event.toUTCString().split('2023')[0];
  const hour = event.getHours();
  const minutes = event.getMinutes();
  const parseHours = `${hour}:${minutes === 0 ? '00' : minutes}`;

  return (
    <article>
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
      <Predictions props={{ userData, id, home, away, status }} />
    </article>
  );
};
export default MatchCard;
