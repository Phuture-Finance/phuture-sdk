import axios, {AxiosRequestConfig} from 'axios';
import type {DeepPartial} from '@phuture/types';
import {withDefaults} from '@phuture/with-defaults';

export const request = (options: DeepPartial<AxiosRequestConfig> = {}) =>
	axios.create(withDefaults(options, {}));
