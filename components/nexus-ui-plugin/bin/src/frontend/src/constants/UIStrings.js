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
/**
 * @since 3.21
 */
export default {
  SETTINGS: {
    CANCEL_BUTTON_LABEL: 'Cancel',
    DISCARD_BUTTON_LABEL: 'Discard',
    SAVE_BUTTON_LABEL: 'Save',
    DELETE_BUTTON_LABEL: 'Delete'
  },

  SAVING: 'Saving...',
  FILTER: 'Filter',
  CLOSE: 'Close',

  PRISTINE_TOOLTIP: 'There are no changes',
  INVALID_TOOLTIP: 'Validation errors are present',

  ERROR: {
    FIELD_REQUIRED: 'This field is required',
    NAN: 'This field must contain a numeric value',
    MIN: (min) => `The minimum value for this field is ${min}`,
    MAX: (max) => `The maximum value for this field is ${max}`,
    LOAD_ERROR: 'An error occurred while loading the form',
    SAVE_ERROR: 'An error occurred while saving the form',
    INVALID_NAME_CHARS: 'Only letters, digits, underscores(_), hyphens(-), and dots(.) are allowed and may not start with underscore or dot.',
    MAX_CHARS: (max) => `This field has a limit of ${max} characters`
  },

  SAVE_SUCCESS: 'The form was saved successfully',

  USER_TOKEN: {
    MESSAGES: {
      ACCESS_ERROR: 'You must authenticate successfully to access your token',
      RESET_SUCCESS: 'Your user token has been reset',
      RESET_ERROR: 'You must authenticate successfully to reset your token'
    }
  }
};
