import { ObjectMapper, ObjectMapperAction, ObjectMapperMap } from 'src/app/models/mapper';

const getItemInObject = (source: any, mapperItem: ObjectMapper) => {
  let currentValue = source;
  mapperItem.path.forEach((segment) => {
    currentValue = currentValue[segment];
  });
  return currentValue;
};

const mapArray = (rawValue: any[], mapCallback: () => {}): any => {
  return rawValue.map(mapCallback);
};

const actionsMapping = {
  mapArray
};

const mapActions = (actions: ObjectMapperAction[], rawValue: any): any => {
  actions.forEach(currentAction => {
    rawValue = actionsMapping[currentAction.name](rawValue, currentAction.action);
  });
  return rawValue;
};


export const mapObject = (objectMapper: ObjectMapperMap, object: {}) => {
  if (!object) {
    return null;
  }
  return Object.keys(objectMapper).map(key => {
    let value = getItemInObject(object, objectMapper[key]);
    if (objectMapper[key].actions) {
      value = mapActions(objectMapper[key].actions, value);
    }
    return {key, value};
  });
};
