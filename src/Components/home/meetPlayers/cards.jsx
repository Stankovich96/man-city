import React, { Component, useState } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import PlayerCard from '../../ui/playerCard';

const HomeCards = (props) => {
    const { show } = props;
    const [state, setState] = useState({
        Cards:[
            {
                bottom:90,
                left:300
            },
            {
                bottom:60,
                left:200
            },
            {
                bottom:30,
                left:100
            },
            {
                bottom:0,
                left:0
            },
        ]
    });

    const showAnimateCards = () => (
        state.Cards.map((card,i) => (
            <Animate
                key={i}
                show={show}

                start={{
                    left:0,
                    bottom:0
                }}
                enter={{
                    left:[card.left],
                    bottom:[card.bottom],
                    timing:{duration: 500, ease: easePolyOut}
                }}
            >
                {({left, bottom})=>{
                    return(
                        <div
                            style={{
                                position:'absolute',
                                left,
                                bottom
                            }}
                        >
                           <PlayerCard 
                            number="30"
                            name="Nicholas"
                            lastname="Otamendi"
                            bck={Otamendi}
                           />
                        </div>
                    )
                }}
            </Animate>
        ))
    )
    return (
        <div>
          {showAnimateCards()}  
        </div>
    );
}

export default HomeCards
