type OrientationLockType = 'any' | 'landscape' | 'landscape-primary' | 'landscape-secondary' | 'natural' | 'portrait' | 'portrait-primary' | 'portrait-secondary'

export function useScreenOrientation () {
  async function lockOrientation (targetOrientation: OrientationLockType = 'landscape') {
    try {
      await document.documentElement.requestFullscreen()
      await screen.orientation.lock(targetOrientation)
    } catch {}
  }

  async function unlockOrientation () {
    try {
      screen.orientation.unlock()
      await document.exitFullscreen()
    } catch {}
  }

  return {
    lockOrientation,
    unlockOrientation
  }
}
