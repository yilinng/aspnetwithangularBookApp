import { NewBookEntry } from '../types/types';

export class Book implements NewBookEntry {
  constructor(
    public title: string,
    public author: string,
    public price: number
  ) {}
}
