import fs from 'fs';
import csvParse from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parsedFile = csvParse(); // por padrão, as chunks são definidas pela vírgula? ou por linha?

      stream.pipe(parsedFile);

      parsedFile.on('data', async line => {
      // ["name", "description"]
        const [ name, description ] = line;
        
        categories.push({
          name,
          description
        });
        
      })
      .on('end', () => {
        fs.promises.unlink(file.path); // para remover os arquivos do upload depois do carregamento na aplicação
        resolve(categories);
      })
      .on('error', (err) => {
        reject(err);
      });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    
    categories.map(async (category) => {
      const { name, description } = category;

      const categoryExists = this.categoriesRepository.findByName(name);

      if (!categoryExists){
        this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }
}

// eslint-disable-next-line import/prefer-default-export
export { ImportCategoryUseCase };
