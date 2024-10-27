import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetInput } from './types/get.input';
import { GetOutput } from './types/get.output';

@Injectable()
export class AxiosProvider {
  async get<Query, Data>(
    url: string,
    getInput: GetInput<Query>,
  ): Promise<GetOutput<Data>> {
    return await axios.get(url, {
      params: getInput.query,
    });
  }
}
