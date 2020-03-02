import { Abilities } from './abilities';

export class Weapon {
  id: string;
  name: string;
  abilities: Abilities;
  documentReferencePath: string = null;

  constructor(id: string, name: string, abilities: Abilities) {
    this.id = id;
    this.name = name;
    this.abilities = abilities;
  }

  static fromValues(values: any) {
    return new Weapon('', values.name, {
      agility: values.agility,
      attack: values.attack,
      health: values.health,
      strength: values.strength,
    });
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
    return -this.getTotalAbilityPoints();
  }

  setName(name: string): Weapon {
    this.name = name;
    return this;
  }

  setId(id: string): Weapon {
    this.id = id;
    return this;
  }

  setAgility(agility: number): Weapon {
    this.abilities.agility = agility;
    return this;
  }

  setStrength(strength: number): Weapon {
    this.abilities.strength = strength;
    return this;
  }

  setAttack(attack: number): Weapon {
    this.abilities.attack = attack;
    return this;
  }

  setHealth(health: number): Weapon {
    this.abilities.health = health;
    return this;
  }

  toFlatJSON() {
    return {
      name: this.name,
      agility: this.abilities.agility,
      strength: this.abilities.strength,
      health: this.abilities.health,
      attack: this.abilities.attack,
    };
  }

  setDocumentReferencePath(referencePath: string): Weapon {
    this.documentReferencePath = referencePath;
    return this;
  }

  getDocumentReferencePath(): string {
    return this.documentReferencePath;
  }
}
