import { generateUniqueID } from 'src/shared/helpers/helpers';
import { CompaniesResponse, Path } from '../model/types';

export function modifyCountry(fetchedCountry: { [key: string]: string }) {
  return Object.keys(fetchedCountry).map((key: string) => {
    return {
      id: generateUniqueID(),
      title: `${fetchedCountry[key]} (${key})`,
      value: key === 'us' ? 'usa' : key,
    };
  });
}

export function modifyCompany(fetchedCompany: CompaniesResponse): Path[] {
  const modifiedData = [];
  for (const [company, paths] of Object.entries(fetchedCompany)) {
    const pathsArr: Path[] = paths as unknown as Path[];

    pathsArr.forEach((path: Path) => {
      path.id = generateUniqueID();
      path.company = company;
    });

    modifiedData.push(...pathsArr);
  }
  return modifiedData;
}
