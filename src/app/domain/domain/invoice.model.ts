import { SaleTypeEnum } from './enums';
import { SaleProductType } from './types';

export interface IInvoiceDomainEntity {
  id?: string;
  numberId: number;
  products: SaleProductType[];
  date: Date;
  type: SaleTypeEnum;
  total: number;
  branchId: string;
  userId: string;
}
