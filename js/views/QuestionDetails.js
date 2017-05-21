import Expo from 'expo';
import React from 'react';
import axios from 'axios';
import { Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Container, Header, Title, Content, Button, Left, Body, Icon } from 'native-base';

export default class QuestionDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            ...this.props.navigation.state.params,
            comments: [],
            dataLoaded: false
        };
        this.handleFabClick = this.handleFabClick.bind(this);
    }

    render() {
        if(!this.state.dataLoaded){
            return (
                <Container>
                    <Content>
                        <Text>Loading</Text>
                    </Content>
                    <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.handleFabClick()} />
                </Container>        
            );
        };

        return (
            <Container>
                <Content>
                <Text>{this.state.title}</Text>
                <Text>{this.state.author}</Text>
                <Text>{this.state.text}</Text>
                <Text>{this.state.title}</Text>
                </Content>
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.handleFabClick()} />
            </Container>
        );
    }

    componentDidMount(){
        let url = "http://192.168.1.102:5000/api/questions/"+ this.state.id;
        axios.get(url)
            .then(response => {
                this.setState({
                    dataLoaded: true,
                    title: response.data.title,
                    author: response.data.authorId,
                    text: response.data.text,
                    id: response.data.id
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleFabClick(){
        this.props.navigation.navigate('NewQuestion');
    }
}
