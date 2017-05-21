import React from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator, StyleSheet} from 'react-navigation';

import QuestionsList from '../views/QuestionsList';
import QuestionDetails from '../views/QuestionDetails';
import NewQuestion from '../views/NewQuestion';

const styles = {
    header : {
        paddingTop : StatusBar.currentHeight,
        height : 56+StatusBar.currentHeight,
}}

export const Root = StackNavigator({
    QuestionsListView : {
        screen : QuestionsList,
        navigationOptions : {
            title : 'Home',
            headerStyle : styles.header,
        }
    },
    QuestionDetails : {
        screen : QuestionDetails,
        navigationOptions : {
            title : 'Question Details',
            headerStyle : styles.header,
        }
    },
    NewQuestion : {
        screen : NewQuestion,
        navigationOptions : {
            title : 'Post Question',
            headerStyle : styles.header,
        }
    }
})


