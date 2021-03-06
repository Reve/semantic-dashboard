import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import { email } from '../../api';
import {
  RECEIVE_EMAIL_SUCCESS, RECEIVE_ERROR_MESSAGE,
  REQUEST_EMAIL
} from '../../actions';
import { home } from '../../config';

const getEmailEpic = action$ =>
  action$.ofType(REQUEST_EMAIL).mergeMap(({ id }) =>
    Observable.from(email.getEmail(id)).flatMap(response => [
      {
        type: RECEIVE_EMAIL_SUCCESS,
        email: response
      },
      push(`${home}/email/${id}`)
    ]).catch(error => Observable.from([
      {
        type: RECEIVE_ERROR_MESSAGE,
        error
      },
      push(`${home}/`)
    ]))
  );

export default getEmailEpic;
