import React from 'react';
import Expo from 'expo';
import {StackNavigator, StyleSheet} from 'react-navigation';

import QuestionsList from '../views/QuestionsList';
import QuestionDetails from '../views/QuestionDetails';
import NewQuestion from '../views/NewQuestion';
import NewAnswer from '../views/NewAnswer';

const styles = {
    header : {
        paddingTop : Expo.Constants.statusBarHeight, //StatusBar.currentHeight,
        height : 56+Expo.Constants.statusBarHeight,
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
    },
    NewAnswer : {
        screen : NewAnswer,
        navigationOptions : {
            title : 'Post an Answer',
            headerStyle : styles.header,
        }
    }
})


