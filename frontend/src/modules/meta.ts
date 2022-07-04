import { type UserModule } from '~/types'
const DEFAULT_TITLE = 'Some Default Title'

export const install: UserModule = ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title || DEFAULT_TITLE
    next()
  })
}
