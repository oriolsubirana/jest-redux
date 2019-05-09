import { loginReducer, LoginState } from './login';
import { FieldValidationResult } from 'lc-form-validation';
import { expressionStatement } from '@babel/types';
import { actionIds } from '../actions/actionIds';
import { login } from '../../../rest-api/api/login';
const deepFreeze = require('deep-freeze');

describe('login/reducers/reducer', () => {
    it('should return initial state when passing undefined and non controlled action', () => {
        //Arrange
        const state = void 0;
        const action = { type: 'some id not handled' };

        //Act
        const nextState = loginReducer(state, action);

        const myLoginEntity = {
            login: '',
            password: ''
        }
        //Assert
        expect(nextState.loginEntity).toMatchObject(myLoginEntity);
        expect(nextState.loginEntity.login).toEqual('');
        expect(nextState.loginEntity.password).toEqual('');
        expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
        expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
    });

    it('should return same state ( state already initialized and passing a non handle action type', () => {
        //Arrange
        const state: LoginState = {
            loginEntity: {
                login: 'test login',
                password: 'test password'
            },
            loginFormErrors: {
                login: new FieldValidationResult(),
                password: new FieldValidationResult(),
            },
        };

        const action = { type: 'some type' };
        deepFreeze(state);

        //Act
        const nextState = loginReducer(state, action);

        //Assert
        expect(nextState).toBe(state);
        expect(nextState.loginEntity.login).toEqual('test login');
        expect(nextState.loginEntity.password).toEqual('test password');
    });
    it('should return a new state when passing UPDATE_LOGIN_ENTITY_FIELD', () => {
        //Arrange
        const state: LoginState = {
            loginEntity: {
                login: 'test login',
                password: 'test password'
            },
            loginFormErrors: {
                login: new FieldValidationResult(),
                password: new FieldValidationResult(),
            },
        };

        const action = {
            type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
            payload: {
                fieldName: 'login',
                value: '',
                fieldValidationResult: {
                    succeeded: false,
                    errorMessage: 'test message',
                },
            },
        };

        deepFreeze(state);

        //Act
        const nextState = loginReducer(state, action);
        const myLoginEntity = {
            login: '',
            password: 'test password'
        }

        //Assert
        expect(nextState.loginEntity).toMatchObject(myLoginEntity);
        expect(nextState.loginFormErrors.login).toMatchObject({
            errorMessage: 'test message',
            succeeded: false,
        })


    });
})