import alarm from "./alarm.ogg";

import burned from "./burned.swf.mp3";
import chewbacca from "./chewbacca.swf.mp3";
import cricket from "./crickets.swf.mp3";
import doh from "./doh.swf.mp3";
import hadouken from "./hadouken.mp3";
import incorrect from "./incorrect.swf.mp3";
import lightsaber from "./lightsaber_02.mp3";
import saxguy from "./epicsaxguy.mp3";
import metalGearSolid from "./metalgearsolid.swf.mp3";
import nooo from "./nooo.swf.mp3";
import shoryuken from "./shoryuken.mp3";
import wakawaka from "./wakawaka.swf.mp3";

import party_boy from "./tracks/party_boy.mp3";

let currentVolume = 1;

const sounds = [burned, chewbacca, cricket, doh, hadouken, incorrect, lightsaber, metalGearSolid, nooo, shoryuken, saxguy, wakawaka];
const tracks = [alarm, alarm, party_boy, alarm, alarm, alarm];

export const randomSound = () => {
    const min = 0;
    const max = sounds.length;
    const random = Math.floor(Math.random() * (max - min)) + min;

    return makeAudioClip(sounds[random], 0.8);
};

export const randomAlarmTrack = () => {
    const min = 0;
    const max = tracks.length;
    const random = Math.floor(Math.random() * (max - min)) + min;

    return makeAudioClip(tracks[random], 1);
};

export const toggleAudio = () => {
    currentVolume = currentVolume > 0 ? 0 : 1;
};

const makeAudioClip = (sound, volume = currentVolume) => {
    let audio = new Audio(sound);
    audio.volume = volume;

    return audio;
};
