import {
  DOCUMENT_SEND_EMAIL_ERROR,
  DOCUMENT_SEND_EMAIL_SUCCESS,
  DOCUMENT_SEND_EMAILS_COMPLETE
} from '../../../server/sockets/action_types/documentSocketActionTypes';
import React, {Component, PropTypes} from 'react';
import {Tab} from 'material-ui/Tabs';
import Button from '.././ui/Button';
import clientConfig from '../.././config/main';
import createDocuments from '../.././decorators/createDocuments';
import CustomPropTypes from '.././CustomPropTypes';
import handleFlashError from '../.././decorators/handleFlashError';
import ImmutablePropTypes from 'react-immutable-proptypes';
import io from 'socket.io-client';
import IterableFunctions from '../.././utils/immutable/IterableFunctions';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';
import DocumentViewer from '.././shared/DocumentViewer';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarFooter from '.././shared/FormSidebarFooter';
import FormSidebarSection from '.././shared/FormSidebarSection';
import FormSidebarSectionAddSigner from '.././shared/FormSidebarSectionAddSigner';
import FormSidebarSectionFillGeneralPlaceholders from '.././shared/FormSidebarSectionFillGeneralPlaceholders';
import FormSidebarSectionMessage from '.././shared/FormSidebarSectionMessage';
import ListItem from '.././ui/ListItem';
import pureRender from 'pure-render-decorator';
import socketConfig from '../../../server/sockets/utils/config';
import Tabs from '.././ui/Tabs';

const {get, isNull, isTruthy, matchesAttr} = IterableFunctions;
const displayName = 'DocumentsNewEditorView';
const getValue = get('value');
const isGeneral = matchesAttr('type', 'general');
const isSpecific = matchesAttr('type', 'specific');
const ORANGE = 'rgb(245, 138, 15)';

// TODO: Move this elsewhere more appropriate
const replacePlacholders = (type) => (body, placeholderFields) => {
  return placeholderFields.reduce((alteredBody, field) => {
    if (!field.get('value')) return alteredBody;

    return alteredBody.replace(
      new RegExp(field.get('placeholder'), 'g'),
      `<span class="${clientConfig.doc.placeholderClasses[type]}">${field.get('value')}</span>`
    );
  }, body);
};

const replaceSpecificFields = replacePlacholders('specific');
const replaceGeneralFields = replacePlacholders('general');

// TODO: Component has arrow functions in render breaking pure render
@handleFlashError
@createDocuments
@pureRender
export default class DocumentsNewEditorView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    createDocuments: PropTypes.func.isRequired,
    doc: ImmutablePropTypes.contains({
      collectionId: PropTypes.string,
      signers: ImmutablePropTypes.listOf(
        ImmutablePropTypes.listOf(
          ImmutablePropTypes.contains({
            placeholder: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
          }).isRequired
        )
      ).isRequired,
      template: CustomPropTypes.template.isRequired
    }).isRequired,
    emailsSentCount: PropTypes.number.isRequired,
    generalPlaceholderForm: CustomPropTypes.placeholderForm.isRequired,
    handleFlashError: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired,
    shouldClearSpecificPlaceholderForm: PropTypes.bool.isRequired,
    specificPlaceholderForm: CustomPropTypes.placeholderForm.isRequired
  };

  constructor(props) {
    super(props);
    // Template body needs to be a state so we can alter and display the placeholder
    // values as the user fills them in
    this.state = {
      templateBody: props.doc.getIn(['template', 'body'])
    };
  }

  componentDidMount() {
    // Connects to the `documents` socket namespace, this is so that when we create documents, we
    // can live update as they're being emailed and written to the DB
    this.socket = io.connect(socketConfig.paths.client.documents);
    // Listens for whenever an email from this current document being created is sent
    this.socket.on(DOCUMENT_SEND_EMAIL_ERROR, this._handleEmailError);
    this.socket.on(DOCUMENT_SEND_EMAIL_SUCCESS, this._handleEmailSent);
    this.socket.on(DOCUMENT_SEND_EMAILS_COMPLETE, this._handleAllEmailsSent);
  }

  // TODO: This is too slow and is computing way too much, find way to speed this up
  componentWillReceiveProps(nextProps) {
    const signers = this.props.doc.get('signers');
    const generalFields = this.props.generalPlaceholderForm.get('values');
    const nextGeneralFields = nextProps.generalPlaceholderForm.get('values');
    const nextSigners = nextProps.doc.get('signers');

    const placeholdersHaveChanged = !signers.equals(nextSigners) || !nextGeneralFields.equals(generalFields);

    // If the placeholders have changed, replace fields
    if (placeholdersHaveChanged) {
      // Replace all the general placeholders
      let alteredNextTemplateBody = replaceGeneralFields(
          nextProps.doc.getIn(['template', 'body']),
          nextGeneralFields
      );
      // If there are any signers, use the first signer as example
      if (nextSigners.has(0)) {
        alteredNextTemplateBody = replaceSpecificFields(alteredNextTemplateBody, nextSigners.get(0));
      }
      // Reset the example body state
      this.setState({templateBody: alteredNextTemplateBody});
    }

  }

  render() {
    const {
      doc,
      emailsSentCount,
      generalPlaceholderForm,
      saving,
      shouldClearSpecificPlaceholderForm,
      specificPlaceholderForm
    } = this.props;
    const {templateBody} = this.state;
    const generalPlaceholders = doc.getIn(['template', 'placeholders']).filter(isGeneral);
    const specificPlaceholders = doc.getIn(['template', 'placeholders']).filter(isSpecific);

    return (
      <DashboardContentWrapper
        className={displayName}
        showProgressBar={saving}
        progressBarProgressCount={emailsSentCount}
        progressBarTotalCount={doc.get('signers').size}>

        <div className={`${displayName}-document`}>
          <header className={`${displayName}-document-title`}>
            Step 2/2: <em className={`${displayName}-document-title-main`}>Tweak It, Send It!</em>
          </header>
          <DocumentViewer
            body={templateBody}
            className={`${displayName}-document-preview`} />
        </div>

        <FormSidebar className={`${displayName}-sidebar`}>
          <FormSidebarBody>
            <Tabs>
              {/* Specific Placeholder Inputs */}
              <Tab
                label={`Add Signers (${doc.get('signers').size})`}
                style={{color: ORANGE}}>
                <FormSidebarSection>
                  <FormSidebarSectionAddSigner
                    disabled={saving}
                    placeholders={specificPlaceholders}
                    shouldClearSpecificPlaceholderForm={shouldClearSpecificPlaceholderForm}
                    specificPlaceholderForm={specificPlaceholderForm} />
                  <FormSidebarSection className={`${displayName}-sidebar-signers-list`}>
                    {this._renderSigners()}
                  </FormSidebarSection>
                </FormSidebarSection>
              </Tab>
              {/* General Placeholder Inputs */}
              <Tab
                label='Fill Placeholders'
                style={{color: ORANGE}}>
                <FormSidebarSectionFillGeneralPlaceholders
                  placeholders={generalPlaceholders}
                  placeholderForm={generalPlaceholderForm} />
              </Tab>
            </Tabs>
          </FormSidebarBody>
          <FormSidebarFooter>
            <Button
              color='green'
              disabled={saving}
              onClick={this._handleCreateDocuments}
              text={saving ? 'Sending...' : 'Send'} />
          </FormSidebarFooter>
        </FormSidebar>

      </DashboardContentWrapper>
    );
  }

  _renderSigners = () => {
    if (!this.props.doc.get('signers').size) {
      return (
        <FormSidebarSectionMessage>
          Add/Import some signers to get started!
        </FormSidebarSectionMessage>
      );
    }

    return this.props.doc.get('signers').map((signer, i) => (
      <ListItem
        className={`${displayName}-sidebar-signer`}
        onRemove={() => this._handleRemoveSigner(signer)}
        key={i}
        removable={true}>
        {signer.map((field, i) => <span key={i}>{field.get('value')}</span>)}
      </ListItem>
    ));
  };

  _handleRemoveSigner = (signer) => {
    this.context.dispatch(DocumentNewActionCreators.removeSigner(signer));
  };

  _handleCreateDocuments = () => {
    if (!this.props.doc.get('signers').size) {
      return this.props.handleFlashError('Oops, did you forget to add some signers?');
    }

    const placeholdersAreFilled =
      this.props.generalPlaceholderForm.get('values').map(getValue).every(isTruthy) &&
      this.props.generalPlaceholderForm.get('errors').every(isNull);

    if (!placeholdersAreFilled) {
      return this.props.handleFlashError('Did you fill every placeholder field properly?');
    }

    this.props.createDocuments();
  };

  _handleEmailError = () => {
    console.log('EMAIL SEND ERROR');
  };

  /**
   * Increments the `emailsSentCount` by one. This function is called
   * whenever the server responds after an email is sent successfully to a
   * signer during the creation of this document
   */
  _handleEmailSent = () => {
    this.context.dispatch(
      DocumentNewActionCreators.setEmailsSentCount(this.props.emailsSentCount + 1)
    );
  };

  _handleAllEmailsSent = () => {
    // Sleep for a bit for visual effect of the progress bar
    setTimeout(() => {
      this.context.dispatch(
        DocumentNewActionCreators.createDocumentsSuccess()
      );
    }, 500);
  };

}
