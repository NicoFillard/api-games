import React from 'react';
async function getMoviesFromApi() {
    try {
        let response = await fetch(
            'https://androidlessonsapi.herokuapp.com/api/game/battleship/init',
        );
        let responseJson = await response.json();
        return responseJson.name;
    } catch (error) {
        console.error(error);
    }
}