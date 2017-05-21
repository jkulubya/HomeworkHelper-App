import Expo from 'expo';
import React from 'react';
import axios from 'axios';
import { StatusBar, Text } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon,List } from 'native-base';
import ActionButton from 'react-native-action-button';

import QuestionRow from '../components/QuestionRow';

export default class QuestionsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
            questions: []
        };
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleFabClick = this.handleFabClick.bind(this);
        
    }

    handleFabClick() {
        this.props.navigation.navigate('NewQuestion');
    }

    handleRowClick(question) {
        this.props.navigation.navigate('QuestionDetails', question);
    }

    render() {
        if(!this.state.dataLoaded)
        {
            return (
                <Container>
                    <Content>
                        <List>
                            <Text>Loading</Text>
                        </List>
                    </Content>
                    <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.handleFabClick()} />
                </Container>        
            );
        };

        let questionList = this.state.questions.map((q) => {
            return <QuestionRow 
                        key={q.id} 
                        id={q.id} 
                        title={q.title} 
                        author={q.authorId} 
                        text={q.text}
                        rowClicked={(state) => this.handleRowClick(state)}
                    />
            });        

        return (
            <Container>
                <Content>
                    <List>
                        {questionList}
                    </List>
                </Content>
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.handleFabClick()} />
            </Container>        
        );
    }

    componentDidMount(){
        axios.get("http://192.168.1.102:5000/api/questions")
             .then(response => {
                 this.setState({dataLoaded: true, questions: response.data});
             })
             .catch(error => {
                 console.log('error1');
                 console.log(error);
             });
    }
}

const styles = {
    header: {
        backgroundColor: '#2196F3',
        height: 56,
        alignSelf: 'stretch',
        marginTop: StatusBar.currentHeight,
    },
};
