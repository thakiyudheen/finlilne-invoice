import React from 'react';
import * as Yup from 'yup';


export const validationSchema = Yup.object().shape({
  discount: Yup.number()
    .min(0, 'Discount cannot be negative')
    .required('Discount is required'),
  tax: Yup.number()
    .min(0, 'Tax cannot be negative')
    .required('Tax is required'),
  shipping: Yup.number()
    .min(0, 'Shipping cannot be negative')
    .required('Shipping is required'),
  items: Yup.array().of(
    Yup.object().shape({
      quantity: Yup.number()
        .min(1, 'Quantity must be at least 1')
        .required('Quantity is required'),
      rate: Yup.number()
        .min(0, 'Rate cannot be negative')
        .required('Rate is required'),
    })
  ),
});

