import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser'
import { config } from './app/app.config.server'
import { TipListPage } from './app/pages/tip/list/tip-list.page'

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(TipListPage, config, context)

export default bootstrap
