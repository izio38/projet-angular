export class Weapon {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromValues(values: any) {
    if (values.name) {
      return new Weapon('', values.name);
    }
  }

  setName(name: string): Weapon {
    this.name = name;
    return this;
  }

  setId(id: string): Weapon {
    this.id = id;
    return this;
  }


  toFlatJSON() {
    return {
      name: this.name,
    };
  }
}
