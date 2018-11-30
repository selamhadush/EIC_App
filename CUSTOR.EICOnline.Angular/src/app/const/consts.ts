export const MARITAL_STATUSES: any[] =
  [
    {'Id': '1', 'Description': 'ያላገባ', 'DescriptionEnglish': 'Single'},
    {'Id': '2', 'Description': 'ያገባ', 'DescriptionEnglish': 'Married'},
    {'Id': '3', 'Description': 'የፈታ', 'DescriptionEnglish': 'Divorced'}
  ];

export const GENDERS: any[] =
  [
    {'Id': '1', 'Description': 'ወንድ', 'DescriptionEnglish': 'Male'},
    {'Id': '2', 'Description': 'ሴት', 'DescriptionEnglish': 'Female'}

  ];
export const TITLES: any[] =
  [
    {'Id': '1', 'Description': 'አቶ', 'DescriptionEnglish': 'Mr'},
    {'Id': '2', 'Description': 'ወ/ሮ', 'DescriptionEnglish': 'Mrs'},
    {'Id': '3', 'Description': 'ወ/ሪት', 'DescriptionEnglish': 'Miss'},
    {'Id': '4', 'Description': 'ዶ/ር', 'DescriptionEnglish': 'Dr'}
  ];

export const LEGAL_STATUS: any[] =
  [
    {'Id': '1', 'Description': 'ግለሰብ', 'DescriptionEnglish': 'Sole Proprietorship'},
    {'Id': '2', 'Description': 'ኃላፊነቱ የተወሰነ የግል ኩባንያ', 'DescriptionEnglish': 'Private Limited Company'},
    {'Id': '3', 'Description': 'የአክስዮን ማህበር', 'DescriptionEnglish': 'Share Company'},
    {'Id': '4', 'Description': 'የመንግስት ተቋም', 'DescriptionEnglish': 'Public Enterprise'},
    {'Id': '5', 'Description': 'የስራ ማህበራት', 'DescriptionEnglish': 'Cooperative Society'}
  ];

export const SOLE_PROPRIETERSHIP_CODE = '1';
export const ETHIOPIA_CODE = 1;
const ALPHABET_WITHSPACE_REGEX = new RegExp(/^[a-zA-Z ]+$/);
const ALPHABET_REGEX = new RegExp(/^[a-zA-Z]+$/);
const NUMERIC_WITHPERIOD_REGEX = new RegExp(/^[0-9.]+$/);
const NUMERIC_REGEX = new RegExp(/^[0-9]+$/);
const ET_ALPHABET_WITHSPACE_REGEX = new RegExp(/^([ \u1200-\u137F])+$/);
const ET_ALPHABET_REGEX = new RegExp(/^([ \u1200-\u137F \u0008])+$/);
export {
  ALPHABET_WITHSPACE_REGEX, ALPHABET_REGEX, NUMERIC_WITHPERIOD_REGEX,
  NUMERIC_REGEX, ET_ALPHABET_WITHSPACE_REGEX, ET_ALPHABET_REGEX
};
