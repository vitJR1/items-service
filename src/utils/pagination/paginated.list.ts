import { PaginatedListInfo } from './paginated.list.info';

export interface PaginatedList<
  Entity,
  Info extends PaginatedListInfo = PaginatedListInfo,
> {
  items: Entity[];
  info: Info;
}
