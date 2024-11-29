/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
import React from 'react';
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {Code, ExtJS, FieldWrapper, NxButton, NxFontAwesomeIcon, NxModal} from 'nexus-ui-plugin';

import UIStrings from '../../../../constants/UIStrings';
import './NugetApiToken.scss';

export default function NuGetApiTokenModal({apiKey, onCloseClick}) {
  return <NxModal id="nuget-api-key-modal" className="nx-modal--wide" onClose={onCloseClick}>
    <header className="nx-modal-header">
      <h2 className="nx-h2">
        <NxFontAwesomeIcon icon={faKey} fixedWidth/>
        <span> {UIStrings.NUGET_API_KEY.MENU.text} </span>
      </h2>
    </header>

    <div className="nx-modal-content">
      <p>
        <span> {UIStrings.NUGET_API_KEY.DETAILS.MAIN} <strong> {UIStrings.NUGET_API_KEY.DETAILS.WARNING} </strong> </span> <br/>
      </p>
      <FieldWrapper labelText={UIStrings.NUGET_API_KEY.DETAILS.API_KEY_TEXT}>
        <Code id="nuget-api-key" readOnly value={apiKey} />
      </FieldWrapper>
      <FieldWrapper labelText={UIStrings.NUGET_API_KEY.DETAILS.REGISTER_TEXT}>
        <Code id="nuget-example-command" readOnly value={UIStrings.NUGET_API_KEY.DETAILS.REGISTER_COMMAND
            .replace('{0}', apiKey)
            .replace('{1}', ExtJS.urlOf('repository/{repository name}/')) } />
      </FieldWrapper>
      <p>
        <span> {UIStrings.NUGET_API_KEY.DETAILS.AUTO_CLOSE}</span> <br/>
      </p>
    </div>
    <footer className="nx-footer">
      <NxButton onClick={onCloseClick}>
        {UIStrings.NUGET_API_KEY.CLOSE }
      </NxButton>
    </footer>
  </NxModal>
}
