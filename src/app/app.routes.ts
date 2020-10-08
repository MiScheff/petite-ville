import { HomeComponent } from './components/home/home.component';
import { PartieComponent } from './components/partie/partie.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'partie/:id', component: PartieComponent },
];
