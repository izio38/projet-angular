import {Abilities} from './abilities';

export class Hero {
  id: string;
  name: string;
  abilities: Abilities;
  documentReferencePath: string = null;
  avatarURI: string;
  weaponId: string;

  constructor(id: string, name: string, abilities: Abilities) {
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

  toFlatJSON() {
    return {
      name: this.name,
      agility: this.abilities.agility,
      attack: this.abilities.attack,
      health: this.abilities.health,
      strength: this.abilities.strength,
      avatarURI: this.avatarURI,
      weaponId: this.weaponId
    };
  }

  setName(name: string): Hero {
    this.name = name;
    return this;
  }

  setAgility(agility: number): Hero {
    this.abilities.agility = agility;
    return this;
  }

  setStrength(strength: number): Hero {
    this.abilities.strength = strength;
    return this;
  }

  setAttack(attack: number): Hero {
    this.abilities.attack = attack;
    return this;
  }

  setHealth(health: number): Hero {
    this.abilities.health = health;
    return this;
  }

  setDocumentReferencePath(referencePath: string): Hero {
    this.documentReferencePath = referencePath;
    return this;
  }

  setAvatarURI(avatarURI: string): Hero {
    this.avatarURI = avatarURI;
    return this;
  }

  setWeaponId(weaponId: string): Hero {
    this.weaponId = weaponId;
    return this;
  }

  getAvatarURI(): string {
    return this.avatarURI;
  }

  getDocumentReferencePath(): string {
    return this.documentReferencePath;
  }

}
