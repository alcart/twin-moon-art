import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {AppShopComponent} from './shop/shop.component'
import {AppAboutComponent} from './about/about.component'
import {AppContactComponent} from './contact-us/contact-us.component'
import {AppArtComponent} from './art/art.component'
import {AppHomeComponent} from './home/home.component'
import {AppNewsComponent} from './news/news.component'

const routes = [
  {path: "shop", component: AppShopComponent},
  {path: "about", component: AppAboutComponent},
  {path: "contact-us", component: AppContactComponent},
  {path: "artworks", component: AppArtComponent},
  {path: "news", component: AppNewsComponent},
  {path: "", component: AppHomeComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule { }
