import { createI18n } from 'vue-i18n'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
    app.directive('money', {
        created(el, binding) {
            const n = binding.length ? binding.value[0] : false
            const x = binding.length ? binding.value[1] : false
            const val = +el.innerHTML
            const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`
            el.innerHTML = val.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
        },
    })
}
