import { ashtanga } from './cards/yogastyles/ashtanga';
import { hatha } from './cards/yogastyles/hatha';
import { hotyoga } from './cards/yogastyles/hotyoga';
import { kundalini } from './cards/yogastyles/kundalini';
import { iyengar } from './cards/yogastyles/iyengar';
import { restorative } from './cards/yogastyles/restorative';
import { vinyasa } from './cards/yogastyles/vinyasa';
import { yin } from './cards/yogastyles/yin';
import { basicseats } from './cards/postures/basicseats';

export { sections } from './categories';

export const flashcards = [
  ...ashtanga,
  ...hatha,
  ...hotyoga,
  ...kundalini,
  ...iyengar,
  ...restorative,
  ...vinyasa,
  ...yin,
  ...basicseats,
];

export const getCardsByCategory = (categoryId) =>
  categoryId === 'all' ? flashcards : flashcards.filter(c => c.category === categoryId);

export const getAllCards = () => flashcards;
