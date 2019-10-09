import { shallow } from 'enzyme';
import ProgressBarDemo from '../pages';

const defaultData = {
  buttons: [29, 31, -32, -30],
  bars: [14, 45, 17],
  limit: 180,
};

describe('ProgressBar Demo', () => {
  it('can fetch from remote source', async () => {
    const { remote } = await ProgressBarDemo.getInitialProps();
    expect(remote).not.toBe(null);
  });

  it('renders bars', () => {
    const template = shallow(<ProgressBarDemo remote={defaultData} />);
    expect(template.find('.bar').length).toBe(3);
  });

  it('renders buttons', () => {
    const template = shallow(<ProgressBarDemo remote={defaultData} />);
    expect(template.find('.button').length).toBe(4);
  });

  it('renders select button', () => {
    const template = shallow(<ProgressBarDemo remote={defaultData} />);
    expect(template.find('select').length).toBe(1);
  });

  it('can select a bar from dropdown', () => {
    const template = shallow(<ProgressBarDemo remote={defaultData} />);
    template.find('select').simulate('change', { target: { value: 1 } });
    expect(template.state('selected')).toBe(1);
  });

  it('can select a bar from click', () => {
    const template = shallow(<ProgressBarDemo remote={defaultData} />);
    template
      .find('.bar')
      .at(1)
      .simulate('click');
    expect(template.state('selected')).toBe(1);
  });

  it('can update the bar progress from button', () => {
    const template = shallow(<ProgressBarDemo remote={defaultData} />);
    template
      .find('.button')
      .at(1)
      .simulate('click');
    expect(template.state('bars')[0]).toBe(45);
  });

  it('can change style when progress limit is reached', () => {
    const template = shallow(<ProgressBarDemo remote={defaultData} />);
    template.setState({ ...defaultData, bars: [254, 45, 17] });
    expect(template.find('.bar.exceeded').exists()).toBe(true);
  });

  it('can default to 0 when add negative values', () => {
    const template = shallow(
      <ProgressBarDemo remote={{ buttons: [29, 31, -32, -30], bars: [14, 45, 17], limit: 180 }} />
    );
    template
      .find('.button')
      .at(2)
      .simulate('click');
    expect(template.state('bars')[0]).toBe(0);
  });
});
