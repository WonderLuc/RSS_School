import { IDataState } from './redux-types';

const data: IDataState = {
  loading: false,
  categories: [
    {
      name: 'action-1',
      words: [
        {
          word: 'cry',
          translation: 'плакать',
          image: 'img/cry.jpg',
          audioSrc: 'audio/cry.mp3',
        },
        {
          word: 'dance',
          translation: 'танцевать',
          image: 'img/dance.jpg',
          audioSrc: 'audio/dance.mp3',
        },
        {
          word: 'dive',
          translation: 'нырять',
          image: 'img/dive.jpg',
          audioSrc: 'audio/dive.mp3',
        },
        {
          word: 'draw',
          translation: 'рисовать',
          image: 'img/draw.jpg',
          audioSrc: 'audio/draw.mp3',
        },
        {
          word: 'fish',
          translation: 'ловить рыбу',
          image: 'img/fish.jpg',
          audioSrc: 'audio/fish.mp3',
        },
        {
          word: 'fly',
          translation: 'летать',
          image: 'img/fly.jpg',
          audioSrc: 'audio/fly.mp3',
        },
        {
          word: 'hug',
          translation: 'обнимать',
          image: 'img/hug.jpg',
          audioSrc: 'audio/hug.mp3',
        },
        {
          word: 'jump',
          translation: 'прыгать',
          image: 'img/jump.jpg',
          audioSrc: 'audio/jump.mp3',
        },
      ],
    },
    {
      name: 'action-2',
      words: [
        {
          word: 'open',
          translation: 'открывать',
          image: 'img/open.jpg',
          audioSrc: 'audio/open.mp3',
        },
        {
          word: 'play',
          translation: 'играть',
          image: 'img/play.jpg',
          audioSrc: 'audio/play.mp3',
        },
        {
          word: 'point',
          translation: 'указывать',
          image: 'img/point.jpg',
          audioSrc: 'audio/point.mp3',
        },
        {
          word: 'ride',
          translation: 'ездить',
          image: 'img/ride.jpg',
          audioSrc: 'audio/ride.mp3',
        },
        {
          word: 'run',
          translation: 'бегать',
          image: 'img/run.jpg',
          audioSrc: 'audio/run.mp3',
        },
        {
          word: 'sing',
          translation: 'петь',
          image: 'img/sing.jpg',
          audioSrc: 'audio/sing.mp3',
        },
        {
          word: 'skip',
          translation: 'пропускать, прыгать',
          image: 'img/skip.jpg',
          audioSrc: 'audio/skip.mp3',
        },
        {
          word: 'swim',
          translation: 'плавать',
          image: 'img/swim.jpg',
          audioSrc: 'audio/swim.mp3',
        },
      ],
    },
    {
      name: 'animals-1',
      words: [
        {
          word: 'cat',
          translation: 'кот',
          image: 'img/cat.jpg',
          audioSrc: 'audio/cat.mp3',
        },
        {
          word: 'chick',
          translation: 'цыплёнок',
          image: 'img/chick.jpg',
          audioSrc: 'audio/chick.mp3',
        },
        {
          word: 'chicken',
          translation: 'курица',
          image: 'img/chicken.jpg',
          audioSrc: 'audio/chicken.mp3',
        },
        {
          word: 'dog',
          translation: 'собака',
          image: 'img/dog.jpg',
          audioSrc: 'audio/dog.mp3',
        },
        {
          word: 'horse',
          translation: 'лошадь',
          image: 'img/horse.jpg',
          audioSrc: 'audio/horse.mp3',
        },
        {
          word: 'pig',
          translation: 'свинья',
          image: 'img/pig.jpg',
          audioSrc: 'audio/pig.mp3',
        },
        {
          word: 'rabbit',
          translation: 'кролик',
          image: 'img/rabbit.jpg',
          audioSrc: 'audio/rabbit.mp3',
        },
        {
          word: 'sheep',
          translation: 'овца',
          image: 'img/sheep.jpg',
          audioSrc: 'audio/sheep.mp3',
        },
      ],
    },
    {
      name: 'animals-2',
      words: [
        {
          word: 'bird',
          translation: 'птица',
          image: 'img/bird.jpg',
          audioSrc: 'audio/bird.mp3',
        },
        {
          word: 'fish',
          translation: 'рыба',
          image: 'img/fish1.jpg',
          audioSrc: 'audio/fish.mp3',
        },
        {
          word: 'frog',
          translation: 'жаба',
          image: 'img/frog.jpg',
          audioSrc: 'audio/frog.mp3',
        },
        {
          word: 'giraffe',
          translation: 'жирафа',
          image: 'img/giraffe.jpg',
          audioSrc: 'audio/giraffe.mp3',
        },
        {
          word: 'lion',
          translation: 'лев',
          image: 'img/lion.jpg',
          audioSrc: 'audio/lion.mp3',
        },
        {
          word: 'mouse',
          translation: 'мышь',
          image: 'img/mouse.jpg',
          audioSrc: 'audio/mouse.mp3',
        },
        {
          word: 'turtle',
          translation: 'черепаха',
          image: 'img/turtle.jpg',
          audioSrc: 'audio/turtle.mp3',
        },
        {
          word: 'dolphin',
          translation: 'дельфин',
          image: 'img/dolphin.jpg',
          audioSrc: 'audio/dolphin.mp3',
        },
      ],
    },
    {
      name: 'clothes',
      words: [
        {
          word: 'skirt',
          translation: 'юбка',
          image: 'img/skirt.jpg',
          audioSrc: 'audio/skirt.mp3',
        },
        {
          word: 'pants',
          translation: 'брюки',
          image: 'img/pants.jpg',
          audioSrc: 'audio/pants.mp3',
        },
        {
          word: 'blouse',
          translation: 'блузка',
          image: 'img/blouse.jpg',
          audioSrc: 'audio/blouse.mp3',
        },
        {
          word: 'dress',
          translation: 'платье',
          image: 'img/dress.jpg',
          audioSrc: 'audio/dress.mp3',
        },
        {
          word: 'boot',
          translation: 'ботинок',
          image: 'img/boot.jpg',
          audioSrc: 'audio/boot.mp3',
        },
        {
          word: 'shirt',
          translation: 'рубашка',
          image: 'img/shirt.jpg',
          audioSrc: 'audio/shirt.mp3',
        },
        {
          word: 'coat',
          translation: 'пальто',
          image: 'img/coat.jpg',
          audioSrc: 'audio/coat.mp3',
        },
        {
          word: 'shoe',
          translation: 'туфли',
          image: 'img/shoe.jpg',
          audioSrc: 'audio/shoe.mp3',
        },
      ],
    },
    {
      name: 'emotions',
      words: [{
        word: 'sad',
        translation: 'грустный',
        image: 'img/sad.jpg',
        audioSrc: 'audio/sad.mp3',
      },
      {
        word: 'angry',
        translation: 'сердитый',
        image: 'img/angry.jpg',
        audioSrc: 'audio/angry.mp3',
      },
      {
        word: 'happy',
        translation: 'счастливый',
        image: 'img/happy.jpg',
        audioSrc: 'audio/happy.mp3',
      },
      {
        word: 'tired',
        translation: 'уставший',
        image: 'img/tired.jpg',
        audioSrc: 'audio/tired.mp3',
      },
      {
        word: 'surprised',
        translation: 'удивлённый',
        image: 'img/surprised.jpg',
        audioSrc: 'audio/surprised.mp3',
      },
      {
        word: 'scared',
        translation: 'испуганный',
        image: 'img/scared.jpg',
        audioSrc: 'audio/scared.mp3',
      },
      {
        word: 'smile',
        translation: 'улыбка',
        image: 'img/smile.jpg',
        audioSrc: 'audio/smile.mp3',
      },
      {
        word: 'laugh',
        translation: 'смех',
        image: 'img/laugh.jpg',
        audioSrc: 'audio/laugh.mp3',
      }],
    },
    {
      name: 'fables',
      words: [
        {
          word: 'King',
          translation: 'Король',
          image: 'img/king.jpg',
          audioSrc: 'audio/king-us.mp3',
        },
        {
          word: 'Knight',
          translation: 'Рыцарь',
          image: '/img/knight.jpg',
          audioSrc: '/audio/knight-us.mp3',
        },
        {
          word: 'Elf',
          translation: 'Эльф',
          image: '/img/elf.jpg',
          audioSrc: '/audio/elf-us.mp3',
        },
        {
          word: 'Raven',
          translation: 'Ворон',
          image: '/img/raven.jpg',
          audioSrc: '/audio/raven-us.mp3',
        },
        {
          word: 'Dragon',
          translation: 'Дракон',
          image: '/img/dragon.jpg',
          audioSrc: '/audio/dragon-us.mp3',
        },
        {
          word: 'Sword',
          translation: 'Меч',
          image: '/img/sword.jpg',
          audioSrc: '/audio/sword-us.mp3',
        },
        {
          word: 'Ogre',
          translation: 'Людоед',
          image: '/img/Ogre.jpg',
          audioSrc: '/audio/ogre-us.mp3',
        },
        {
          word: 'Castel',
          translation: 'Замок',
          image: '/img/castel.jpg',
          audioSrc: '/audio/castle-us.mp3',
        },
      ],
    },
    {
      name: 'food',
      words: [
        {
          word: 'Pie',
          translation: 'Пирог',
          image: '/img/pie.jpg',
          audioSrc: '/audio/pie.mp3',
        },
        {
          word: 'Fries',
          translation: 'Картошка фри',
          image: '/img/fries.jpeg',
          audioSrc: '/audio/fries.mp3',
        },
        {
          word: 'Egg',
          translation: 'Яйцо',
          image: '/img/egg.jpg',
          audioSrc: '/audio/egg.mp3',
        },
        {
          word: 'Cookie',
          translation: 'Печенье',
          image: '/img/cookie.jpg',
          audioSrc: '/audio/cookie.mp3',
        },
        {
          word: 'Meat',
          translation: 'Мясо',
          image: '/img/meat.jpg',
          audioSrc: '/audio/meat.mp3',
        },
        {
          word: 'Juice',
          translation: 'Сок',
          image: '/img/juice.jpeg',
          audioSrc: '/audio/juice.mp3',
        },
        {
          word: 'Apple',
          translation: 'Яблоко',
          image: '/img/apple.jpg',
          audioSrc: '/audio/apple.mp3',
        },
        {
          word: 'Flour',
          translation: 'Мука',
          image: '/img/flour.jpg',
          audioSrc: '/audio/flour.mp3',
        },
      ],
    },
  ],
};

export default data;
