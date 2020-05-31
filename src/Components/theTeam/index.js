import React, { Component, useState, useEffect } from 'react';
import PlayerCard from '../ui/playerCard';
import Fade from 'react-reveal/Fade';

import stripes from '../../Resources/images/stripes.png';
import {firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { Promise } from 'core-js';

const TheTeam = () => {
    const [teamState, setTeamState] = useState({
        loading:true,
        players:[],
    });
    const {loading, players} = teamState;
    useEffect(() => {
        
        const getFirebasePlayers = async () => {
            try {
                const snapshot = await firebasePlayers.once('value');
                const players = firebaseLooper(snapshot);
                let promises = [];
    
                for (let key in players) {
                    promises.push(
                        new Promise((resolve,reject)=>{
                        firebase.storage().ref('players')
                         .child(players[key].image)
                            .getDownloadURL()
                                .then(url =>{
                                players[key].url = url;
                               resolve();
                                
                            }).catch(e =>{
                                console.log(e);
                            })
                        })
                    )
                }
    
            await Promise.all(promises);
            setTeamState({
                loading:false,
                players
            });
            } catch (error) {
                console.log(error);
            }
        }
        if(loading) {
            getFirebasePlayers();
        }
    }, [ loading ]);
    const showplayersByCategory = category => (
        players.length > 0 && players.map((player, i)=>{
            const { position, name, number, lastname, url } = player;
            return position === category && 
                <Fade left delay={i*20} key={i}>
                    <div className="item">
                        <PlayerCard 
                            number={number}
                            name={name}
                            lastname={lastname}
                            bck={url}
                        />
                    </div>
                </Fade>
            })
    )
    
    return (
        <div className="the_team_container"
            style={{
                background:`url(${stripes}) repeat`
            }}
        >
            { !loading ?
                <div>
                    <div className="team_category_wrapper">
                       <div className="title">Keepers</div>
                       <div className="team_cards">
                    {showplayersByCategory('Keeper')}
                      </div> 
                    </div>

                    <div className="team_category_wrapper">
                       <div className="title">Defence</div>
                       <div className="team_cards">
                    {showplayersByCategory('Defence')}
                      </div> 
                    </div>

                    <div className="team_category_wrapper">
                       <div className="title">Midfield</div>
                       <div className="team_cards">
                    {showplayersByCategory('Midfield')}
                      </div> 
                    </div>

                    <div className="team_category_wrapper">
                       <div className="title">Strikers</div>
                       <div className="team_cards">
                    {showplayersByCategory('Striker')}
                      </div> 
                    </div>


                </div>
                :null
            }
        </div>
    );
}
export default TheTeam;

