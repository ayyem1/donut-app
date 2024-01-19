import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';

import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutFormComponent } from './components/donut-form/donut-form.component';

@NgModule({
  declarations: [
    DonutListComponent,
    DonutSingleComponent,
    DonutCardComponent,
    DonutFormComponent,
  ],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [DonutListComponent, DonutSingleComponent, DonutCardComponent],
})
export class AdminModule {}
