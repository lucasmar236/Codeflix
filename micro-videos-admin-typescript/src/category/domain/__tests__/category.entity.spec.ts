import {Category} from "../category.entity";

describe('Category Unit Test', () => {
    describe('constructor', () => {
        test('should create a category with default values', () => {
            const category = new Category({
                name: "Movie"
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
        })
        test('should not create a category with all values', () => {
            const createdAt = new Date();
            const category = new Category({
                name: "Movie",
                description: "Movie description",
                is_active: false,
                created_at: createdAt,
            })
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe("Movie");
            expect(category.description).toBe("Movie description");
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(createdAt);

        })
        test('should create a category with name and description values', () => {
            const category = new Category({
                name: 'Movie',
                description: 'Movie description'
            })

            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe("Movie");
            expect(category.description).toBe('Movie description')
            expect(category.is_active).toBeTruthy()
            expect(category.created_at).toBeInstanceOf(Date);
        })
    })

    describe('create command', () => {
        test ('should create a category', () => {
            const category = Category.create({
                name: "Movie"
            })
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy()
            expect(category.created_at).toBeInstanceOf(Date);
        })

        test ('should create a category with description', () => {
            const category = Category.create({
                name: "Movie",
                description: "Movie description"
            })
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe("Movie");
            expect(category.description).toBe("Movie description");
            expect(category.is_active).toBeTruthy()
            expect(category.created_at).toBeInstanceOf(Date);
        })

        test ('should create a category with active', () => {
            const category = Category.create({
                name: "Movie",
                is_active: false
            })
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBeFalsy()
            expect(category.created_at).toBeInstanceOf(Date);
        })
    })

    describe('update command', () => {
        test('should change name', () => {
            const category = new Category({
                name: "Movie"
            })
            category.changeName("Movie 1");
            expect(category.name).toBe("Movie 1");
        })

        test ('should change description', () => {
            const category = new Category({
                name: "Movie"
            })
            category.changeDescription("Movie description")
            expect(category.description).toBe("Movie description")
        })

        test ('should active a category', () => {
            const category = new Category({
                name:"Movie",
                is_active: false
            })
            category.activate()
            expect(category.is_active).toBeTruthy()
        })

        test ('should not active a category', () => {
            const category = new Category({
                name: "Movie"
            })
            category.deactivate()
            expect(category.is_active).toBeFalsy()
        })
    })
})