/** @format */
/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, noop } from 'lodash';
import { dispatch } from '@wordpress/data';
import '@wordpress/core-data'; // Initializes core data store
import { registerCoreBlocks } from '@wordpress/block-library';

/**
 * Internal dependencies
 */
import Editor from './edit-post/editor.js';
import EditorPostTypeUnsupported from 'post-editor/editor-post-type-unsupported';
import QueryPostTypes from 'components/data/query-post-types';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getSiteSlug } from 'state/sites/selectors';
import { applyAPIMiddlewares } from './utils';

const editorSettings = {};

const mockPost = {
	type: 'post',
	content: 'test content',
};

class GutenbergEditor extends Component {
	componentDidMount() {
		registerCoreBlocks();
		// Prevent Guided tour from showing when editor loads.
		dispatch( 'core/nux' ).disableTips();
	}

	render() {
		const { postType, siteId, siteSlug } = this.props;
		if ( isEmpty( siteSlug ) ) {
			return null;
		}

		applyAPIMiddlewares( this.props.siteSlug );

		const post = { ...mockPost, type: postType };

		return (
			<div>
				<QueryPostTypes siteId={ siteId } />
				<EditorPostTypeUnsupported type={ postType } />
				<Editor
					settings={ editorSettings }
					hasFixedToolbar={ true }
					post={ post }
					onError={ noop }
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const siteId = getSelectedSiteId( state );

	return {
		siteId,
		siteSlug: getSiteSlug( state, siteId ),
	};
};

export default connect( mapStateToProps )( GutenbergEditor );
