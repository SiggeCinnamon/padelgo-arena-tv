import styles from './ScoreBoard.module.scss';
import AvatarCircle from './AvatarCircle/AvatarCircle.js';
import PlayerName from './PlayerName/PlayerName.js';
import SetContainer from './SetContainer/SetContainer.js';

/**
 * A component that is rendering the AvatarCircle sub-component and also renders the jsx that represents the teams name and their current scores
 * @author Mattias Andersen
 *
 * @param  {Object} team An Object consisting of most of the data about the team
 * @param  {Number} nameColor A Number that represents which team (0 or 1), this can then be used to determine what color the team should have
 * @param  {Object} players An Object consisting of data of the 1-2 players of the team
 * @return {JSX} React JSX Rendering
 */
export default function ScoreboardTeam({ team, nameColor, players }) {
  return (
    <>
      <div className="container justify-center">
        <div className={styles.scoreboardContainer + ' d-flex'}>
          <div className={styles.scoreContainer}>
            <div className={styles.imgContainer + ' d-flex'}>
              <div>
                {players && players[1] && (
                  <AvatarCircle
                    channelName={players && players[1] && players[1].channelName ? players[1].channelName : '__NoName__'}
                    borderColor={team.backgroundColor}
                    width={600}
                  />
                )}
              </div>
              <div className={styles.avatarOverlap}>
                {players && players[0] && (
                  <AvatarCircle
                    channelName={players && players[0] && players[0].channelName ? players[0].channelName : '__NoName__'}
                    borderColor={team.backgroundColor}
                    width={600}
                  />
                )}
              </div>
            </div>
            <PlayerName teamName={team.name} nameColor={nameColor} />
            <SetContainer team={team} />
          </div>
        </div>
      </div>
    </>
  );
}
