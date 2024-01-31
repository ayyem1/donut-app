import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';

import { RouterModule, Routes } from '@angular/router';
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutFormComponent } from './components/donut-form/donut-form.component';

export const routes: Routes = [
  { path: 'donuts', component: DonutListComponent },
  {
    path: 'donuts/new',
    component: DonutSingleComponent,
    data: { isEdit: false },
  },
  {
    path: 'donuts/:id',
    component: DonutSingleComponent,
    data: { isEdit: true },
  },
  { path: 'donut', component: DonutSingleComponent },
  { path: '', pathMatch: 'full', redirectTo: 'donuts' },
];

@NgModule({
  declarations: [
    DonutListComponent,
    DonutSingleComponent,
    DonutCardComponent,
    DonutFormComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
