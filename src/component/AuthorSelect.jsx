import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

function AuthorSelect({ authors, selectedAuthor, onAuthorChange }) {
  const { t } = useTranslation();
  const message = `${t('Choose')} ${t('Author')}`
  const options = authors.map(a => ({
    value: a.id,
    label: a.name,
  }));

  const maxWidth = authors.reduce((max, a) => {
    const textLenght = a.name.length;
    return textLenght > max ? textLenght : max
  }, 0)

  const customStyles = {
    control: (base) => ({
      ...base,
      width: `${maxWidth}rem`,
    }),
    menu: (base) => ({
      ...base,
      width: `${maxWidth}rem`,
    }),
  };


  return (
    <Select
      options={options}
      value={selectedAuthor}
      onChange={onAuthorChange}
      placeholder={message}
      styles={customStyles}
    />
  );
}

export default AuthorSelect;
