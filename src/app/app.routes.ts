import { GuideComponent } from './components/guide/guide.component';
import { HomeComponent } from './components/home/home.component';
import { PartieComponent } from './components/partie/partie.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'comment-ca-marche', component: GuideComponent },
  { path: 'partie/:id', component: PartieComponent },
];
