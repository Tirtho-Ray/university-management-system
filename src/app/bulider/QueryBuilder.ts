
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Method to apply search term
  search(searchableFields: string[]): this {
    const searchTerm = this.query.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // Method to apply filters
  filter(): this {
    const queryObject = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObject[el]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }

  // Method to apply sorting
  sort(): this {
    const sort = (this.query.sort as string) || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // Method to apply pagination
  applyPagination(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Method to select fields
  applyFieldSelection(defaultFields: string = '-__v'): this {
    let fields = this.query.fields as string || defaultFields;
    fields = fields.split(',').join(' ');
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // Method to execute the query
  
}
export default QueryBuilder;
