import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/members/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('../reserve-by-vehicle/pick-vehicle/vehicles.module').then(
            (m) => m.VehiclesPageModule
          ),
      },
      {
        path: 'my-reservations',
        loadChildren: () =>
          import('../my-reservations/calendar-list/my-reservations.module').then(
            (m) => m.MyReservationsPageModule
          ),
      },

      {
        path: 'create-by-date',
        loadChildren: () =>
          import('../reserve-by-date/reserve-by-date.module').then(
            (m) => m.ReserveByDatePageModule
          ),
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then((m) => m.AccountPageModule),
      },
      {
        path: 'my-tickets',
        loadChildren: () =>
          import('../my-tickets/my-tickets.module').then((m) => m.MyTicketsPageModule),
      },
      {
        path: 'my-incidents',
        loadChildren: () =>
          import('../my-incidents/my-incidents.module').then((m) => m.MyIncidentsPageModule),
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then((m) => m.MapPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
