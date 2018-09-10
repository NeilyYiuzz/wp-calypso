/** @format */
/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { dispatch } from '@wordpress/data';
import '@wordpress/core-data'; // Initializes core data store
import { registerCoreBlocks } from '@wordpress/block-library';

/**
 * Internal dependencies
 */
import Editor from './edit-post/editor.js';
import { requestGutenbergDraftPost as requestDraftId, requestSitePost } from 'state/data-getters';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getSiteSlug } from 'state/sites/selectors';
import { WithAPIMiddleware } from './api-middleware/utils';

const editorSettings = {};

class GutenbergEditor extends Component {
	componentDidMount() {
		registerCoreBlocks();
		// Prevent Guided tour from showing when editor loads.
		dispatch( 'core/nux' ).disableTips();
	}

	render() {
		const { siteSlug } = this.props;

		return (
			<WithAPIMiddleware siteSlug={ siteSlug }>
				<Editor
					settings={ editorSettings }
					hasFixedToolbar={ true }
					post={ post }
					onError={ noop }
				/>
			</WithAPIMiddleware>
		);
	}
}

const mapStateToProps = state => {
	const siteId = getSelectedSiteId( state );

	const requestDraftIdData = requestDraftId( siteId );
	const postId = get( requestDraftIdData, 'data.ID' );

	const requestSitePostData = requestSitePost( siteId, postId );

	return {
		siteId,
		siteSlug: getSiteSlug( state, siteId ),
		post: get( requestSitePostData, 'data', null ),
	};
};

export default connect( mapStateToProps )( GutenbergEditor );
