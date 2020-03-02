import {Component, EventEmitter, Input, OnInit, AfterViewInit, Output, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abilityValidator} from './ability.validator';
import {Hero} from '../../dto/heroes';
import {Abilities} from '../../dto/abilities';
import {Observable, of} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {catchError, finalize, map} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {uuid} from 'uuidv4';
import {WeaponService} from '../../services/weapon.service';
import {Weapon} from '../../dto/weapons';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 100})),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class HeroFormComponent implements OnInit, AfterViewInit {

  @Input() isCreationMode: boolean;
  @Input() hero: Hero = null;

  @Output() createRequested: EventEmitter<any> = new EventEmitter();
  @Output() editRequested: EventEmitter<any> = new EventEmitter();

  heroForm: FormGroup;

  uploadTextState = 'Ajouter un avatar';
  uploadPercent: Observable<number>;
  imageDownloadURI: string = null;

  weapons: Weapon[];

  files: Array<FileUploadModel> = [];

  constructor(private readonly renderer: Renderer2, private storage: AngularFireStorage, private readonly weaponService: WeaponService) {
  }

  ngOnInit() {
    this.weaponService.getWeapons().subscribe((weapons) => {
      this.weapons = weapons;
    });

    if (this.isCreationMode) {
      this.heroForm = new FormGroup(
        {
          name: new FormControl('', [Validators.minLength(3)]),
          agility: new FormControl(1, [Validators.min(1), Validators.max(40)]),
          attack: new FormControl(1, [Validators.min(1), Validators.max(40)]),
          health: new FormControl(1, [Validators.min(1), Validators.max(40)]),
          strength: new FormControl(1, [Validators.min(1), Validators.max(40)]),
          weapon: new FormControl(null, [Validators.required])
        },
        {validators: abilityValidator}
      );
    } else {
      this.heroForm = new FormGroup(
        {
          name: new FormControl(this.hero.name, [Validators.minLength(3)]),
          agility: new FormControl(this.hero.abilities.agility, [Validators.min(1), Validators.max(40)]),
          attack: new FormControl(this.hero.abilities.attack, [Validators.min(1), Validators.max(40)]),
          health: new FormControl(this.hero.abilities.health, [Validators.min(1), Validators.max(40)]),
          strength: new FormControl(this.hero.abilities.strength, [Validators.min(1), Validators.max(40)]),
          weapon: new FormControl(this.hero.weaponId, [Validators.required])
        },
        {validators: abilityValidator}
      );
      if (this.hero.avatarURI) {
        this.imageDownloadURI = this.hero.avatarURI;
        this.uploadTextState = 'Changer l\'avatar';
      }
    }

    this.heroForm.valueChanges.subscribe((values) => {
      if (this.heroForm.valid) {
        if (!this.hero) {
          this.hero = new Hero('', values.name, {
            agility: values.agility,
            strength: values.strength,
            health: values.health,
            attack: values.attack
          });
        }
        this.hero.setAttack(values.attack)
          .setStrength(values.strength)
          .setHealth(values.health)
          .setAgility(values.agility);
      }
    });
  }

  ngAfterViewInit(): void {
    // This causes error but it could be great to have it in a working state
    // this.renderer.selectRootElement('#nameInput').focus();
  }

  async submitForm() {
    const {health, strength, attack, agility}: Abilities = this.heroForm.value;
    const avatarURI = this.imageDownloadURI;
    const weaponId = this.heroForm.value.weapon;

    if (this.isCreationMode) {
      this.createRequested.emit({avatarURI, health, strength, attack, agility, name: this.heroForm.value.name, weaponId});
    } else {
      this.editRequested.emit({avatarURI, health, strength, attack, agility, name: this.heroForm.value.name, weaponId});
    }
  }

  cancelFile(file: FileUploadModel) {
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  onUploadImageClicked() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true, downloadURI: null
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append('file', file.data);

    const filePath = uuid();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file.data);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((downloadURI) => {
          this.imageDownloadURI = downloadURI;
          this.removeFileFromArray(file);
        });

      })
    )
      .subscribe();

    file.inProgress = true;
    file.sub = this.uploadPercent.pipe(
      map(percent => {
        return file.progress = Math.round(percent);
      }),
      catchError((error) => {
          file.inProgress = false;
          file.canRetry = true;
          return of(`${file.data.name} upload failed.`);
        }
      ));
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
}

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Observable<any>;
  downloadURI: Observable<string>;
}
