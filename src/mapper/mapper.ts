export interface IMapper<Type> {
  toClient(source: any): Type;
  toListClient(json: any): Type[];
}
