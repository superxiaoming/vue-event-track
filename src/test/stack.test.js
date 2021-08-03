import Stack from '../core/stack'

function singleTon() {
  const StackOne = new Stack()
  StackOne.push(1)
  const StackTwo = new Stack()
  StackTwo.push(2)
  return StackOne === StackTwo
}

function getActions() {
  const StackThree = new Stack()
  return StackThree.getActions()
}

test('singleTon', () => {
  expect(singleTon()).toBeTruthy()
  expect([1, 2]).toEqual(expect.arrayContaining(getActions()))
})
