import lizard from '../images/lizard.svg';
import paper from '../images/paper.svg';
import rock from '../images/rock.svg';
import scissors from '../images/scissors.svg';
import spock from '../images/spock.svg';
/* 
Configs are adaptable so new options can be added

basic config is as so:

title : {
  image: 'path to image',
  win: {title: response} or [{title: response}, ...]
  lose: title or [title, ...]
}

*/
export const DEFAULT_CONFIG = {
  rock: {
    image: rock,
    win: {scissors: 'blunts'},
    lose: 'paper'
  },
  paper: {
    image: paper,
    win: {rock: 'covers'},
    lose: 'scissors'
  },
  scissors: {
    image: scissors,
    win: {paper: 'cuts'},
    lose: 'rock'
  },
}

export const ADVANCED_CONFIG = {
  rock: {
    image: rock,
    win: [{scissors: 'blunts'}, {lizard: 'crushes'}],
    lose: ['paper', 'spock']
  },
  paper: {
    image: paper,
    win: [{rock: 'covers'}, {spock: 'disproves'}],
    lose: ['scissors' , 'lizard']
  },
  scissors: {
    image: scissors,
    win: [{paper: 'cuts'}, {lizard: 'decapitates'}],
    lose: ['rock', 'spock']
  },
  spock: {
    image: spock,
    win: [{scissors: 'smashes'}, {rock: 'vaporises'}],
    lose: ['paper', 'lizard']
  },
  lizard: {
    image: lizard,
    win: [{paper: 'eats'}, {spock: 'poisons'}],
    lose: ['rock', 'scissors']
  },
}