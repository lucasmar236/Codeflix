import {Category} from "./category.entity";

export interface CategoryRepository {
    insert(entity: Category)
    find():  Category[]
}
