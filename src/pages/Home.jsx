import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const onSubmit = () => navigate('/posts');
  const [currentForm, setCurrentForm] = useState(1);
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setaddress] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [acceptTermAndCondition, setAcceptTermAndCondition] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setpasswordError] = useState(true);
  const [firstNameError, setfirstNameError] = useState(true);
  const [lastNameError, setlastNameError] = useState(true);
  const [addressError, setAddressError] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(true);
  const [countryCodeError, setCountryCodeError] = useState(true);

  const [post, setPost] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
  });

  const setCurrentFromAction = action => {
    switch (action) {
      case 'back':
        setCurrentForm(currentForm - 1);
        break;

      case 'next':
        setCurrentForm(currentForm + 1);
        break;

      default:
        setCurrentForm(currentForm + 1);
        break;
    }
  };

  const saveFirstForm = () => {
    setPost(oldPost => ({
      ...oldPost,
      emailId,
      password,
    }));
  };

  const saveSecondForm = () => {
    setPost(oldPost => ({
      ...oldPost,
      firstName,
      lastName,
      address,
    }));
  };

  const saveThirdForm = () => {
    setPost(oldPost => ({
      ...oldPost,
      countryCode,
      phoneNumber,
    }));
    console.log(post);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        emailId,
        password,
        firstName,
        lastName,
        address,
        countryCode,
        phoneNumber,
      }),
    };
    fetch('https://codebuddy.review/submit', requestOptions)
      .then(response => response)
      .then(() => navigate('/posts'));
  };

  const saveForm = () => {
    switch (currentForm) {
      case 1:
        saveFirstForm();
        break;

      case 2:
        saveSecondForm();
        break;

      case 3:
        saveThirdForm();
        break;

      default:
        saveFirstForm();
        break;
    }
  };

  const validateEmail = email => {
    setEmailId(email);
    if (/\S+@\S+\.\S+/.test(email)) setEmailError(false);
    else setEmailError(true);
  };

  const validatePassword = passwordValue => {
    setPassword(passwordValue);
    if (
      /^(?=(?:\D*\d){2})(?=(?:[^a-z]*[a-z]){2})(?=(?:[^A-Z]*[A-Z]){2})(?=(?:\w*\W){2}).*$/.test(
        passwordValue,
      )
    )
      setpasswordError(false);
    else setpasswordError(true);
  };

  const validateFirstName = fname => {
    setFirstName(fname);
    if (/\b[A-Za-z]{2,50}\b$/.test(fname)) {
      setfirstNameError(false);
    } else {
      setfirstNameError(true);
    }
  };

  const validateLastName = lname => {
    setLastName(lname);
    if (/^[A-Za-z]+$/.test(lname) || lname === '') {
      setlastNameError(false);
    } else {
      setlastNameError(true);
    }
  };

  const validateAddress = addressText => {
    setaddress(addressText);
    if (/^.{10,}$/.test(addressText)) {
      setAddressError(false);
    } else {
      setAddressError(true);
    }
  };

  const validatePhoneNumber = phone => {
    setphoneNumber(phone);
    if (/^\d{10}$/.test(phone)) {
      setPhoneNumberError(false);
    } else {
      setPhoneNumberError(true);
    }
  };

  const validateCountryCode = code => {
    setCountryCode(code);
    if (code !== '') {
      setCountryCodeError(false);
    } else {
      setCountryCodeError(true);
    }
  };

  const validateConditions = () => {
    setAcceptTermAndCondition(!acceptTermAndCondition);
  };

  const loadFirstForm = () => (
    <Form>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={emailId}
        onChange={e => validateEmail(e.target.value)}
      />
      <br />
      {emailId !== '' && emailError && <div className="error">Invalid Email</div>}
      <br />
      <Form.Control
        type="password"
        value={password}
        onChange={e => validatePassword(e.target.value)}
        placeholder="Enter password"
      />
      <br />
      {password !== '' && passwordError && (
        <div className="error">
          Password must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special
          characters
        </div>
      )}
      <br />
    </Form>
  );

  const loadSecondForm = () => (
    <Form>
      <Form.Control
        type="text"
        placeholder="Enter first name"
        value={firstName}
        onChange={e => validateFirstName(e.target.value)}
      />
      <br />
      {firstName !== '' && firstNameError && (
        <div className="error">
          Allowed only alphabets and minimum of 2 character and maximum 50.
        </div>
      )}
      <br />
      <Form.Control
        type="text"
        placeholder="Enter last name"
        value={lastName}
        onChange={e => validateLastName(e.target.value)}
      />
      <br />
      {lastName !== '' && lastNameError && <div className="error">Allowed only alphabets</div>}
      <br />
      <Form.Control
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={e => validateAddress(e.target.value)}
      />
      <br />
      {address !== '' && addressError && <div className="error">Required minimum length 10</div>}
    </Form>
  );

  const loadThirdForm = () => (
    <Form>
      <Form.Select
        aria-label="select country code"
        onChange={e => validateCountryCode(e.target.value)}
        value={countryCode}
        data-testid="countryCodeSelection"
      >
        <option value="">Select country code</option>
        <option value="+91">+91</option>
        <option value="+1">+1</option>
      </Form.Select>
      <br />
      {countryCodeError && <div className="error">Please select country code</div>}
      <br />
      <Form.Control
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={e => validatePhoneNumber(e.target.value)}
      />
      <br />
      {phoneNumber !== '' && phoneNumberError && (
        <div className="error">Enter 10 digit phone number</div>
      )}
      <br />
      <input type="checkbox" value={acceptTermAndCondition} onChange={validateConditions} /> Accept
      term and conditions
    </Form>
  );

  const loadForm = () => {
    switch (currentForm) {
      case 1:
        return loadFirstForm();

      case 2:
        return loadSecondForm();

      case 3:
        return loadThirdForm();

      default:
        return loadFirstForm();
    }
  };

  const isDisabled = () => {
    switch (currentForm) {
      case 1:
        return emailError || passwordError;

      case 2:
        return firstNameError || lastNameError || addressError;

      case 3:
        return phoneNumberError || countryCodeError || !acceptTermAndCondition;

      default:
        return true;
    }
  };

  const buttonGroup = () => (
    <div className="submit-button-group">
      <Button disabled={currentForm === 1} onClick={() => setCurrentFromAction('back')}>
        Back
      </Button>
      <Button disabled={isDisabled()} onClick={saveForm}>
        Save
      </Button>
      <Button
        disabled={currentForm === 3 || isDisabled()}
        onClick={() => setCurrentFromAction('next')}
      >
        Save and Next
      </Button>
    </div>
  );

  const loadHeader = () => (
    <div className="bg-light p-5 mb-5">
      <h1>React + Bootstrap v4</h1>
      <p>React template with Bootstrap version v4</p>
      <p>
        <Button variant="primary" id="Learn more">
          Learn more
        </Button>
      </p>
    </div>
  );

  const loadPostsButton = () => <Button onClick={onSubmit}>Goto Posts</Button>;

  return (
    <main>
      {loadHeader()}
      <Container>
        {loadForm()}
        <br />
        {buttonGroup()}
        <br />
        {loadPostsButton()}
      </Container>
    </main>
  );
};

export default Home;
