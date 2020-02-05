// import { shallow, configure, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
// import ReactDOM from 'react-dom';
import { App } from './App';
import mockAxios from './__mocks__/axios';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

describe('App', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  // Functional without warnings but a bit too much boiler plate
  // and there doesn't seem to be a way to find components rendered
  // within the parent
  it('renders successfully', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [{ name: 'name', abv: 12, image_url: 'test url' }]
      })
    );

    console.log('pre container', container);
    let rendered;
    await act(async () => {
      rendered = render(<App />, container);
      console.log(rendered.debug());
      expect(rendered.queryByAltText('beer pic')).toBeFalsy();
    });
    console.log(mockAxios.get.mock.calls.length);
    // console.log(rendered.queryByAltText('beer pic'));
    console.log(rendered.debug());
    expect(rendered.queryByAltText('beer pic')).toBeTruthy();
  });
});

// describe('App', () => {
//   const renderComponent = () => mount(<App abv={12} />);

//   beforeAll(() => {
//     configure({ adapter: new Adapter() });
//   });

//   it('renders successfully', () => {
//     mockAxios.get.mockImplementationOnce(() =>
//       Promise.resolve({
//         data: [{ name: 'name', abv: 12, image_url: 'test url' }]
//       })
//     );
//     jest.useFakeTimers();
//     const rendered = renderComponent();

//     act(() => {
//       jest.runAllImmediates();
//     });
//     expect(rendered.find('img')).toHaveLength(1);
//   });
// });

// describe('Abv', () => {
//   const renderComponent = () => mount(<Abv abv={12} />);

//   beforeAll(() => {
//     configure({ adapter: new Adapter() });
//   });

//   it('renders successfully', () => {
//     jest.useFakeTimers();
//     const rendered = renderComponent();

//     act(() => {
//       jest.runAllImmediates();
//     });
//     expect(rendered.find('.above-6')).toHaveLength(1);
//   });
// });
