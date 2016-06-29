/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	STORED_CARDS_FETCH,
	STORED_CARDS_FETCH_COMPLETED,
	STORED_CARDS_FETCH_FAILED,
	STORED_CARDS_DELETE,
	STORED_CARDS_DELETE_COMPLETED,
	STORED_CARDS_DELETE_FAILED
} from 'state/action-types';

import { createStoredCardsArray } from './assembler.js';

/**
 * List all known stored cards of the current user at /me/stored-cards.
 *
 * @param  {Array}  state  Current state
 * @param  {Object} action storeCard action
 * @return {Array}         Updated state
 */
export const items = ( state = [], action ) => {
	switch ( action.type ) {
		case STORED_CARDS_FETCH:
		case STORED_CARDS_FETCH_FAILED:
			return [];
		case STORED_CARDS_FETCH_COMPLETED:
			return createStoredCardsArray( action.list );
		case STORED_CARDS_DELETE_COMPLETED:
			return state.filter( item => item.id !== action.card.id );
	}

	return state;
};

/**
 * `Reducer` function which handles request/response actions
 * concerning stored cards fetching
 *
 * @param {Object} state - current state
 * @param {Object} action - storedCard action
 * @return {Object} updated state
 */
export const isFetching = ( state = false, action ) => {
	switch ( action.type ) {
		case STORED_CARDS_FETCH:
			return true;
		case STORED_CARDS_FETCH_COMPLETED:
		case STORED_CARDS_FETCH_FAILED:
			return false;
	}

	return state;
};

/**
 * `Reducer` function which handles request/response actions
 * concerning stored card deletion
 *
 * @param {Object} state - current state
 * @param {Object} action - storedCard action
 * @return {Object} updated state
 */
export const isDeleting = ( state = false, action ) => {
	switch ( action.type ) {
		case STORED_CARDS_DELETE:
			return true;
		case STORED_CARDS_DELETE_FAILED:
		case STORED_CARDS_DELETE_COMPLETED:
			return false;
	}

	return state;
};

/**
 * `Reducer` function which handles ERROR REST-API response actions
 *
 * @param {Object} state - current state
 * @param {Object} action - storedCard action
 * @return {Object} updated state
 */
export const error = ( state = null, action ) => {
	switch ( action.type ) {
		case STORED_CARDS_FETCH_FAILED:
		case STORED_CARDS_DELETE_FAILED:
			return action.error;

		case STORED_CARDS_FETCH_COMPLETED:
		case STORED_CARDS_DELETE_COMPLETED:
			return null;
	}

	return state;
};

export default combineReducers( {
	items,
	isFetching,
	isDeleting,
	error
} );
