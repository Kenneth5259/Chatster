import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// route storage
const routes: Routes = [];

// Module Declaration
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
  })
  export class AuthRoutingModule {}
  