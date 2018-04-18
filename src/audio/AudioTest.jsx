import burned from "./burned.swf.mp3";
import chewbacca from "./chewbacca.swf.mp3";
import cricket from "./crickets.swf.mp3";
import doh from "./doh.swf.mp3";
import hadouken from "./hadouken.mp3";
import incorrect from "./incorrect.swf.mp3";
import lightsaber from "./lightsaber_02.mp3";
import metalGearSolid from "./metalgearsolid.swf.mp3";
import nooo from "./nooo.swf.mp3";
import shoryuken from "./shoryuken.mp3";
import wakawaka from "./wakawaka.swf.mp3";

import elevator from "./tracks/elevator_jazz.mp3";
import alarm from "./alarm.ogg";
import party_boy from "./tracks/party_boy.mp3";
import yay from "./kids.mp3";

import moment from "moment";
import _ from 'lodash';
import {Howl, Howler} from 'howler';

export default class AudioTest {
    constructor() {
        this.masterVolume = 1;
        this.sounds = [burned, chewbacca, cricket, doh, hadouken, incorrect, lightsaber, metalGearSolid, nooo, shoryuken, wakawaka];
        this.tracks = [alarm, alarm, party_boy, alarm, alarm, alarm];
        this.sound = new Howl({
            src: []
        });
    }

    playTurnEndedSound = () => this.playAudioFile(_.sample(this.sounds));
    playBreaktimeSound = () => this.playAudioFile(yay, 0.5);
    playAlarmSound = () => {
        if (moment().day() >= 5) {
            this.playAudioFile(party_boy);
        } else {
            this.playAudioFile(_.sample(this.tracks), this.masterVolume, true);
        }
    };

    stopAudio = () => {
        Howler.unload();
    };

    playPauseMusic = () => {
        this.playAudioFile(elevator, this.masterVolume, true);
    };

    playAudioFile = (file, volume = this.masterVolume, loop = false) => {
        console.info("PLAY_AUDIO_FILE::", this.sound, file);
        this.stopAudio();

        Howler.volume(volume);

        this.sound = new Howl({
            src: [file],
            loop: loop,
            autoplay: false,
        }).play();
    };
}
