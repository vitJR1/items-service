import { Currency } from '../enum/currency.enum';

export class GetItemsInput {
  app_id: number;
  currency: Currency;
  tradable: boolean;
}
