import React from 'react';
import Head from 'next/head';
import classnames from 'classnames/bind';
import axios from 'axios';
import styles from '../public/demo.scss';

const cx = classnames.bind(styles);

export default class ProgressBarDemo extends React.Component {
  static async getInitialProps() {
    try {
      let { data } = await axios('http://pb-api.herokuapp.com/bars', {
        timeout: 5000,
      });
      return { remote: data };
    } catch (e) {
      const fallback = {
        buttons: [29, 31, -32, -30],
        bars: [14, 45, 17],
        limit: 180,
      };
      return { remote: fallback };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      bars: props.remote ? props.remote.bars : [],
      selected: 0,
    };
  }

  selectBar(selected) {
    this.setState({ selected: Number(selected) });
  }

  updateSelectedBar(value) {
    const bars = this.state.bars;
    bars[this.state.selected] = bars[this.state.selected] + value <= 0 ? 0 : bars[this.state.selected] + value;
    this.setState({ bars });
  }

  render() {
    return (
      <>
        <Head>
          <title>Progress Bar Demo</title>
        </Head>
        {this.state.bars && (
          <div className={cx('container')}>
            <h3>Progress Bar Demo</h3>
            <div className={cx('bars')}>
              {this.state.bars.map((progress, i) => (
                <div
                  className={cx('bar', {
                    selected: i === this.state.selected,
                    exceeded: (progress / this.props.remote.limit) * 100 >= 100,
                  })}
                  key={i}
                  onClick={() => this.selectBar(i)}
                >
                  <div
                    className={cx('progress')}
                    style={{
                      width: `${(progress / this.props.remote.limit) * 100}%`,
                    }}
                  />
                  <div className={cx('label')}>{((progress / this.props.remote.limit) * 100).toFixed(0)}%</div>
                </div>
              ))}
            </div>
            <div className={cx('buttons')}>
              {this.state.bars && (
                <select value={this.state.selected} onChange={e => this.selectBar(e.target.value)}>
                  {this.state.bars.map((_, i) => (
                    <option value={i} key={i}>
                      #progress {i + 1}
                    </option>
                  ))}
                </select>
              )}
              <div className={cx('button-group')}>
                {this.props.remote.buttons.map((button, i) => (
                  <button className={cx('button')} key={i} onClick={() => this.updateSelectedBar(button)}>
                    {button}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
