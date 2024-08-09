// UtilityFactory.ts
import { AbstractUtility } from './AbstractUtility';
import { Utility } from './Utility';

export class UtilityFactory {
    public static createUtility(): AbstractUtility {
        return new Utility();
    }
}
