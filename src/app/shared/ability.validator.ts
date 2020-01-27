import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const abilityValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const agility = parseInt(control.get('agility').value, 10);
  const attack = parseInt(control.get('attack').value, 10);
  const strength = parseInt(control.get('strength').value, 10);
  const health = parseInt(control.get('health').value, 10);

  return (agility + attack + strength + health) > 40 ? { abilityValidator: true } : null;
};
