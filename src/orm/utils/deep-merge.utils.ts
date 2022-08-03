import merge from 'merge-deep';

export function mergeDeep(target: any, sources: any): object {
  return merge(target, sources);
}
