// main.ts
import { AbstractUtility } from './AbstractUtility';
import { UtilityFactory } from './UtilityFactory';

const utility: AbstractUtility = UtilityFactory.createUtility();
export default utility
