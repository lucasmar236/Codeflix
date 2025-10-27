import {ValueObject} from "../value-object";
import {Entity} from "../entity";
import {SearchParams} from "./search-params";
import {SearchResult} from "./search-result";

export interface IRepository<E extends Entity,EntityId extends ValueObject> {
    insert(entity: E): Promise<void>;
    bulkInsert(entities: E[]): Promise<void>;
    update(entity: E): Promise<void>;
    delete(entity_id: EntityId): Promise<void>;

    findById(entity_id: EntityId): Promise<null | E>;
    findAll(): Promise<E[]>;

    getEntity(): new (...args: any[]) => E;
}

export interface  ISearchableRepository<E extends Entity,
    EntityId extends ValueObject,
    Filter = string,
    SearchInput = SearchParams,SearchOutput = SearchResult>
    extends IRepository<Entity,ValueObject>{
    search(props:SearchInput): Promise<SearchOutput>;
    sortableFields: string[];
}