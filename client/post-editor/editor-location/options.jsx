/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import FormCheckbox from 'components/forms/form-checkbox';
import PostMetadata from 'lib/post-metadata';
import { updatePostMetadata } from 'state/posts/actions';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getEditorPostId } from 'state/ui/editor/selectors';
import { getEditedPost } from 'state/posts/selectors';

function statusToBoolean( status ) {
	return 'public' === status;
}

class EditorLocationOptions extends React.Component {
	static propTypes = {
		isSharedPublicly: PropTypes.oneOf( [ 'private', 'public' ] ),
	};

	onShareChange = event => {
		this.props.updatePostMetadata( this.props.siteId, this.props.postId, {
			geo_public: event.target.checked ? 1 : 0,
		} );
	};

	render() {
		return (
			<div className="editor-location__options">
				<div className="editor-location__option-field">
					<label htmlFor="geo_public">
						<FormCheckbox
							id="geo_public"
							name="geo_public"
							checked={ statusToBoolean( this.props.isSharedPublicly ) }
							onChange={ this.onShareChange }
						/>
						<span>{ this.props.translate( 'Display location publicly' ) }</span>
					</label>
				</div>
			</div>
		);
	}
}

export default connect(
	state => {
		const siteId = getSelectedSiteId( state );
		const postId = getEditorPostId( state );
		const post = getEditedPost( state, siteId, postId );
		const isSharedPublicly = PostMetadata.geoIsSharedPublicly( post );

		return { siteId, postId, isSharedPublicly };
	},
	{
		updatePostMetadata,
	}
)( localize( EditorLocationOptions ) );
