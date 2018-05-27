import React from 'react';
import ClientResume from '../ClientResume';
import Enzyme,{shallow,mount,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


// describe what we are testing
describe('Login Component', () => { 
 it('should render without throwing an error', () => {
   expect(shallow(<ClientResume />).exists(<form id='personal_form'></form>)).toBe(true)
 })
})


