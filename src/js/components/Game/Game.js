import React, { useState, useEffect } from 'react';
import {View, Text, Pressable, useWindowDimensions, Vibration, ImageBackground} from 'react-native';
import { styles } from '../../../css/Style';

const punishment_score = '10';

const Game = props => {
    const windowDimensions = useWindowDimensions();
    const { advancePlayer, currentPlayer, currentRound } = props;
    const [step, setStep] = useState(0);
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [localScore, setLocalScore] = useState(null);

    useEffect(() => {
        if (step < 2) {
            const newTimer = setTimeout(() => {
                setStep(step + 1);
            }, 1000);
            setTimer(newTimer);
        }

        if (step === 2) { // blank screen step
            const newTimer = setTimeout(() => {
                setStep(step + 1);
            }, getRandomTimeStamp());
            setTimer(newTimer);
        }

        if (step === 3) { // hit it step
            setStartTime(Date.now())

            const newTimer = setTimeout(() => {
                setLocalScore(punishment_score);
                setStep(5);
            }, 10000);
            setTimer(newTimer);
        }

        if (step > 3) {
            const newTimer = setTimeout(() => {
                setStep(0);
                setLocalScore(null)
                advancePlayer(currentPlayer, localScore)
            }, 5000);
            setTimer(newTimer);
        }

    }, [step]);

    const getRandomTimeStamp = () => {
        return 2000 + Math.random() * 5000;
    }

    const HitTooSoon = () => {
        if (!localScore) {
            setLocalScore(punishment_score)
        }
        clearTimeout(timer);
        setStep(6);
    }

    const HitSuccess = () => {
        Vibration.vibrate(10 * 500)
        clearTimeout(timer);

        setStep(4);
    }

    const getHitTimer = () => {
        const elapsedTime = Date.now() - startTime;
        const score = (elapsedTime / 1000).toFixed(3);

        if (!localScore) {
            setLocalScore(score)
        }

        return score;
    }

    const getWrittenScore = score => {
        let message = 'Are you even trying?';

        if (score < 5) {message = 'Are you paying attention?'}
        if (score < 2) {message = 'Very slow!'}
        if (score < 1) {message = 'Keep practicing'}
        if (score < 0.75) {message = 'This is slow'}
        if (score < 0.65) {message = 'Pretty average'}
        if (score < 0.5) {message = 'Nice score!'}
        if (score < 0.45) {message = 'What a great score!'}
        if (score < 0.4) {message = 'This is very fast!'}
        if (score < 0.35) {message = 'What an amazing score!'}
        if (score < 0.3) {message = 'Wow!! So fast.'}
        if (score < 0.25) {message = 'How did you do that?!'}
        if (score < 0.2) {message = 'Incredible score!!!'}
        if (score < 0.15) {message = 'Cheater!'}

        return message;
    }

    const getStepOutput = () => {
        let stepOutput = null;

        switch (step) {
            case 0: // player indicator
                stepOutput = <Text style={styles.text_on_dark}>Next up is player {currentPlayer}</Text>;
                break;
            case 1: // get ready
                stepOutput = <Text style={styles.text_on_dark}>Get ready..</Text>;
                break;

            case 2: // blank screen
                stepOutput = <Pressable
                        onPress={HitTooSoon}
                        style={[styles.overlay, {height: windowDimensions.height, width: windowDimensions.width}]}
                    />;
                break;

            case 3: // hit it screen
                stepOutput = <>
                    <Text style={styles.text_hit_it}>HIT 'IT!</Text>
                    <Pressable
                        onPress={HitSuccess}
                        style={[styles.overlay, {height: windowDimensions.height, width: windowDimensions.width}]}
                    />
                </>;
                break;

            case 4: // score screen
                stepOutput = <><Text style={styles.text_on_dark}>Your score is {getHitTimer()}</Text>
                    <Text style={styles.text_message}>{getWrittenScore(getHitTimer())}</Text></>;
                break;

            case 5: // fail screen
                stepOutput = <Text style={styles.text_on_dark}>You failed to Hit it in time.</Text>;
            break;

            case 6: // too soon screen
                stepOutput = <Text style={styles.text_on_dark}>Are you trying to cheat?</Text>;
            break;
        }

        return <View style={[styles.screen_game, {height: windowDimensions.height, width: windowDimensions.width}]}>
            {stepOutput}
        </View>
    }

    return <View style={styles.wrapper}>
        <ImageBackground source={require('./../../../assets/images/background_pattern.png')} resizeMode="stretch" style={styles.imageBackground}>
            {getStepOutput()}
        </ImageBackground>
    </View>
}

export default Game;
