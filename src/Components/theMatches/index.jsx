import React, { useState, useEffect } from 'react';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';

import LeagueTable from './table.js';
import MatchesList from './matchesList';

 const TheMatches = () => {

    const [FilterState, setFilterState] = useState({
        loading: true,
        matches: [],
        filterMatches: [],
        playedFilter: 'All',
        resultFilter: 'All'
    });
    const {
        matches,
        filterMatches,
        playedFilter,
        resultFilter,
    } = FilterState;

    useEffect(() => {

            firebaseMatches.once('value').then(snapshot=>{
                const matches = firebaseLooper(snapshot)
                setFilterState({
                    ...FilterState,
                    loading:false,
                    matches:reverseArray(matches),
                    filterMatches:reverseArray(matches)
                });
            })
       
        return () => {
            firebaseMatches.off()
        }

    }, [FilterState]);

    const showPlayed = (played) => {
        const list = matches.filter((match)=>{
            return match.final === played
        });
        setFilterState({
            ...FilterState,
            filterMatches: played === 'All' ? matches : list,
            playedFilter: played,
            resultFilter:'All'
        });
    }

    const showResult = (result) => {
        const list = matches.filter((match)=>{
            return match.result === result
        });

        setFilterState({
            ...FilterState,
            filterMatches: result === 'All' ? matches : list,
            playedFilter: 'All',
            resultFilter: result
        });
    }

    return (
        <div className="the_matches_container">
            <div className="the_matches_wrapper">
                <div className="left">
                    <div className="match_filters">
                        <div className="match_filters_box">
                            <div className="tag">
                                Show Match
                            </div>
                            <div className="cont">
                                <div className={`option ${playedFilter === 'All'?'active':''}`}
                                    onClick={()=> showPlayed('All')}
                                >
                                    All
                                </div>
                                <div className={`option ${playedFilter === 'Yes'?'active':''}`}
                                     onClick={()=> showPlayed('Yes')}
                                >
                                    Played
                                </div>
                                <div className={`option ${playedFilter === 'No'?'active':''}`}
                                     onClick={()=> showPlayed('No')}
                                >
                                    Not Played
                                </div>
                            </div>
                        </div>  

                        <div className="match_filters_box">
                            <div className="tag">
                                Result game
                            </div>
                            <div className="cont">
                                <div className={`option ${resultFilter === 'All'?'active':''}`}
                                    onClick={()=> showResult('All')}
                                >
                                    All
                                </div>
                                <div className={`option ${resultFilter === 'W'?'active':''}`}
                                     onClick={()=> showResult('W')}
                                >
                                    W
                                </div>
                                <div className={`option ${resultFilter === 'L'?'active':''}`}
                                     onClick={()=> showResult('L')}
                                >
                                    L
                                </div>
                                <div className={`option ${resultFilter === 'D'?'active':''}`}
                                     onClick={()=> showResult('D')}
                                >
                                    D
                                </div>
                            </div>
                        </div>  
                    </div>
                    <MatchesList matches={filterMatches} />
                </div>
                <div className="right">
                    <LeagueTable />
                </div>
            </div>
        </div>
    );
}
export default TheMatches;

