import {InvalidUuidError, Uuid} from "../uuid.vo";
import {validate as uuidValidate} from "uuid";
describe('Uuid Unit Test', () => {

    const validateSpy = jest.spyOn(Uuid.prototype as any,"validate");

    test("should throw error if invalid uuid", () => {
        expect(()=> {
            new Uuid("invalid-uuid")
        }).toThrowError(new InvalidUuidError())
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test("should create a valid uuid", () => {
        const uuid = new Uuid()
        expect(uuid).toBeDefined()
        expect(uuidValidate(uuid.id)).toBe(true)
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test("should accept a valid uuid", () => {
        const validUuid = "9d066111-df30-4c90-b724-c2be3d8f9cbe"
        const uuid = new Uuid(validUuid)
        expect(uuid.id).toBe(validUuid)
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })
});