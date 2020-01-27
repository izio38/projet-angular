import {Hero} from './dto/heroes';

export const HEROES: Hero[] = [
  new Hero('0', 'Quentin', {agility: 5, attack: 1, health: 20, strength: 2}),
  new Hero('1', 'Tom', {agility: 20, health: 5, strength: 9, attack: 1}),
  new Hero('2', 'Adil - Didacticiel', {
    attack: 1,
    strength: 1,
    health: 1,
    agility: 30,
  }),
  new Hero('3', 'Romain', {health: 30, strength: 2, attack: 3, agility: 2}),
];
