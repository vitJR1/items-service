import { Injectable } from '@nestjs/common';
import { GetItemsInput } from './types/get-items.input';
import { GetItemsOutput } from './types/get-items.output';
import { AxiosProvider } from '../../core/axios/axios.provider';

@Injectable()
export class ItemsAxiosProvider {
  constructor(private readonly axiosProvider: AxiosProvider) {}

  async getItems(data: GetItemsInput): Promise<GetItemsOutput[]> {
    return await this.axiosProvider
      .get<GetItemsInput, GetItemsOutput[]>(
        'https://api.skinport.com/v1/items',
        {
          query: data,
        },
      )
      .then((result) => result.data);
  }
}
