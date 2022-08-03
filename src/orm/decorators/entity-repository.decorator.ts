import { setEntity } from '../utils/decorator.utils';

export function EntityRepository(entity: any): ClassDecorator {
  return (target: any) => {
    setEntity(target, entity);
  };
}
