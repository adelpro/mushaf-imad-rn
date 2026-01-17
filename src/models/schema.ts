import Realm from 'realm';

export class VerseMarker extends Realm.Object<VerseMarker> {
  numberCodePoint!: string;
  line!: number;
  centerX!: number;
  centerY!: number;

  static schema: Realm.ObjectSchema = {
    name: 'VerseMarker',
    properties: {
      numberCodePoint: 'string',
      line: 'int',
      centerX: 'float',
      centerY: 'float',
    },
  };
}

export class VerseHighlight extends Realm.Object<VerseHighlight> {
  line!: number;
  left!: number;
  right!: number;

  static schema: Realm.ObjectSchema = {
    name: 'VerseHighlight',
    properties: {
      line: 'int',
      left: 'float',
      right: 'float',
    },
  };
}

export class PageHeader extends Realm.Object<PageHeader> {
  part?: Part;
  quarter?: Quarter;
  chapters!: Realm.List<Chapter>;

  static schema: Realm.ObjectSchema = {
    name: 'PageHeader',
    properties: {
      part: 'Part?',
      quarter: 'Quarter?',
      chapters: 'Chapter[]',
    },
  };
}

export class ChapterHeader extends Realm.Object<ChapterHeader> {
  chapter?: Chapter;
  page?: Page;
  line!: number;
  centerX!: number;
  centerY!: number;

  static schema: Realm.ObjectSchema = {
    name: 'ChapterHeader',
    properties: {
      chapter: 'Chapter?',
      page: 'Page?',
      line: 'int',
      centerX: 'float',
      centerY: 'float',
    },
  };
}

export class Verse extends Realm.Object<Verse> {
  verseID!: number;
  humanReadableID!: string;
  number!: number;
  text!: string;
  textWithoutTashkil!: string;
  uthmanicHafsText!: string;
  hafsSmartText!: string;
  searchableText!: string;
  chapter?: Chapter;
  part?: Part;
  quarter?: Quarter;
  section?: QuranSection;
  page1441?: Page;
  page1405?: Page;
  marker1441?: VerseMarker;
  marker1405?: VerseMarker;
  highlights1441!: Realm.List<VerseHighlight>;
  highlights1405!: Realm.List<VerseHighlight>;

  static schema: Realm.ObjectSchema = {
    name: 'Verse',
    primaryKey: 'verseID',
    properties: {
      verseID: 'int',
      humanReadableID: { type: 'string', indexed: true },
      number: { type: 'int', indexed: true },
      text: 'string',
      textWithoutTashkil: 'string',
      uthmanicHafsText: 'string',
      hafsSmartText: 'string',
      searchableText: { type: 'string', indexed: true },
      chapter: 'Chapter?',
      part: 'Part?',
      quarter: 'Quarter?',
      section: 'QuranSection?',
      page1441: 'Page?',
      page1405: 'Page?',
      marker1441: 'VerseMarker?',
      marker1405: 'VerseMarker?',
      highlights1441: 'VerseHighlight[]',
      highlights1405: 'VerseHighlight[]',
    },
  };
}

export class Chapter extends Realm.Object<Chapter> {
  identifier!: number;
  number!: number;
  isMeccan!: boolean;
  title!: string;
  arabicTitle!: string;
  englishTitle!: string;
  titleCodePoint!: string;
  searchableText!: string;
  searchableKeywords!: string;
  verses!: Realm.List<Verse>;
  header1441?: ChapterHeader;
  header1405?: ChapterHeader;

  static schema: Realm.ObjectSchema = {
    name: 'Chapter',
    primaryKey: 'identifier',
    properties: {
      identifier: 'int',
      number: { type: 'int', indexed: true },
      isMeccan: 'bool',
      title: 'string',
      arabicTitle: 'string',
      englishTitle: 'string',
      titleCodePoint: 'string',
      searchableText: { type: 'string', indexed: true },
      searchableKeywords: 'string',
      verses: 'Verse[]',
      header1441: 'ChapterHeader?',
      header1405: 'ChapterHeader?',
    },
  };
}

export class Page extends Realm.Object<Page> {
  identifier!: number;
  number!: number;
  isRight!: boolean;
  header1441?: PageHeader;
  header1405?: PageHeader;
  chapterHeaders1441!: Realm.List<ChapterHeader>;
  chapterHeaders1405!: Realm.List<ChapterHeader>;
  verses1441!: Realm.List<Verse>;
  verses1405!: Realm.List<Verse>;

  static schema: Realm.ObjectSchema = {
    name: 'Page',
    primaryKey: 'identifier',
    properties: {
      identifier: 'int',
      number: { type: 'int', indexed: true },
      isRight: 'bool',
      header1441: 'PageHeader?',
      header1405: 'PageHeader?',
      chapterHeaders1441: 'ChapterHeader[]',
      chapterHeaders1405: 'ChapterHeader[]',
      verses1441: 'Verse[]',
      verses1405: 'Verse[]',
    },
  };
}

export class Part extends Realm.Object<Part> {
  identifier!: number;
  number!: number;
  arabicTitle!: string;
  englishTitle!: string;
  chapters!: Realm.List<Chapter>;
  quarters!: Realm.List<Quarter>;
  verses!: Realm.List<Verse>;

  static schema: Realm.ObjectSchema = {
    name: 'Part',
    primaryKey: 'identifier',
    properties: {
      identifier: 'int',
      number: { type: 'int', indexed: true },
      arabicTitle: 'string',
      englishTitle: 'string',
      chapters: 'Chapter[]',
      quarters: 'Quarter[]',
      verses: 'Verse[]',
    },
  };
}

export class Quarter extends Realm.Object<Quarter> {
  identifier!: number;
  hizbNumber!: number;
  hizbFraction!: number;
  arabicTitle!: string;
  englishTitle!: string;
  part?: Part;
  verses!: Realm.List<Verse>;

  static schema: Realm.ObjectSchema = {
    name: 'Quarter',
    primaryKey: 'identifier',
    properties: {
      identifier: 'int',
      hizbNumber: { type: 'int', indexed: true },
      hizbFraction: 'int',
      arabicTitle: 'string',
      englishTitle: 'string',
      part: 'Part?',
      verses: 'Verse[]',
    },
  };
}

export class QuranSection extends Realm.Object<QuranSection> {
  identifier!: number;
  verses!: Realm.List<Verse>;

  static schema: Realm.ObjectSchema = {
    name: 'QuranSection',
    primaryKey: 'identifier',
    properties: {
      identifier: 'int',
      verses: 'Verse[]',
    },
  };
}

export const realmSchema = [
  VerseMarker,
  VerseHighlight,
  PageHeader,
  ChapterHeader,
  Verse,
  Chapter,
  Page,
  Part,
  Quarter,
  QuranSection,
];
