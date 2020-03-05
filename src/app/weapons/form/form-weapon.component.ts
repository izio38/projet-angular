import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { abilityValidator } from './abilities.validator';
import { Weapon } from '../../dto/weapons';
import { Observable, of } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AngularFireStorage } from '@angular/fire/storage';
import { uuid } from 'uuidv4';
import { catchError, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-form-weapon',
  templateUrl: './form-weapon.component.html',
  styleUrls: ['./form-weapon.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class FormWeaponComponent implements OnInit {
  @Input() isCreationMode: boolean;
  @Input() weapon: Weapon = null;

  @Output() createRequested: EventEmitter<any> = new EventEmitter();
  @Output() editRequested: EventEmitter<any> = new EventEmitter();

  uploadTextState = 'Ajouter un avatar';
  uploadPercent: Observable<number>;
  imageDownloadURI: string = null;
  files: Array<FileUploadModel> = [];

  weaponForm: FormGroup;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {
    if (this.isCreationMode) {
      this.weaponForm = new FormGroup(
        {
          name: new FormControl('', [Validators.minLength(3)]),
          agility: new FormControl(-1, [Validators.min(-5), Validators.max(5)]),
          attack: new FormControl(-1, [Validators.min(-5), Validators.max(5)]),
          health: new FormControl(1, [Validators.min(-5), Validators.max(5)]),
          strength: new FormControl(1, [Validators.min(-5), Validators.max(5)]),
        },
        { validators: abilityValidator }
      );
    } else {
      this.weaponForm = new FormGroup(
        {
          name: new FormControl(this.weapon.name, [Validators.minLength(3)]),
          agility: new FormControl(this.weapon.abilities.agility, [
            Validators.min(-5),
            Validators.max(5),
          ]),
          attack: new FormControl(this.weapon.abilities.attack, [
            Validators.min(-5),
            Validators.max(5),
          ]),
          health: new FormControl(this.weapon.abilities.health, [
            Validators.min(-5),
            Validators.max(5),
          ]),
          strength: new FormControl(this.weapon.abilities.strength, [
            Validators.min(-5),
            Validators.max(5),
          ]),
        },
        { validators: abilityValidator }
      );
    }
    if (this.weapon && this.weapon.avatarURI) {
      this.imageDownloadURI = this.weapon.avatarURI;
      this.uploadTextState = 'Changer l\'avatar';
    }
  }

  submitForm() {
    const { name, agility, health, attack, strength } = this.weaponForm.value;
    const avatarURI = this.imageDownloadURI;

    if (this.isCreationMode) {
      this.createRequested.emit({
        avatarURI,
        name,
        agility,
        health,
        attack,
        strength,
      });
    } else {
      this.editRequested.emit({
        avatarURI,
        name,
        agility,
        health,
        attack,
        strength,
      });
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
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file,
          state: 'in',
          inProgress: false,
          progress: 0,
          canRetry: false,
          canCancel: true,
          downloadURI: null,
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

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURI => {
            this.imageDownloadURI = downloadURI;
            this.removeFileFromArray(file);
          });
        })
      )
      .subscribe();

    file.inProgress = true;
    file.sub = this.uploadPercent.pipe(
      map(percent => {
        return (file.progress = Math.round(percent));
      }),
      catchError(error => {
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    );
  }

  private uploadFiles() {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
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

class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Observable<any>;
  downloadURI: Observable<string>;
}
