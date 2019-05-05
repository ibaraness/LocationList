
export interface ObjectMapperAction {
  name: string;
  action: Function;
}

export interface ObjectMapper {
  path: string[];
  actions?: ObjectMapperAction[];
}

export interface ObjectMapperMap {
  [name: string]: ObjectMapper;
}
