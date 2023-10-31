import type { Character, RawParagraph } from "./types";

export const title = "サンプルのニュース";

const paragraphs = [
  "２０２２年９月１６日　１６時４５分",
  "政<せい>府<ふ>は今<こん>月<げつ>七<なの>日<か>から、一<いち>日<にち>に国<くに>に入<はい>ることができる人<ひと>を五<ご>万<まん>人<にん>まで増<ふ>やしています。",
  "政<せい>府<ふ>は、新<しん>型<がた>コロナウイルスがうつる人<ひと>が少<すく>なくなってきたことや円<えん>が安<やす>くなっていることで、旅<りょ>行<こう>に来<く>る人<ひと>が増<ふ>えると考<かんが>えています。そして経<けい>済<ざい>がもっとよくなるために、十<じゅう>月<がつ>よりあとに国<くに>に入<はい>るルールを変<か>えることを考<かんが>えています。",
  "新<あたら>しいルールでは、一<いち>日<にち>に何<なん>人<にん>でも日<に>本<ほん>に入<はい>ることができるようにします。ツアーではない個<こ>人<じん>の旅<りょ>行<こう>もできるようにします。",
  "七<なな>十<じゅう>ぐらいの国<くに>や地<ち>域<いき>から来<く>る人<ひと>は、ビザがなくても日<に>本<ほん>に九<きゅう>十<じゅう>日<にち>までいることができるようにして、外<がい>国<こく>人<じん>がもっと簡<かん>単<たん>に日<に>本<ほん>に入<はい>ることができるようにしたいと考<かんが>えています。",
  "政<せい>府<ふ>は、いつから行<おこな>うか考<かんが>えています。",
  "（ＮＨＫ　Ｎｅｗｓ　Ｅａｓｙ）",
];

const FURIGANA_START = "<";
const FURIGANA_END = ">";

let count = 0;
export const rawParagraphs = paragraphs.map(p => {
  const characters: RawParagraph = [];
  for (let i = 0; i < p.length; i++) {
    const cur: Character = { char: p[i], furigana: null, count };
    if (i < p.length - 1 && p[i + 1] === FURIGANA_START) {
      const end = p.indexOf(FURIGANA_END, i + 2);
      cur.furigana = p.substring(i + 2, end);
      i = end;
    }
    characters.push(cur);
    count++;
  }
  return characters;
});

/* Example: this is paragraphs[4]
[
  { char: 'あ', furigana: null },
  { char: 'あ', furigana: null },
  { char: '、', furigana: null },
  { char: '妹', furigana: 'いもうと' },
  { char: 'と', furigana: null },
  { char: '会', furigana: 'あ' },
  { char: 'い', furigana: null },
  { char: 'た', furigana: null },
  { char: 'い', furigana: null },
  { char: 'ん', furigana: null },
  { char: 'で', furigana: null },
  { char: 'す', furigana: null },
  { char: '！', furigana: null }
]
*/

export const srParagraphs = paragraphs.map(p => {
  let characters = "";
  for (let i = 0; i < p.length; i++) {
    characters += p[i];
    if (i < p.length - 1 && p[i + 1] === FURIGANA_START) i = p.indexOf(FURIGANA_END, i + 2);
  }
  return characters;
});
