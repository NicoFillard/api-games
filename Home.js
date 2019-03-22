import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, Image, UIManager, LayoutAnimation, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import App from './App';

function mapStateToProps(state) {
    return {
        text: state.text
    }
}
class Home extends React.Component {
    constructor(props){
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        this.state ={
            isLoading: true,
            gameName: "",
        }
    }

     componentDidMount(){

        return fetch('https://androidlessonsapi.herokuapp.com/api/game/list', {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => {

                AsyncStorage.getItem('nameGame').then(value => {
                    console.log(value);
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson,
                        lastGame: value,
                    }, function(){

                    });
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    handleOnNavigateBack = (gameName) => {
        if (gameName) {
            this.setState({
                gameName
            })
        }
    }

    _onPress = () => {
        LayoutAnimation.spring();
        this.setState({w: this.state.w + 15, h: this.state.h + 15})
    }

    render() {
        return (
            <View style={[styles.container, {width: this.state.w, height: this.state.h}]}>
                <TouchableOpacity onPress={this._onPress}>
                    <Image
                        source={require('./assets/hello.png')}
                    />
                </TouchableOpacity>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text style={styles.item} onPress={() =>{
                        this.props.navigation.navigate('Info', {
                            id: item.id,
                            onNavigateBack: this.handleOnNavigateBack
                        })
                    }}>{item.name}</Text>}
                    keyExtractor={({id}) => id.toString()}
                />
                <Text>Le dernier jeu était : {this.state.gameName}</Text>
            </View>
        );
    }
}
export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        alignSelf:'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
});
