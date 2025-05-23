import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }


  filter() {
    const queryObj = { ...this.query }; 
  
    const excludeFields = ['search', 'sort', 'limit', 'page', 'fields'];

    
    excludeFields.forEach((el) => delete queryObj[el]); 
                                   
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);       

    return this;
  }


}

export default QueryBuilder;
