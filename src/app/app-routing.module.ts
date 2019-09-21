import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {IssueModalComponent} from "./issue-modal/issue-modal.component";

// Redirect to HomeComponent if the URL contain ''
const routes: Routes = [
  {path: 'token-list', component: HomeComponent,
  children: [{
    path: 'issue-token',
    component: IssueModalComponent
  }]},

  // pathMatch: 'full' result in a route hit when
  // the remaining, unmatched segments of the URL match
  // ''.
  {path: '', redirectTo: '/token-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
