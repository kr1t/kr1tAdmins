export const useEnv = () => {
  const env = import.meta.env
  const getEnv = (n, def = false) => env[n] || def

  return { getEnv }
}
