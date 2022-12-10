import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

let backButton;
let saveButton;
let saveAndNext;
let emailInput;
let passwordInput;
let firstName;
let lastName;
let address;
let countryCode;
let phoneNumber;
let acceptTermsAndConditions;
beforeEach(() => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );
  backButton = screen.getByRole('button', {
    name: 'Back',
  });

  saveButton = screen.getByRole('button', {
    name: 'Save',
  });

  saveAndNext = screen.getByRole('button', {
    name: 'Save and Next',
  });

  emailInput = screen.getByPlaceholderText(/Enter email/);
  passwordInput = screen.getByPlaceholderText(/Enter password/);
});

describe('When Home component render', () => {
  it('Email, password inputs are exist', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Back, Save, Save and Next buttons are exist and disabled', () => {
    expect(backButton).toBeInTheDocument();
    expect(backButton).toBeDisabled();
    expect(saveButton).toBeInTheDocument();
    expect(saveAndNext).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(saveAndNext).toBeInTheDocument();
  });
});

describe('When email and password are valid', () => {
  beforeEach(() => {
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'AAaa11@@' } });
  });

  it('Save and Save and Next buttons are enabled for 1st form', () => {
    expect(saveButton).toHaveProperty('disabled', false);
    expect(saveAndNext).toHaveProperty('disabled', false);
  });

  describe('When clicked on Save and Next button from 1st screen it redirects to second screen', () => {
    beforeEach(() => {
      fireEvent.click(saveAndNext);
      firstName = screen.getByPlaceholderText(/Enter first name/);
      lastName = screen.getByPlaceholderText(/Enter last name/);
      address = screen.getByPlaceholderText(/Enter address/);
    });
    it('Back button exists and enabled on 2nd screen', () => {
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveProperty('disabled', false);
    });

    it('Save, Save and Next buttons are exists but disabled on 2nd screen', () => {
      expect(saveButton).toBeInTheDocument();
      expect(saveAndNext).toBeInTheDocument();
      expect(saveButton).toHaveProperty('disabled', true);
      expect(saveAndNext).toHaveProperty('disabled', true);
    });

    it('First Name, Last Name and Address field are exists on second screen', () => {
      expect(firstName).toBeInTheDocument();
      expect(lastName).toBeInTheDocument();
      expect(address).toBeInTheDocument();
    });

    it('All fields on 2nd screens are valid then Save, Save and Next buttons are enabled', () => {
      fireEvent.change(firstName, { target: { value: 'aaa' } });
      fireEvent.change(lastName, { target: { value: 'aaa' } });
      fireEvent.change(address, { target: { value: 'aaaaaaaass' } });
      expect(saveButton).toHaveProperty('disabled', false);
      expect(saveAndNext).toHaveProperty('disabled', false);
    });

    it('Any fields on 2nd screens are not valid then Save, Save and Next buttons are disabled', () => {
      fireEvent.change(firstName, { target: { value: 'a' } });
      fireEvent.change(lastName, { target: { value: 'aaa111' } });
      fireEvent.change(address, { target: { value: 'aaaaaa' } });
      expect(saveButton).toHaveProperty('disabled', true);
      expect(saveAndNext).toHaveProperty('disabled', true);
    });

    describe('When clicked on Save and Next button from 2nd screen it will take us to 3rd screen', () => {
      beforeEach(() => {
        fireEvent.change(firstName, { target: { value: 'aaa' } });
        fireEvent.change(lastName, { target: { value: 'aaa' } });
        fireEvent.change(address, { target: { value: 'aaaaaaaass' } });
        fireEvent.click(saveAndNext);
        countryCode = screen.getByTestId('countryCodeSelection');
        phoneNumber = screen.getByPlaceholderText(/Enter phone number/);
        acceptTermsAndConditions = screen.getByRole('checkbox');
      });

      it('Save, Save and Next buttons are exist but disabled and Back button is also exist but in enabled state on 3rd screen', () => {
        expect(backButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(saveAndNext).toBeInTheDocument();
        expect(backButton).toHaveProperty('disabled', false);
        expect(saveButton).toHaveProperty('disabled', true);
        expect(saveAndNext).toHaveProperty('disabled', true);
      });

      it('Country code, Phone number and Accept terms and condition field are exists on 3rd screen', () => {
        expect(countryCode).toBeInTheDocument();
        expect(phoneNumber).toBeInTheDocument();
        expect(acceptTermsAndConditions).toBeInTheDocument();
      });

      it('All fields on 3rd screens are valid then Save button gets enabled but Save and Next button will be disabled for 3rd screen', () => {
        fireEvent.change(countryCode, { target: { value: '+91' } });
        fireEvent.change(phoneNumber, { target: { value: '1234567890' } });
        fireEvent.click(acceptTermsAndConditions);
        expect(saveButton).toHaveProperty('disabled', false);
        expect(saveAndNext).toHaveProperty('disabled', true);
      });
    });
  });
});
