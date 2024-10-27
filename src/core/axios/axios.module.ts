import { AxiosProvider } from './axios.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [AxiosProvider],
  exports: [AxiosProvider],
})
export class AxiosModule {}
