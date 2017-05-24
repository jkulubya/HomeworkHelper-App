import Expo from 'expo';
import React from 'react';
import axios from 'axios';
import ActionButton from 'react-native-action-button';
import { Card, CardItem, Container, Title, Content, Button, Body, Text, Spinner } from 'native-base';

export default class QuestionDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            ...this.props.navigation.state.params,
            comments: [],
            dataLoaded: false
        };
        this.handleFabClick = this.handleFabClick.bind(this);
        this.handlePostAnswer = this.handlePostAnswer.bind(this);
    }

    render() {
        if(!this.state.dataLoaded){
            return (
                <Container>
                    <Content>
                        <Spinner />
                    </Content>
                    <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.handleFabClick()} />
                </Container>        
            );
        };

        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text style={styles.questionTitle}>{this.state.title}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text note>{this.state.author}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    <Text>{this.state.text}</Text>
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Button block onPress={() => this.handlePostAnswer()}>
                        <Text>Answer Question</Text>
                    </Button>
                </Content>
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.handleFabClick()} />
            </Container>
        );
    }

    componentDidMount(){
        let url = "http://hh.jkulubya.com/api/questions/"+ this.state.id;
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

    handlePostAnswer(){
        this.props.navigation.navigate('NewAnswer', {id : this.state.id});
    }
}

const styles = {
    questionTitle: {
        fontSize: 25,
    }
}
