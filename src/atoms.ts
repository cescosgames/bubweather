import { atom } from "jotai";

// our loading weather atom, will be flipped true or false depending on 'if loading'. will prevent search from being pressed and show loading icon in weather cards
export const isLoadingWeather = atom(false);