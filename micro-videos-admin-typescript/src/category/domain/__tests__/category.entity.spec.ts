import {Category} from "../category.entity";
import {Uuid} from "../../../shared/domain/value-objects/uuid.vo";
import {EntityValidationError} from "../../../shared/domain/validators/validation.error";

describe('Category Unit Test', () => {
    let validateSpy: any;
    beforeEach(() => {
        validateSpy = jest.spyOn(Category,"validate");
    })
    describe('constructor', () => {
        test('should create a category with default values', () => {
            const category = new Category({
                name: "Movie"
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        }
        )
        test('should not create a category with all values', () => {
            const createdAt = new Date();
            const category = new Category({
                name: "Movie",
                description: "Movie description",
                is_active: false,
                created_at: createdAt,
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
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

            expect(category.category_id).toBeInstanceOf(Uuid);
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
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy()
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })

        test ('should create a category with description', () => {
            const category = Category.create({
                name: "Movie",
                description: "Movie description"
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie");
            expect(category.description).toBe("Movie description");
            expect(category.is_active).toBeTruthy()
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })

        test ('should create a category with active', () => {
            const category = Category.create({
                name: "Movie",
                is_active: false
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBeFalsy()
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })
    })

    describe('Category ID', () => {
        const arrange = [
            {id : null},{id: undefined},{id: new Uuid() },
        ]
        test.each(arrange)('id = %j', ({category_id}) => {
            const category = new Category({
                name: "Movie",
                category_id: category_id as any
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
            if (category_id instanceof  Uuid) {
                expect(category.category_id).
                toBe(category_id)
            }
        })
    })

    describe('update command', () => {
        test('should change name', () => {
            const category = Category.create({
                name: "Movie"
            })
            category.changeName("Movie 1");
            expect(category.name).toBe("Movie 1");
            expect(validateSpy).toHaveBeenCalledTimes(2);
        })

        test ('should change description', () => {
            const category = Category.create({
                name: "Movie"
            })
            category.changeDescription("Movie description")
            expect(category.description).toBe("Movie description")
            expect(validateSpy).toHaveBeenCalledTimes(2);
        })

        test ('should active a category', () => {
            const category = Category.create({
                name:"Movie",
                is_active: false
            })
            category.activate()
            expect(category.is_active).toBeTruthy()
        })

        test ('should not active a category', () => {
            const category = Category.create({
                name: "Movie"
            })
            category.deactivate()
            expect(category.is_active).toBeFalsy()
        })
    })


})

describe('Category Validator', () => {
    describe('create command', () => {
        test('should an invalid category with name property', () => {
            expect(() =>
                Category.create({
                    name: null
                })).containsErrorMessages(
               {
                    name: ["name should not be empty",
                        "name must be a string",
                        "name must be shorter than or equal to 255 characters"]
                }
            )
            expect(() =>
                Category.create({
                    name: ""
                })).containsErrorMessages(
                {
                    name: ["name should not be empty"]
                }
            )
            expect(() =>
                Category.create({
                    name: 5 as any
                })).containsErrorMessages(
                {"name":["name must be a string","name must be shorter than or equal to 255 characters"]}
            )
            expect(() =>
                Category.create({
                    name: "t".repeat(256)
                })).containsErrorMessages(
                {
                    name: ["name must be shorter than or equal to 255 characters"]
                }
            )
            expect(() =>
                Category.create({
                    description : 5
                } as any)).containsErrorMessages(
                {"name":["name should not be empty","name must be a string",
                        "name must be shorter than or equal to 255 characters"],
                    "description":["description must be a string"]}
            )

            expect(() =>
                Category.create({ is_active : 5 } as any)).containsErrorMessages(
                {"name":["name should not be empty","name must be a string",
                        "name must be shorter than or equal to 255 characters"],
                    "is_active":["is_active must be a boolean value"]}
            )
        })
    })
    describe("changeName method", () => {
        it("should a invalid category using name property", () => {
            const category = Category.create({ name: "Movie" });
            expect(() => category.changeName(null)).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.changeName("")).containsErrorMessages({
                name: ["name should not be empty"],
            });

            expect(() => category.changeName(5 as any)).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.changeName("t".repeat(256))).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            });
        });
    });

    describe("changeDescription method", () => {
        it("should a invalid category using description property", () => {
            const category = Category.create({ name: "Movie" });
            expect(() => category.changeDescription(5 as any)).containsErrorMessages({
                description: ["description must be a string"],
            });
        });
    });
})