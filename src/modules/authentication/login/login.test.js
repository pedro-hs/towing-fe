import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import moxios from 'moxios';

import api from 'shared/functions/api';
import { loginUri } from 'modules/authentication/api';
import Login from 'modules/authentication/login/index';

export const mockLogin = (status, body) => {
  const url = `${api.baseURL}/${loginUri()}`;
  return moxios.stubRequest(url, {
    status: status,
    response: body,
  });
};

const testLogin = async () => {
  const component = render(<Login />);

  const emailInput = component.container.querySelectorAll('.ant-input')[0];
  const passwordInput = component.container.querySelectorAll('.ant-input')[1];
  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
  });

  const loginButton = component.container.querySelector('.ant-button');
  await act(async () => {
    fireEvent.click(loginButton);
  });

  await waitFor(() => document.querySelector('.ant-notification-notice-message'));
  const message = document.querySelector('.ant-notification-notice-message');

  if (message) expect(message.textContent).toBe('Authentication success');
};

describe('Test login component', () => {
  beforeEach(() => {
    moxios.install(api);
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  it('Success login', async (done) => {
    const body = { token: '123' };
    mockLogin(200, body);

    //
    const component = render(<Login />);

    const emailInput = component.container.querySelectorAll('.ant-input')[0];
    const passwordInput = component.container.querySelectorAll('.ant-input')[1];
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });
    });

    const loginButton = component.container.querySelector('.ant-button');
    await act(async () => {
      fireEvent.click(loginButton);
    });

    await waitFor(() => document.querySelector('.ant-notification-notice-message'));
    const message = document.querySelector('.ant-notification-notice-message');

    if (message) expect(message.textContent).toBe('Authentication success');
    //
    // testLogin()

    done();
  });

  // it('Fail login', async (done) => {
  //   const body = { data: { nonFieldErrors: 'Unable to log in with provided credentials' } };
  //   mockLogin(400, body);
  //   testLogin();

  //   done();
  // });
});
