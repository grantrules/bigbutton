import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Button from '../../../src/components/widgets/Button';

describe('<Button/>', () => {
  it('renders a red <button>', () => {
    const wrapper = shallow(<Button id="1" color="red" />);
    expect(wrapper.find('button')).toHaveLength(1);
  });
});