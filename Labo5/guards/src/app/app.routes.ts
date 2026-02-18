import { Routes } from '@angular/router';
import { VerreDEau } from './verre-deau/verre-deau';
import { Bonbon } from './bonbon/bonbon';
import { Sel } from './sel/sel';
import { CaramelAuSel } from './caramel-au-sel/caramel-au-sel';
import { App } from './app';
import { canActivateGuard } from './can-activate-guard';

export const routes: Routes = [
    {path: "verreDeau", component: VerreDEau},
    {path: "bonbon", component: Bonbon},
    {path: "sel", component: Sel},
    {path: "caramelAuSel", component: CaramelAuSel, canActivate:[canActivateGuard]}
];
