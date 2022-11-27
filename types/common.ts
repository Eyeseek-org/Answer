// infers types of elements of array
export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;
