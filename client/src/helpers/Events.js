export const eventTypes = {
  1: 'Poszukiwanie',
  2: 'Znalezienie',
  3: 'Inne',
};

export const getDisplayName = ({ username, firstName, secondName }) => {
  let displayName = `${firstName || ''} ${secondName || ''}`.trim();
  return displayName.length > 0 ? displayName : username;
}

export const formatNumber = ({ number }) => number > 99 ? '99+' : `${number}`;