import test from 'ava';
import { process } from '../src/services/dataMassage'
import { mockPreferences } from './fixtures/mockPreferences'
import mockData from './fixtures/mockData'

test('data massaging', t => {
  t.plan(2)
  const result = process(mockData.raw, mockPreferences)
  t.deepEqual(result.data, mockData.processed)
  t.deepEqual(result.environments, mockPreferences.environments)
})

test.todo('main app init')
test.todo('data fetcher mock')
test.todo('loading component')
test.todo('error component')
test.todo('deployment component')
