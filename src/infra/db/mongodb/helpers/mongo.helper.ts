import { Document, FlattenMaps, Require_id, Types, connect } from 'mongoose';

type MongooseEntity<T> =
  | (Document<unknown, object, T> & T & { _id: Types.ObjectId })
  | null;

export const MongoHelper = {
  client: null as unknown as typeof import('mongoose'),
  uri: null as unknown as string,

  async connect(uri: string) {
    this.uri = uri;
    this.client = await connect(this.uri);
  },

  async disconnect() {
    await this.client.connection.close();
    this.client = null;
  },

  map<T>(
    entity: MongooseEntity<T>,
  ): (Omit<FlattenMaps<Require_id<T>>, '_id'> & { id: string }) | null {
    if (!entity) return null;
    const data = entity.toJSON();
    const { _id, ...restData } = data;

    return Object.assign({}, restData, { id: String(_id) });
  },
};
