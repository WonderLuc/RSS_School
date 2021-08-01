export interface IBook{
  name: string;
  author: string;
  img: string;
  likes: number;
  comments: number;
  price: number;
}

export const data: IBook[] = [
  {
    name: 'The Maidens',
    author: 'Alex Michaelides',
    img: 'maidens.jpg',
    likes: 3000,
    comments: 450,
    price: 100,
  },
  {
    name: 'The Secret-Keeper of Jaipur',
    author: 'Alka Joshi',
    img: 'secret_keeper.jpg',
    likes: 100,
    comments: 30,
    price: 25,
  },
  {
    name: 'The Startup Wife',
    author: 'Tahmima Anam',
    img: 'startUpWife.jpg',
    likes: 200,
    comments: 14,
    price: 30,
  },
  {
    name: 'The Art of Impossible : A Peak Performance Primer',
    author: 'Steven Kotler',
    img: 'artOfImpossible.jpg',
    likes: 1020,
    comments: 350,
    price: 70,
  },
  {
    name: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    img: 'js.jpg',
    likes: 9999,
    comments: 1500,
    price: 1800,
  },
];
