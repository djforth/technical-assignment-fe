export const defaultOptions = { 
  selections: ['rock', 'paper', 'scissors'],
  combinations:[ {rock: null, paper: [0, 'covers'], scissors: [1, 'blunts'] },
  {rock: [1, 'covers'], paper: null, scissors: [0, 'cuts'] },
  {rock: [0, 'blunts'], paper: [1, 'cuts'], scissors: null }],
}

export const advancedOptions = { 
  selections: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
  combinations:[{
    rock: null, 
    paper: [0, 'covers'], scissors: [1, 'blunts'],
    lizard: [1, 'crushes'], 
    spock: [0, 'vaporises']
  },
  {
    rock: [1, 'covers'], 
    paper: null, 
    scissors: [0, 'cuts'], 
    lizard: [0, 'eats'], 
    spock: [1, 'disproves'] 
  },
  {
    rock: [0, 'blunts'], 
    paper: [1, 'cuts'], 
    scissors: null, 
    lizard: [1, 'decapitates'], 
    spock: [0, 'smashes'] 
  },
   {
    rock: [1, 'vaporises'], 
    paper: [0, 'disproves'], 
    scissors: [1, 'smashes'], 
    lizard: [0, 'poisons'], 
    spock: null 
  },
  {
    rock: [0, 'crushes'], 
    paper: [1, 'eats'], 
    scissors: [0, 'decapitates'], 
    lizard: null, 
    spock: [1, 'poisons'] 
  }]
}