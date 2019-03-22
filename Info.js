import React from 'react';
import { StyleSheet, Text, View, Linking, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

class Info extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            gameId: this.props.navigation.state.params.id
        };
    }

    componentDidMount() {
        return fetch(`https://androidlessonsapi.herokuapp.com/api/game/details?game_id=${this.state.gameId}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => {

                AsyncStorage.setItem('nameGame', responseJson.name);

                this.setState({
                    isLoading: false,
                    gameName: responseJson.name,
                    gameType: responseJson.type,
                    gameYear: responseJson.year,
                    gamePlayers: responseJson.players,
                    gameDescription: responseJson.description_en,
                    gameUrl: responseJson.url
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <Button title="Retour à la liste" type="outline" onPress={() =>{
                    this.props.navigation.state.params.onNavigateBack(this.state.gameName),
                    this.props.navigation.goBack()
                }} />
                <Text h1>{this.state.gameName}</Text>
                <View>
                    <Text>Players : {this.state.gamePlayers}</Text>
                    <Text>Type : {this.state.gameType}</Text>
                    <Text>Year : {this.state.gameYear}</Text>
                    <Text>Description : {this.state.gameDescription}</Text>
                    <View style={styles.container}>
                        <Button style={styles.button} title="Page wikipédia" type="outline" onPress={() => Linking.openURL(`${this.state.gameUrl}`)} />
                    </View>
                </View>
            </View>
        );
    }
}
export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 20,
    }
});
