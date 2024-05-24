jest.mock('expo-asset', () => {
  return {
    Asset: {
      fromModule: () => ({
        downloadAsync: jest.fn(),
      }),
    },
    useAssets: jest.fn().mockReturnValue([true, true]),
  }
})

jest.mock('expo-font')