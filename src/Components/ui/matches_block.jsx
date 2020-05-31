import React from 'react';
import PropTypes from 'prop-types';

const MatchesBlock = props => {
    const { match } = props;
    const { date, final, localThmb, local, resultAway, resultLocal, awayThmb, away } = match;

    return (
        <div className="match_block">
            <div className="match_date">
                {match.final ? match.date : `Match not played yet: ${match.date}` }
            </div>
            <div className="match_wrapper">
                <div className="match_top">
                    <div className="left">
                        <div className="icon" style={{background:`url(/images/${match.localThmb}.png)`}}></div>
                        <div className="team_name">{match.local}</div>
                    </div>
                    <div className="right">
                    {match.final ? match.resultLocal: '-'}
                    </div>  
                </div>
                <div className="match_bottom">
                <div className="left">
                        <div className="icon" style={{background:`url(/images/${match.awayThmb}.png)`}}></div>
                        <div className="team_name">{match.away}</div>
                    </div>
                    <div className="right">
                    {match.final ? match.resultAway: '-'}
                    </div>  
                </div>
            </div>
            
        </div>
    )
};

MatchesBlock.propTypes = {
    match: PropTypes.shape({ 
        date: PropTypes.string.isRequired,
        final: PropTypes.bool.isRequired,
        localThmb: PropTypes.string.isRequired,
        local: PropTypes.string.isRequired,
        resultAway: PropTypes.number.isRequired,
        resultLocal: PropTypes.number,
        awayThmb: PropTypes.string,
        away: PropTypes.string
    })
}

export default MatchesBlock;
