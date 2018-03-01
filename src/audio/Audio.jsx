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

import moment from "moment";
import _ from 'lodash';

export class AudioController {
    constructor() {
        this.currentVolume=  1;
        this.tracks = [alarm, alarm, party_boy, alarm, alarm, alarm];
        this.sounds = [burned, chewbacca, cricket, doh, hadouken, incorrect, lightsaber, metalGearSolid, nooo, shoryuken, wakawaka];
        this.sound = new Audio();
    }

    playRandomSound = () => {
        this.playAudio(_.sample(this.sounds));
    };

    playRandomAlarmTrack = () => {
        if (moment().day() >= 5) {
            this.playAudio(party_boy, this.currentVolume, true);
        } else {
            this.playAudio(_.sample(this.tracks), this.currentVolume, true);
        }

    };

    toggleAudio = () => {
        if (this.currentVolume > 0) {
            this.stopSounds();
            this.currentVolume = 0;
        } else {
            this.currentVolume = 1;
        }
    };

    playAudio = (sound, volume = this.currentVolume, loop = false) => {
        if (this.sound) {
            this.sound.loop = false;
            this.stopSounds();
            this.sound = null;
        }

        this.sound = new Audio(sound);
        this.sound.volume = volume;
        this.sound.loop = loop;

        this.sound.play();
    };

    stopSounds = () => {
        this.sound.pause();
    };

    playPauseMusic = () => {
        this.playAudio(elevator, this.currentVolume, true);
    };
}
