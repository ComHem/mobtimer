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
import shutup from "./shutup.swf.mp3";
import wakawaka from "./wakawaka.swf.mp3";
import elevator from "./elevator_jazz.mp3";


const sounds = [burned, chewbacca, cricket, doh, hadouken, incorrect, lightsaber,
    metalGearSolid, nooo, shoryuken, shutup, wakawaka, wakawaka];

export const randomSound = () => {
        const min = 0;
        const max = sounds.length;
        const random = Math.floor(Math.random() * (max - min)) + min;

    return new Audio(sounds[random]);
};

export const elevatorMusic = () => {
    return new Audio(elevator);
};




