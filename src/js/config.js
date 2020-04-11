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
    image: 'rock.svg',
    win: {scissors: 'blunts'},
    lose: 'paper'
  },
  paper: {
    image: 'paper.svg',
    win: {rock: 'covers'},
    lose: 'scissors'
  },
  scissors: {
    image: 'scissors.svg',
    win: {paper: 'cuts'},
    lose: 'rock'
  },
}

export const ADVANCED_CONFIG = {
  rock: {
    image: 'rock.svg',
    win: [{scissors: 'blunts'}, {lizard: 'crushes'}],
    lose: ['paper', 'spock']
  },
  paper: {
    image: 'paper.svg',
    win: [{rock: 'covers'}, {spock: 'disproves'}],
    lose: ['scissors' , 'lizard']
  },
  scissors: {
    image: 'scissors.svg',
    win: [{paper: 'cuts'}, {lizard: 'decapitates'}],
    lose: ['rock', 'spock']
  },
  spock: {
    image: 'spock.svg',
    win: [{scissors: 'smashes'}, {rock: 'vaporises'}],
    lose: ['paper', 'lizard']
  },
  lizard: {
    image: 'lizard.svg',
    win: [{paper: 'eats'}, {spock: 'poisons'}],
    lose: ['rock', 'scissors']
  },
}