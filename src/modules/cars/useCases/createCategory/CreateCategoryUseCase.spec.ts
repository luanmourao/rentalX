import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category description test"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);

    expect(createdCategory).toHaveProperty("id");
  });

  it("Should not be able to create a new category with the same name", async () => {
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Category description test"
      };
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
  
      // funciona mesmo comentando essa segunda chamada ao execute. Por que?
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(AppError);
    
  });  
});