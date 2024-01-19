import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-form',
  template: `
    <form class="donut-form" #form="ngForm">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          required
          minlength="5"
          [ngModel]="donut.name"
          [ngModelOptions]="{ updateOn: 'blur' }"
          #name="ngModel"
        />
        <ng-container *ngIf="name.invalid && name.touched">
          <div class="donut-form-error" *ngIf="name.errors?.required">
            Name is required
          </div>
          <div class="donut-form-error" *ngIf="name.errors?.minlength">
            Min length of name is 5!
          </div>
        </ng-container>
      </label>
      <label>
        <span>Price</span>
        <input
          type="number"
          name="price"
          class="input"
          required
          [ngModel]="donut.price"
          #price="ngModel"
        />
        <ng-container *ngIf="price.invalid && price.touched">
          <div class="donut-form-error" *ngIf="price.errors?.required">
            Price is required.
          </div>
        </ng-container>
      </label>
      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input
            type="radio"
            name="promo"
            [value]="undefined"
            [ngModel]="donut.promo"
          />
          <span>None</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="new"
            [ngModel]="donut.promo"
          />
          <span>New</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="limited"
            [ngModel]="donut.promo"
          />
          <span>Limited</span>
        </label>
      </div>
      <select
        name="icon"
        class="input input--select"
        required
        [ngModel]="donut.icon"
        #icon="ngModel"
      >
        <option *ngFor="let icon of icons" [ngValue]="icon">{{ icon }}</option>
      </select>
      <ng-container *ngIf="icon.invalid && icon.touched">
        <div class="donut-form-error" *ngIf="icon.errors?.required">
          Icon is required.
        </div>
      </ng-container>
      <label>
        <span>Description</span>
        <textarea
          name="description"
          class="input input--textarea"
          required
          [ngModel]="donut.description"
          #description="ngModel"
        >
        </textarea>
        <ng-container *ngIf="description.invalid && description.touched">
          <div class="donut-form-error" *ngIf="description.errors?.required">
            Description is required.
          </div>
        </ng-container>
      </label>
      <button
        type="button"
        class="btn btn--green"
        [disabled]="form.invalid"
        (click)="handleCreate(form)"
      >
        Create
      </button>
      <button
        type="button"
        class="btn btn--green"
        [disabled]="form.untouched"
        (click)="handleUpdate(form)"
      >
        Update
      </button>
      <button
        type="button"
        class="btn btn--green"
        (click)="handleDelete(form)"
      >
        Delete
      </button>
      <button type="button" class="btn btn--grey" (click)="form.resetForm()">
        Reset Form
      </button>
      <div class="donut-form-working" *ngIf="form.valid && form.submitted">
        Working...
      </div>
      <pre>{{ form.value | json }}</pre>
      <pre>{{ donut | json }}</pre>
    </form>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-content: center;
          &-label {
            margin-right: 10px;
          }
          label {
            display: flex;
            align-items: center;
            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }
        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }
        &-error {
          font-size: 12px;
          color: #e66262;
        }
      }
    `,
  ],
})
export class DonutFormComponent {
  @Input() donut!: Donut;

  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();

  icons: string[] = [
    'caramel-split',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  constructor() {}

  handleCreate(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    this.create.emit(form.value);
  }

  handleUpdate(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    this.update.emit({ id: this.donut.id, ...form.value });
  }

  handleDelete(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    if (confirm(`Really delete ${this.donut.name}?`)) {
      this.delete.emit({ ...this.donut });
    }
  }
}
