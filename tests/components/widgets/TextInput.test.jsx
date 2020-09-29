import React from 'react';
import { shallow, mount, render } from 'enzyme';

import TextInput from '../../../src/components/widgets/TextInput';

describe('<TextInput/>', () => {
  it('renders a <input /> field', () => {
    const wrapper = shallow(<TextInput />);
    expect(wrapper.find('input')).toHaveLength(1);
  });
});
