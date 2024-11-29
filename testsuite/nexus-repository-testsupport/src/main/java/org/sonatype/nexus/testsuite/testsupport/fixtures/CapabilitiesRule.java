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
package org.sonatype.nexus.testsuite.testsupport.fixtures;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import javax.inject.Provider;

import org.sonatype.nexus.capability.CapabilityContext;
import org.sonatype.nexus.capability.CapabilityReference;
import org.sonatype.nexus.capability.CapabilityRegistry;
import org.sonatype.nexus.capability.CapabilityType;

import org.junit.rules.ExternalResource;

public class CapabilitiesRule
    extends ExternalResource
{
  private final Provider<CapabilityRegistry> capabilityRegistryProvider;

  private final Collection<String> capabilitiesToDisable = new ArrayList<>();

  private final Collection<String> capabilitiesToRemove = new ArrayList<>();

  private final Map<String, Map<String, String>> originalProperties = new HashMap<>();

  public CapabilitiesRule(final Provider<CapabilityRegistry> capabilityRegistryProvider) {
    this.capabilityRegistryProvider = capabilityRegistryProvider;
  }

  @Override
  protected void after() {
    capabilitiesToRemove.stream()
        .map(this::find)
        .map(Optional::get)
        .map(CapabilityReference::context)
        .map(CapabilityContext::id)
        .forEach(capabilityRegistryProvider.get()::remove);

    capabilitiesToDisable.stream()
        .map(this::find)
        .map(Optional::get)
        .map(CapabilityReference::context)
        .map(CapabilityContext::id)
        .forEach(capabilityRegistryProvider.get()::disable);

    for (Entry<String, Map<String, String>> entry : originalProperties.entrySet()) {
      find(entry.getKey()).ifPresent(ref -> {
        capabilityRegistryProvider.get().update(ref.context().id(), ref.context().isEnabled(), null, entry.getValue());
      });
    }
  }

  protected void enableAndSetProperties(final String capabilityType, final Map<String, String> properties) {
    Optional<? extends CapabilityReference>  capabilityReference = find(capabilityType);
    if (capabilityReference.isPresent()) {
      CapabilityContext context = capabilityReference.get().context();
      if (!context.isEnabled()) {
        capabilitiesToDisable.add(capabilityType);
      }
      originalProperties.put(capabilityType, context.properties());

      capabilityRegistryProvider.get().update(context.id(), true, null, properties);
    }
    else {
      capabilityRegistryProvider.get().add(CapabilityType.capabilityType(capabilityType), true, null, properties);
      capabilitiesToRemove.add(capabilityType);
    }
  }

  private Optional<? extends CapabilityReference> find(final String capabilityType) {
    CapabilityType type = CapabilityType.capabilityType(capabilityType);
    return capabilityRegistryProvider.get().getAll().stream().filter(ref -> ref.context().type().equals(type))
        .findFirst();
  }
}
