import fs from 'fs';

export const readJsonFile = <T>(filePath: string): T[] => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};
