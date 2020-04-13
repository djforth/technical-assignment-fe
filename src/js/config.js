import lizard from '../images/lizard.svg';
import paper from '../images/paper.svg';
import rock from '../images/rock.svg';
import scissors from '../images/scissors.svg';
import spock from '../images/spock.svg';
/* 
Configs are adaptable so new options can be added or new config created.  Config designed as simple API to simplify task of adding new options

basic config is as so:

title : {
  image: 'path to image',
  win: [{title: response}, ...]
  lose: [title, ...]
}

*/
export const DEFAULT_CONFIG = {
  rock: {
    image: rock,
    win: [{scissors: 'blunts'}],
  },
  paper: {
    image: paper,
    win: [{rock: 'covers'}],
  },
  scissors: {
    image: scissors,
    win: [{paper: 'cuts'}],
  },
}

export const ADVANCED_CONFIG = {
  rock: {
    image: rock,
    win: [{scissors: 'blunts'}, {lizard: 'crushes'}],
  },
  paper: {
    image: paper,
    win: [{rock: 'covers'}, {spock: 'disproves'}],
  },
  scissors: {
    image: scissors,
    win: [{paper: 'cuts'}, {lizard: 'decapitates'}],
  },
  spock: {
    image: spock,
    win: [{scissors: 'smashes'}, {rock: 'vaporises'}],
  },
  lizard: {
    image: lizard,
    win: [{paper: 'eats'}, {spock: 'poisons'}],
  },
}