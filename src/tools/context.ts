import { AppContext, App } from 'vue'
import { MotionPlugin } from '@vueuse/motion'

export let appContext: AppContext

export default {
    install(app: App) {
        appContext = app._context
        app.use(MotionPlugin)
    },
}
