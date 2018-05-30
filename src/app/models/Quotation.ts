/**
 * Created by e.emmeni on 28/06/17.
 */

import {Consultation, ConsultationItem} from './Consultation';

export interface Quotation {
  id: string;
  name: string;
  consultationId: string;
  consultationItem: ConsultationItem;
  elements: any;
}

export interface QuotationItem {
  id: string;
  quotationId: string;
  quantity: string;
  price: string;
  description: string;
  name: string;
  consultationItemId: string;
  consultationItem: ConsultationItem;
  groupName: string;
}
