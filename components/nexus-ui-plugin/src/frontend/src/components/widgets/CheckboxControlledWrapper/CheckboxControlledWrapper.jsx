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

import React, {useState} from 'react';

import './CheckboxControlledWrapper.scss';
import {NxCheckbox} from "@sonatype/react-shared-components";
import PropTypes from "prop-types";

/**
 * @since 3.29
 */
export default function CheckboxControlledWrapper({isChecked, children, onChange}) {
  const [checked, setChecked] = useState(!!isChecked),
      toggle = () => setChecked(!checked);

  function handleChange(event) {
    toggle();
    if (onChange) {
      onChange(event.target.checked);
    }
  }

  return <div className='checkbox-controlled-wrapper'>
    <div className='checkbox-control'>
      <NxCheckbox isChecked={checked} onChange={handleChange}/>
    </div>
    <div className='checkbox-children'>
      {children}
    </div>
  </div>;
};

CheckboxControlledWrapper.propTypes = {
  isChecked: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  onChange: PropTypes.func
};
