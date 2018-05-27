import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

test('Qualification changes the class when add', () => {
 const component = renderer.create(
   <Qualification />,
 );
 let tree = component.toJSON();
 expect(tree).toMatchSnapshot();

 // manually trigger the callback
 tree.props.onAdd();
 // re-rendering
 tree = component.toJSON();
 expect(tree).toMatchSnapshot();

 /*import React from 'react';
import {ClientResume} from './ClientResume';
import {shallow} from 'enzyme';*/
 

 //const component = shallow(<ClientResume />);
 //console.log(component);
/*describe(<ClientResume />,()=>{
    it('renders 1 <ClientResume /> component',() => {
        const component = shallow(<ClientResume />);
        //console.log(component);
        expect(component).toHaveLength(1);
    });
});*/
/*console.log(ClientResume);
it('render without crashing',()=>{
    //const div=document.createElement('div');
    //console.log(document.querySelector("#root"));
    //ReactDom.render(<ClientResume />,document.querySelector("#root"));
    expect(JSON.stringify(ClientResume)).toMatchSnapshot();
});*/


/*import React from 'react';
import ClientResume from './ClientResume';
import renderer from 'react-test-renderer';*/

/*test('Qualification changes the class when add', () => {
 const component = renderer.create(
   <ClientResume />.toJSON();
 );
 let tree = component.toJSON();
 expect(tree).toMatchSnapshot();

 // manually trigger the callback
 tree.props.onAdd();
 // re-rendering
 tree = component.toJSON();
 expect(tree).toMatchSnapshot();
});*/

 
/*const component = renderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
); 
console.log(component.toJSON());*/
