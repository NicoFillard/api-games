import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
        this.state ={ isLoading: true}
    }

    componentDidMount(){

        return fetch('https://androidlessonsapi.herokuapp.com/api/game/list', {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text style={styles.item} onPress={() => {
                        this.props.navigation.navigate('Info', {id: item.id})
                    }}>{item.name}</Text>}
                    keyExtractor={({id}) => id}
                />
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
