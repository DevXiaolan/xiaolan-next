/**
 * 全局数据流范例
 * 在其他文件
 * import globalStore from '@/store/global';
 *
 * ...
 * const { siteName } = globalStore.useState('siteName')
 * ...
 */
import Rekv from 'rekv';

export interface IState {
  siteName: string;
  keyword?: string;
  author: string;
  github: string;
}

const initialState: IState = {
  siteName: '闻道有先后',
  keyword: '',
  author: '开发者小蓝',
  github: 'https://github.com/DevXiaolan',
};

export default new Rekv(initialState);
