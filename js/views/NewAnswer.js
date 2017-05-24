import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import { Container, Title, Content, Button, Body, Icon, Item, Label, Form, Input, Spinner } from 'native-base';
import axios from 'axios';

export default class NewAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer : {
                Text : "",
                QuestionId: this.props.navigation.state.params.id,
            },                      
            requestStatus : "idle",
            error: false,
        }

        this.submitAnswer = this.submitAnswer.bind(this);
    }
    render() {
        if(this.state.requestStatus == "sending"){
            return(
                <Container>
                    <Content>
                        <Item underline>
                            <Input
                                style={styles.bodyInput}
                                placeholder = 'Answer goes here'
                                multiline={true}
                                blurOnSubmit={false}
                                numberOfLines={5}
                                onChangeText = {(text) => this.setState({answer: {...this.state.answer, Text: text}})}
                            />
                        </Item>
                        <Button style={styles.submit} block onPress={()=>this.submitAnswer()}>
                            <Spinner />
                        </Button>
                    </Content>
                </Container>
            )
        }
        return (
            <Container>
                <Content>
                    <Item underline>
                        <Input
                            style={styles.bodyInput}
                            placeholder = 'Answer goes here'
                            multiline={true}
                            blurOnSubmit={false}
                            numberOfLines={5}
                            onChangeText = {(text) => this.setState({answer: {...this.state.answer, Text: text}})}
                        />
                    </Item>
                    <Button style={styles.submit} block onPress={()=>this.submitAnswer()}>
                        <Text style={styles.submitText}>Submit Answer</Text>
                    </Button>
                </Content>
            </Container>
    );
  }


    submitAnswer(){
        this.setState({requestStatus: "sending"});
        let a = {
            ...this.state.answer,
            AuthorId: "06a636fc-f7d0-4bd6-abe7-65da895fb1b9"
        };

        console.log(a);

        let url = "http://hh.jkulubya.com/api/questions/"+a.QuestionId+"/answers";
        console.log(url);
        axios.post(url, a)
            .then(response => {
                console.log("successfully posted answer");
                this.setState({requestStatus: "idle", error: false});
            })
            .catch(error => {
                console.log("error posting new answer");
                this.requestStatus({requestStatus: "idle", error: true});
            });
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 23,
    },
    questionInput: {
        margin: 15,
        height: 40,
    },
    bodyInput: {
        margin: 15,
        height: 100,
        textAlignVertical: 'top',
    },
    submit: {
        backgroundColor: 'rgba(231,76,60,1)',
    },
    submitText: {
        color: '#ffffff',
        fontWeight: 'bold',
    }
}
