import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import { Container, Title, Content, Button, Body, Icon, Item, Label, Form, Input, Spinner } from 'native-base';
import axios from 'axios';

export default class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question : {
                title : "",
                text : "",
            },            
            requestStatus : "idle",
            error: false,
        }
        this.submitQuestion = this.submitQuestion.bind(this);
    }
    render() {
        if(this.state.requestStatus == "sending"){
            return (
                <Container>
                    <Content>
                        <Item underline>
                            <Input
                                style={styles.questionInput}
                                placeholder = 'Question Title'
                                autoCapitalize = 'none'
                                onChangeText = {(text) => this.setState({question: {...this.state.question, title: text}})}
                                value = {this.state.question.title}
                            />
                        </Item> 
                        <Item underline>
                            <Input
                                style={styles.bodyInput}
                                placeholder = 'Question body goes here'
                                multiline={true}
                                blurOnSubmit={false}
                                numberOfLines={5}
                                onChangeText = {(text) => this.setState({question: {...this.state.question, text: text}})}
                                value = {this.state.question.text}
                            />
                        </Item>
                        <Button style={styles.submit} block onPress={()=>this.submitQuestion()}>
                            <Spinner />
                        </Button>
                    </Content>
                </Container>
            );
        }
        return (
            <Container>
                <Content>
                    <Item underline>
                        <Input
                            style={styles.questionInput}
                            placeholder = 'Question Title'
                            autoCapitalize = 'none'
                            onChangeText = {(text) => this.setState({question: {...this.state.question, title: text}})}
                            value = {this.state.question.title}
                        />
                    </Item> 
                    <Item underline>
                        <Input
                            style={styles.bodyInput}
                            placeholder = 'Question body goes here'
                            multiline={true}
                            blurOnSubmit={false}
                            numberOfLines={5}
                            onChangeText = {(text) => this.setState({question: {...this.state.question, text: text}})}
                            value = {this.state.question.text}
                        />
                    </Item>
                    <Button style={styles.submit} block onPress={()=>this.submitQuestion()}>
                        <Text style={styles.submitText}>Submit Question</Text>
                    </Button>
                </Content>
            </Container>
    );
  }


    submitQuestion(){
        this.setState({requestStatus: "sending"});
        let q = {
            ...this.state.question,
            authorId: "06a636fc-f7d0-4bd6-abe7-65da895fb1b9"
        };
        axios.post("http://hh.jkulubya.com/api/questions", q)
            .then(response => {
                console.log("successfully posted question");
                this.setState({requestStatus: "idle", question: {title:"", text:"" }});
            })
            .catch(error => {
                console.log("error posting new question");
                this.setState({requestStatus: "idle", error: true});
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
