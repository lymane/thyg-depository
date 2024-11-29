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
import {useMachine} from '@xstate/react';

import {
  FieldWrapper,
  NxButton,
  NxFilterInput,
  NxLoadWrapper,
  NxTable,
  NxTableBody,
  NxTableCell,
  NxTableHead,
  NxTableRow,
  Section, SectionToolbar,
  Select,
  Utils
} from 'nexus-ui-plugin';
import UIStrings from "../../../../constants/UIStrings";

import ContentSelectorsPreviewMachine from './ContentSelectorsPreviewMachine';

export default function ContentSelectorsPreview({type, expression}) {
  const [current, send] = useMachine(ContentSelectorsPreviewMachine, {devTools: true});
  const previewUnavailable = Utils.isBlank(expression);
  const {allRepositories, filterText, preview, previewError, repositories} = current.context;
  const isLoading = current.matches('loading');
  const isLoadingPreview = current.matches('preview');

  const repositoryChangeHandler = (event) => send('SET_REPOSITORIES', {repositories: event.target.value});
  const previewHandler = () => send('PREVIEW', {selectorType: type, expression});
  const filter = (value) => send('FILTER', {filter: value});

  function retry() {
    send('RETRY');
  }

  return <Section className="nxrm-content-selectors-preview">
    <h2>{UIStrings.CONTENT_SELECTORS.TITLE}</h2>
    <NxLoadWrapper isLoading={isLoading} retryHandler={retry}>
      <FieldWrapper labelText={UIStrings.CONTENT_SELECTORS.PREVIEW.REPOSITORY_LABEL}
                    descriptionText={UIStrings.CONTENT_SELECTORS.PREVIEW.REPOSITORY_DESCRIPTION}>
        <Select name="repository" onChange={repositoryChangeHandler} value={repositories}>
          {allRepositories.map(({id, name}) =>
              <option key={id} value={id}>{name}</option>
          )}
        </Select>
        <NxButton disabled={previewUnavailable} onClick={previewHandler}>{UIStrings.CONTENT_SELECTORS.PREVIEW.BUTTON}</NxButton>
      </FieldWrapper>
      <SectionToolbar>
        <div className="nxrm-spacer" />
        <NxFilterInput
            inputId="filter"
            onChange={filter}
            value={filterText}
            placeholder={UIStrings.CONTENT_SELECTORS.FILTER_PLACEHOLDER}/>
      </SectionToolbar>
      <NxTable>
        <NxTableHead>
          <NxTableRow>
            <NxTableCell>{UIStrings.CONTENT_SELECTORS.PREVIEW.NAME_COLUMN}</NxTableCell>
          </NxTableRow>
        </NxTableHead>
        <NxTableBody isLoading={isLoadingPreview} error={previewError} emptyMessage={UIStrings.CONTENT_SELECTORS.PREVIEW.EMPTY}>
          {preview?.map(name =>
              <NxTableRow key={name}>
                <NxTableCell>{name}</NxTableCell>
              </NxTableRow>
          )}
        </NxTableBody>
      </NxTable>
    </NxLoadWrapper>
  </Section>;
}
