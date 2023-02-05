import React, {useEffect, useState} from 'react';
import Game from './src/js/components/Game/Game';
import {Pressable, Image, Text, View, ImageBackground, useWindowDimensions} from 'react-native';
import Scenes from './src/js/constants/Scenes.js';
import { styles } from './src/css/Style';

const num_rounds = 3;

const App = () => {
    const windowDimensions = useWindowDimensions();
    const [numPlayers, setNumPlayers] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);
    const [nextPlayer, setNextPlayer] = useState(1);
    const [scene, setScene] = useState(Scenes.TITLE);
    const [scores, setScores] = useState({})

    const transitionGame = () => {
        setScene(Scenes.GAME);
    }

    const getAverage = arr => {
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += Number(arr[i]);
        }

        return (sum / arr.length).toFixed(3);
    }

    const setScore = (player, score) => {
        if (!scores[player]) {
            scores[player] = [];
        }

        scores[player].push(score);
    }

    const advancePlayer = (player, score) => {
        setScore(player, score);

        if (player === numPlayers) {
            setNextPlayer(1);

            if (currentRound < num_rounds) {
                setCurrentRound(currentRound + 1);
            } else {
                setScene(Scenes.SCORE)
            }
        } else {
            setNextPlayer(nextPlayer + 1);
        }
    }

    const transitionTitle = () => {
        setScores({});
        setScene(Scenes.TITLE);
    }

    const getResultOutput = () => {
        const output = [];

        let hiScore = null;

        for (let i = 1; i <= numPlayers; i++) {
            const score = getAverage(scores[i]);

            if (!hiScore || getAverage(scores[hiScore]) > score) {
                hiScore = i;
            }

            output.push(<Text key={i} style={styles.text_on_dark}>player {i}: {score}</Text>)
        }

        output.push(<Text key={0} style={styles.text_message}>Well done player {hiScore}</Text>)

        return output;
    }

    // reset artifacts on restart
    useEffect(() => {
        if (scene === Scenes.TITLE) {
            setNextPlayer(1);
            setNumPlayers(1);
            setCurrentRound(1);
        }
    }, [scene]);

    if (scene === Scenes.TITLE) {
        return (
                <View style={styles.wrapper}>
                    <ImageBackground source={require('./src/assets/images/background_pattern.png')} resizeMode="stretch" style={styles.imageBackground}>
                    <View style={[styles.screen_menu, {width: windowDimensions.width}]}>
                        <Image source={require('./src/assets/images/hit_it_logo.png')} style={{marginTop: 50, width: '100%', height: '20%'}}/>

                        <View style={styles.menu}>
                            <Text style={styles.text_title}>How many players?</Text>

                            <View style={styles.button_group_horizontal}>
                                <Pressable
                                    onPress={() => {setNumPlayers(1)}}
                                    style={numPlayers === 1 ? styles.button_player_active : styles.button_player}
                                >
                                    <Text style={numPlayers === 1 ? styles.text_button_active : styles.text_button}>1</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {setNumPlayers(2)}}
                                    style={numPlayers === 2 ? styles.button_player_active : styles.button_player}
                                >
                                    <Text style={numPlayers === 2 ? styles.text_button_active : styles.text_button}>2</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {setNumPlayers(3)}}
                                    style={numPlayers === 3 ? styles.button_player_active : styles.button_player}
                                >
                                    <Text style={numPlayers === 3 ? styles.text_button_active : styles.text_button}>3</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {setNumPlayers(4)}}
                                    style={numPlayers === 4 ? styles.button_player_active : styles.button_player}
                                >
                                    <Text style={numPlayers === 4 ? styles.text_button_active : styles.text_button}>4</Text>
                                </Pressable>
                            </View>

                            <Pressable
                                onPress={() => {transitionGame()}}
                                style={styles.button_start}
                            >
                                <Text style={styles.text_start_button}>START</Text>
                            </Pressable>
                        </View>

                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.text_footer}>Hit it is based on the game Mik 'em! written by rvo in 1994</Text>
                        <Text style={styles.text_footer}>v1.00</Text>
                    </View>

                    </ImageBackground>
                </View>
        );
    }

    if (scene === Scenes.GAME) {
        return (
            <Game advancePlayer={advancePlayer} currentRound={currentRound} currentPlayer={nextPlayer}/>
        )
    }

    if (scene === Scenes.SCORE) {
        return (
            <View style={styles.wrapper}>
                <ImageBackground source={require('./src/assets/images/background_pattern.png')} resizeMode="cover" style={styles.imageBackground}>
                    <View style={[styles.screen_score, {width: windowDimensions.width}]}>
                        <Text style={styles.text_title}>The end result:</Text>
                        <View style={styles.score_section}>
                            {getResultOutput()}
                        </View>
                        <Pressable
                            onPress={() => {transitionTitle()}}
                            style={styles.button_start}
                        >
                            <Text style={styles.text_start_button}>Restart</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    return null;
}

export default App;
