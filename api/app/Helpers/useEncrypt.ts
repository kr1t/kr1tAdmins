import StringCrypto from 'string-crypto'

const password = 'Oh-no,not-again'

const { encryptString, decryptString } = new StringCrypto()

const encrypt = (stringToProtect) => encryptString(stringToProtect, password)
const decrypt = (stringToProtect) => decryptString(stringToProtect, password)

export { encrypt, decrypt }
