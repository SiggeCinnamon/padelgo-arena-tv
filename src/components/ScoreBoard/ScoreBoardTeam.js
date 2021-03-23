import styles from './scoreboard.module.css';

export default function scoreboardTeam({ team }) {
    return (

        <div className={styles.teamContainer}>
            <div className='players-color d-flex p-2' style={{ backgroundColor: team.color }}></div>
            <div className={styles.playersName} style={{ backgroundColor: team.backgroundColor }}>
                <span className={styles.teamName}>{team.name}</span>
            </div>
            <div className='players-score d-flex'>
                {
                    team.sets.map((set, index) => {
                        return (
                            <div key={index} className={styles.playersScore} style={{ backgroundColor: getScoreTileBackgroundColor(set) }}>
                                <span>{set.game}</span>
                            </div>);
                    })
                }
                <div className={styles.playersScore} style={{ backgroundColor: getCurrentPointTileBackground(team.currentPoint) }}>
                    <span>{team.currentPoint.score}</span>
                </div>
            </div>
        </div>

    );
};

const getScoreTileBackgroundColor = (set) => {
    if (set.isCompleted && set.isWon) {
        return '#e91e63';
    }

    if (!set.isCompleted && set.isLead) {
        return '#000000';
    }

    return defaultTileColor;
}

const getCurrentPointTileBackground = (currentPoint) => {
    if (currentPoint.isLead) {
        return '#000000';
    }

    return defaultTileColor;
}

const defaultTileColor = 'rgba(61, 61, 61, 0.3)';