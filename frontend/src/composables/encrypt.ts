import StringCrypto from 'string-crypto'

export const useStringEncrypt = () => {
    const password = 'Oh-no,not-again'

    const { encryptString, decryptString } = new StringCrypto()

    const encrypt = stringToProtect => encryptString(stringToProtect, password)
    const decrypt = stringToProtect => decryptString(stringToProtect, password)

    return { encrypt, decrypt }
}
