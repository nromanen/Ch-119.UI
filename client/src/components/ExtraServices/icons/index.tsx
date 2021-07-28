import { ReactComponent as BabyChair } from './babyChair.svg';
import { ReactComponent as En } from './en.svg';
import { ReactComponent as Silent } from './silent.svg';
import { ExtraServices } from '../../../constants/orderConstants';

export interface IconsI {
  [index: number]: any;
}

export const extraServicesIcons: IconsI = {
  [ExtraServices.ENGLISH_SPEAKING]: En,
  [ExtraServices.SILENT_DRIVER]: Silent,
  [ExtraServices.BABY_CHAIR]: BabyChair,
};
