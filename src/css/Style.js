import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#2B54AF',
        alignItems: 'center',
        justifyContent: 'top',
        alignSelf: 'stretch',
    },
    imageBackground: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
    },
    screen_menu: {
        flex: 1,
        alignItems: 'center',
    },
    screen_score: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        alignItems: 'center',
        justifyContent: 'top',
        marginTop: 100,
    },
    score_section: {
        marginTop: 25,
        alignItems: 'center',
    },
    button_group_horizontal: {
        flexDirection: 'row',
        marginBottom: 25,
        marginTop: 25,
    },
    text_on_dark: {
        color: 'yellow',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, .5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 25,
        textTransform: 'uppercase',
    },
    text_title: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    text_footer: {
        color: '#ffffff',
        fontSize: 10,
    },
    text_button: {
        fontSize: 20,
        color: '#ffffff',
    },
    text_button_active: {
        fontSize: 20,
        color: '#000000',
    },
    text_start_button: {
        fontSize: 24,
        color: '#333333',
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    text_message: {
        color: '#ffffff',
        fontSize: 16,
        marginTop: 25,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, .5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 25,
        textTransform: 'uppercase',
    },
    button_start: {
        marginTop: 25,
        backgroundColor: 'yellow',
        borderRadius: 4,
        padding: 16,
    },
    button_player: {
        backgroundColor: '#000000',
        borderRadius: 4,
        padding: 12,
        margin: 5,
        width: 40,
        textAlign: 'center',
    },
    button_player_active: {
        backgroundColor: 'yellow',
        borderRadius: 4,
        padding: 12,
        margin: 5,
        width: 40,
        textAlign: 'center',
    },
    footer: {
        height: 100,
    },
    screen_game: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_hit_it: {
        color: 'yellow',
        fontSize: 100,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, .5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 25,
        textTransform: 'uppercase',
    },
    overlay: {
        backgroundColor: '#000000',
        flex: 1,
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'top',
    }
});

export { styles }
