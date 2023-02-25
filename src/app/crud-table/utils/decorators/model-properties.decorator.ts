import "reflect-metadata";

export const modelPropertiesMetadataKey = Symbol("modelProperties");

export const registerProperty = (target: any, propertyKey: string): void => {
  let properties: string[] = Reflect.getMetadata(
    modelPropertiesMetadataKey,
    target
  );

  if (properties) {
    properties.push(propertyKey);
  } else {
    properties = [propertyKey];
    Reflect.defineMetadata(modelPropertiesMetadataKey, properties, target);
  }
};
