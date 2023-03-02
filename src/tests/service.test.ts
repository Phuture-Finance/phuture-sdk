import { sum } from '../omni-transaction-service/service'
// export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0)

test('something', () => {
  //   const result = await getRemoteTransactionStatuses(
  //     '0x46ac434d4791bf87af3e0e14fe3482aa3df40fc85b4a3a2f94c529c7c49135d3',
  //     '1CRQMKJVWNBV5QJ5X1P7JRYTWR5G3AHRMW',
  //     `HRY5PB899EMPXQ38Y2EHZVRA44CBF1MC73`,
  //   )
  //   expect(result.homeToRemote[0].status).toBe('DELIVERED')

  expect(sum(1, 2)).toBe(3)
})
