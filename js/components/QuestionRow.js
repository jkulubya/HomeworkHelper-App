import Expo from 'expo';
import React, { Component } from 'react';
import { ListItem, Card, Text } from 'native-base';

export default class QuestionRow extends Component {
    constructor(props){
        super(props);
        this.state= {
            id: props.id,
            title: props.title,
            text: props.text,
            author: props.author
        };
        this.pressed = this.pressed.bind(this);
    }
    render(){
        return(
            <ListItem style={styles.container} onPress={this.pressed} >
                <Text style={styles.title}>{this.state.title}</ Text>
                <Text style={styles.author}>{this.state.author}</ Text>
                <Text style={styles.text}>{this.state.text}</ Text>
            </ListItem>
        )

    }

    pressed() {
        this.props.rowClicked(this.state);
    }
}

const styles = {
    container: {
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        alignSelf: 'stretch',
        fontWeight: 'bold',
        marginTop: 2,
        marginBottom: 4,
        color: '#111',
    },
    author: {
        alignSelf: 'stretch',
        color: '#05A5D1',
        fontSize: 12,
        marginBottom: 8,
    },
    text: {
        alignSelf: 'stretch',
    }
}