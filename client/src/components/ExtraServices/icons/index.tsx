import { ReactComponent as BabyChair } from './babyChair.svg';
import { ReactComponent as En } from './en.svg';
import { ReactComponent as Silent } from './silent.svg';

export interface IconsI {
  [index: string]: any;
}

export const extraServicesIcons: IconsI = {
  'English speaking': En,
  'Silent driver': Silent,
  'Baby chair': BabyChair,
};
