import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App';

Enzyme.configure({ adapter: new Adapter() })

/**
 * Factory function to create shallo wrapper for the App component
 * @function setup
 * @param {object} props - component props specific to App
 * @param {any} state 
 * @returns {shallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper
}

/**
 * Factory function to find node(s) with give data-test value.
 * @param {ShallowWrapper} wrapper 
 * @param {string} val - data-test value of node
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders App without crashing', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
});

test("Render increment button", () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('Render counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('Counter start form 0', () => {
  const wrapper = setup()
  const initialCounter = wrapper.state('counter')
  expect(initialCounter).toBe(0)
})

test('Increment counter by click on button', () => {
  let counter = 7
  const wrapper = setup(null, { counter })
  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')

  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter + 1)
})

//decrement button tests

test('Render decrement button', () => {
  const wrapper = setup()
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  expect(decrementButton.length).toBe(1)
})

test('Decrement counter on clicking on button', () => {
  let counter = 7
  const wrapper = setup(null, { counter })
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')
  //decrement counter by 1
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter - 1)
})

test('Counter can not go bellow 0 on decrement', () => {
  let counter = 0
  const wrapper = setup(null, { counter })
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')

  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter)

})

test('Show error if try to decrement counter after 0', () => {
  let counter = 0
  const wrapper = setup(null, { counter })
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')
  //find error element to match error text
  const errorElement = findByTestAttr(wrapper, 'decrement-error')
  expect(errorElement.text()).toContain("The counter can't go below 0")
})

test('clear error if increment counter by clicking on increment button', () => {
  let counter = 0
  let isError = true
  const wrapper = setup(null, { counter, isError })
  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  incrementButton.simulate('click')
  //find error element and counter-display
  const errorElement = findByTestAttr(wrapper, 'decrement-error')
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  //expect error element should be empty
  expect(errorElement.exists()).toBeFalsy()
  //expect counter should be increment by 1
  expect(counterDisplay.text()).toContain(counter + 1)

})