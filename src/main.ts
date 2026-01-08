import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { TipListPage } from './app/pages/tip/list/tip-list.page'

bootstrapApplication(TipListPage, appConfig)
  .catch((err) => console.error(err));
