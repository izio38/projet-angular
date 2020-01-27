export class Hero {
  id: string;
  name: string;
  abilities: HeroAbilities;

  constructor(id: string, name: string, abilities: HeroAbilities) {
    this.id = id;
    this.name = name;
    this.abilities = abilities;
  }

  getTotalAbilityPoints(): number {
    return (
      this.abilities.agility +
      this.abilities.attack +
      this.abilities.strength +
      this.abilities.health
    );
  }

  getRemainingAbilityPoints(): number {
    return 40 - this.getTotalAbilityPoints();
  }
}

export interface HeroAbilities {
  strength: number;
  agility: number;
  attack: number;
  health: number;
}
