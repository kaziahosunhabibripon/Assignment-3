import { FilterQuery, Query } from "mongoose";

export type TSlotsQuery = {
  date?: string;
  serviceId?: string;
  searchTerm?: string;
  sort?: string;
  limit?: number;
  page?: number;
  fields?: string;
};

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: TSlotsQuery;

  constructor(modelQuery: Query<T[], T>, query: TSlotsQuery) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj: { [key: string]: unknown } = { ...this.query };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    const findQuery: { date?: Date; serviceId?: string } = {};
    if (this.query.date) {
      findQuery.date = new Date(this.query.date);
    }
    if (this.query.serviceId) {
      findQuery.serviceId = this.query.serviceId;
    }

    this.modelQuery = this.modelQuery.find({
      ...queryObj,
      ...findQuery,
    } as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort = this?.query?.sort?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 5;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = this?.query?.fields?.split(",")?.join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
