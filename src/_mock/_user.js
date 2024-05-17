import { _mock } from './_mock';

// ----------------------------------------------------------------------
export const _userPayment = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['mastercard', 'visa', 'visa'][index],
  primary: index === 1,
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: "John Smith",
  phoneNumber: "789461320",
  fullAddress: "Temp Address",
  addressType: (index === 0 && 'Home') || 'Office',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-199${index}`,
  price: 10,
}));

export const _users = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  user_name: `Joyce W. Findlay`,
  primary_email: 'john.doe@gmail.com',
  primary_contact_number: '+61-455-513-290',
  price: 250,
  sd: 'sds'
}));

export const _userPlans = [
  {
    subscription: 'basic',
    price: 0,
    primary: false,
  },
  {
    subscription: 'starter',
    price: 4.99,
    primary: true,
  },
  {
    subscription: 'premium',
    price: 9.99,
    primary: false,
  },
];
