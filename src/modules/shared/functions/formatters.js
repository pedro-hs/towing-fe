export const formatCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
};

export const formatContact = (contact) => {
  contact = contact.replace(/\D/g, '');
  contact = contact.replace(/^(\d{2})(\d)/g, '($1)$2');
  contact = contact.replace(/(\d)(\d{4})$/, '$1-$2');
  return contact;
};

export const normalizeCPF = (cpf) => {
  return cpf.replace(/\./g, '').replace('-', '');
};

export const normalizeContact = (contact) => {
  return contact.replace('(', '').replace(')', '').replace('-', '');
};
