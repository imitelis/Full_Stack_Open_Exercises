
export const Asset = {
  fromModule: () => ({
    downloadAsync: jest.fn(),
  }),
}
  
export const useAssets = jest.fn().mockReturnValue([true, true])