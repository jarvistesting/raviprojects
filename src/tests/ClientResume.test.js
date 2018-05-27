import React from 'react';
import ClientResume from '../ClientResume';
import SidebarNav from '../ClientResume';
import renderer from 'react-test-renderer';
import Enzyme,{shallow,mount,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('ClientResume Component',()=> {
    it('renders 1 <ClientResume /> component',() => {
        const component = shallow(<ClientResume />);
        expect(component).toHaveLength(1);
    });
});

describe('Sidebar Component',()=> {
    it('renders 1 <SidebarNav /> component',() => {
        const component = shallow(<SidebarNav />);
        expect(component).toHaveLength(1);
    });
});

describe('App Snapshot', () => {
  test('renders', () => {
    const component = renderer.create(
      <ClientResume />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});